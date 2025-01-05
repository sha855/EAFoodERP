import axios from 'axios';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TfiAngleRight } from 'react-icons/tfi';
import { AiTwotoneFolderOpen } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { router, usePage } from '@inertiajs/react';

interface FolderTree {
  id: number;
  parent_id?: number;
  menu: string;
  children?: FolderTree[];
}

const nestFolders = (folders: any[]) => {
  const folderMap = new Map();
  folders.forEach((folder: any) => {
    folderMap.set(folder.id, { ...folder, children: [] });
  });

  const nestedFolders: any[] = [];

  folderMap.forEach((folder) => {
    if (folder.parent_id === 0) {
      nestedFolders.push(folder);
    } else {
      const parentFolder = folderMap.get(folder.parent_id);
      if (parentFolder) {
        parentFolder.children.push(folder);
      }
    }
  });

  return nestedFolders;
};

interface Translations {
  folder: {
    add: string;
    confirmDeletion: string;
    areYourSureToDelete: string;
    delete: string;
    cancel: string;
  };
}

export default function FolderStructureComponent({
  nestedFolders,
  companyId,
  translations,
  message,
}: {
  companyId: number;
  nestedFolders: FolderTree[];
  translations: Translations;
  message: string;
}) {
  const auth: any = usePage().props.auth;
  const [folderTree, setFolderTree] = useState<FolderTree[]>(nestedFolders);
  const [showAddParentForm, setShowAddParentForm] = useState(false);
  const [selectedNode, setSelectedNode] = useState<FolderTree | null>(null);
  const [menu, setMenu] = useState('');
  const [editMode, setEditMode] = useState<Record<number, boolean>>({});
  const [addChildMode, setAddChildMode] = useState<Record<number, boolean>>({});
  const [confirmDelete, setConfirmDelete] = useState<FolderTree | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<
    Record<number, boolean>
  >({});

  const toggleExpandFolder = (id: number) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const isAdmin = auth.roles.includes('admin');

  const fetchFolders = async () => {
    try {
      const routeName = isAdmin
        ? route('admin.manage.get', { company: companyId })
        : route('manage.get');
      const response = await axios.get(routeName);
      const formattedData = await nestFolders(response.data);
      setFolderTree(formattedData);
    } catch (error) {
      console.error('Error fetching folders', error);
    }
  };

  const handleSelectNode = (node: FolderTree) => {
    setSelectedNode(node);
    setMenu(node.menu);
  };

  const handleAddChild = async (parentNode: FolderTree) => {
    if (!menu) return;
    const routeName = isAdmin ? route('admin.add.folder') : route('add.folder');

    const formData = {
      menu,
      company_id: companyId,
      parent_id: parentNode.id,
    };

    router.post(routeName, formData, {
      onSuccess: () => {
        resetForm();
        fetchFolders();
        setAddChildMode({ ...addChildMode, [parentNode.id]: false });
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleUpdateNode = async (node: FolderTree) => {
    const routeName = isAdmin
      ? route('admin.update.folder')
      : route('update.folder');

    const formData = {
      id: node.id,
      name: menu,
    };

    router.post(routeName, formData, {
      onSuccess: () => {
        resetForm();
        fetchFolders();
        setEditMode({ ...editMode, [node.id]: false });
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDeleteNode = async () => {
    if (!confirmDelete) return;

    const routeName = isAdmin
      ? route('admin.delete.folder', { id: confirmDelete.id })
      : route('delete.folder', { id: confirmDelete.id });

    router.delete(routeName, {
      onSuccess: () => {
        resetForm();
        fetchFolders();
        setConfirmDelete(null);
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleAddParentFolder = async () => {
    if (!menu) return;

    const routeName = isAdmin ? route('admin.add.folder') : route('add.folder');

    const formData = {
      menu,
      company_id: companyId,
      parent_id: 0,
    };

    router.post(routeName, formData, {
      onSuccess: () => {
        resetForm();
        fetchFolders();
        setFolderTree([...folderTree]);
      },
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleEditMode = (node: FolderTree) => {
    setEditMode({ ...editMode, [node.id]: true });
    setMenu(node.menu);
  };

  const resetForm = () => {
    setSelectedNode(null);
    setMenu('');
  };

  const renderTree = (nodes: FolderTree[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id} style={{ marginLeft: depth * 20 }}>
        <span onClick={() => handleSelectNode(node)}>{node.menu}</span>
        {node.children && renderTree(node.children, depth + 1)}
      </div>
    ));
  };

  const renderCrudControls = (node: FolderTree) => {
    return (
      <div>
        {!editMode[node.id] && !addChildMode[node.id] && (
          <div className="flex justify-between items-center space-x-2 ">
            <div className="flex items-center gap-2">
              <button
                className="hover:bg-slate-100 px-4 py-3 flex items-center gap-1  rounded-full uppercase font-bold text-sm	text-orange-400"
                onClick={() =>
                  setAddChildMode({
                    ...addChildMode,
                    [node.id]: true,
                  })
                }
              >
                <BsPlus />
                {translations.folder.add}
              </button>
            </div>
          </div>
        )}
        {addChildMode[node.id] && (
          <div className="ml-12 mb-0 flex gap-3">
            <input
              type="text"
              placeholder="Menu"
              value={menu}
              className="!border !border-gray-200 rounded-lg bg-slate-100 text-slate-400 p-2"
              onChange={(e) => setMenu(e.target.value)}
            />
            <button onClick={() => handleAddChild(node)}>
              <CheckIcon sx={{ color: '#66bb6a' }} />
            </button>
            <button
              onClick={() =>
                setAddChildMode({
                  ...addChildMode,
                  [node.id]: false,
                })
              }
            >
              <CancelIcon sx={{ color: '#ff6666' }} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderEditControls = (node: FolderTree) => {
    return (
      <div>
        {!editMode[node.id] && !addChildMode[node.id] && (
          <div className="flex justify-between items-center space-x-2 hover:bg-slate-50 px-3  rounded-md">
            <div className="flex items-center gap-2">
              <button onClick={() => handleEditMode(node)}>
                <EditIcon
                  sx={{ color: '#66bb6a' }}
                  className="!text-base !w-5 !h-5"
                />
              </button>
            </div>
            <button onClick={() => setConfirmDelete(node)}>
              <DeleteIcon
                sx={{ color: '#ff6666' }}
                className="!text-base !w-5 !h-5"
              />
            </button>
          </div>
        )}
        {editMode[node.id] && (
          <div className="ml-12 mb-0 flex gap-3">
            <input
              type="text"
              placeholder="Menu"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
              className="!border !border-gray-200 rounded-lg bg-slate-100 text-slate-400 p-2"
            />
            <button onClick={() => handleUpdateNode(node)}>
              <CheckIcon sx={{ color: '#66bb6a' }} />
            </button>
            <button
              onClick={() =>
                setEditMode({
                  ...editMode,
                  [node.id]: false,
                })
              }
            >
              <CancelIcon sx={{ color: '#ff6666' }} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderCrudInputs = (nodes: FolderTree[], depth = 0) => {
    return nodes.map((node) => (
      <div className="mb-5 " key={node.id} style={{ marginLeft: depth * 20 }}>
        <div className=" flex items-center gap-4 hover:bg-slate-50 p-3 rounded-md">
          <TfiAngleRight
            className={`w-4 h-4 cursor-pointer transform transition-transform ${
              expandedFolders[node.id] ? 'rotate-90' : ''
            }`}
            onClick={() => toggleExpandFolder(node.id)}
          />
          <h3 className="text-lg font-medium flex items-center gap-2 ">
            <AiTwotoneFolderOpen className="w-7 h-7" />
            {node.menu}
          </h3>
          {renderEditControls(node)}
        </div>
        {renderCrudControls(node)}
        {expandedFolders[node.id] &&
          node.children &&
          renderCrudInputs(node.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div>
      <div>
        {renderCrudInputs(folderTree)}
        <button
          className="hover:bg-slate-100 px-4 py-3 flex items-center gap-1  rounded-full uppercase font-bold text-sm	text-orange-400"
          onClick={() => setShowAddParentForm(!showAddParentForm)}
        >
          <BsPlus />
          {translations.folder.add}
        </button>
        {showAddParentForm && (
          <div className="ml-12 mb-0 flex gap-3">
            <input
              type="text"
              placeholder="Menu"
              value={menu}
              className="!border !border-gray-200 rounded-lg bg-slate-100 text-slate-400 p-2"
              onChange={(e) => setMenu(e.target.value)}
            />
            <button onClick={handleAddParentFolder}>
              <CheckIcon sx={{ color: '#66bb6a' }} />
            </button>
            <button onClick={() => setShowAddParentForm(false)}>
              <CancelIcon sx={{ color: '#ff6666' }} />
            </button>
          </div>
        )}
      </div>
      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        aria-labelledby="delete-confirmation-title"
        aria-describedby="delete-confirmation-description"
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            textAlign: 'center',
          }}
        >
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <Typography
              id="delete-confirmation-title"
              variant="h6"
              component="h2"
              sx={{ mb: 0, fontWeight: 'bold' }}
            >
              {translations.folder.confirmDeletion}
            </Typography>
          </div>
          <div className="p-8">
            <Typography id="delete-confirmation-description" sx={{ mb: 4 }}>
              {translations.folder.areYourSureToDelete}
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteNode}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                {translations.folder.delete}
              </Button>
              <Button
                variant="outlined"
                onClick={() => setConfirmDelete(null)}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 'bold',
                }}
              >
                {translations.folder.cancel}
              </Button>
            </Box>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
