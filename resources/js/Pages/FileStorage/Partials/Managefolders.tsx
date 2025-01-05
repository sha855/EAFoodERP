import { useState } from 'react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { InfoIcon } from 'lucide-react';
import FolderStructureComponent from '@/Pages/FileStorage/Partials/FolderStructureComponent';
import DeleteConfirmationModal from '@/Pages/FileStorage/Partials/DeleteConfirmationModal';

interface FolderInfo {
  subfolderCount: number;
  fileCount: number;
  folderIndex: number;
  childIndex?: number;
  name: string;
}

const nestFolders = (folders: any[]) => {
  const folderMap = new Map<number, any>();
  folders.forEach((folder) =>
    folderMap.set(folder.id, { ...folder, children: [] })
  );

  const nestedFolders: any[] = [];
  folderMap.forEach((folder) => {
    const parentFolder = folderMap.get(folder.parent_id);
    parentFolder
      ? parentFolder.children.push(folder)
      : nestedFolders.push(folder);
  });

  return nestedFolders;
};

const InfoBanner = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => (
  <div className="bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex items-center">
    <InfoIcon className="w-5 h-5 text-green-600 mr-3" />
    <div className="flex-1">
      <h2 className="text-sm font-medium">{message}</h2>
    </div>
    <IconButton
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
    >
      <CloseIcon />
    </IconButton>
  </div>
);

export default function ManageFolders({
  folders,
  routePrefix = '',
}: PageProps & { routePrefix?: string }) {
  const { translation } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};

  const routeParams = route().routeParams;
  const companyId: any = routeParams?.company ?? 0;

  const nestedFolders = nestFolders(folders);
  const [folderState, setFolderState] = useState(
    folders.map((folder: any) => ({
      id: folder.id,
      folderName: folder.menu,
      isEditing: false,
      isCollapsed: true,
    }))
  );
  const [folderToDelete, setFolderToDelete] = useState<FolderInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
    setFolderToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!folderToDelete) return;

    const { folderIndex, childIndex } = folderToDelete;
    const updatedFolders = [...folderState];
    const folderId =
      childIndex !== undefined
        ? updatedFolders[folderIndex].childrenFolders[childIndex]?.id
        : updatedFolders[folderIndex]?.id;

    try {
      await axios.delete(route(routePrefix + 'delete.folder'), {
        data: {
          id: folderId,
          type: childIndex !== undefined ? 'child' : 'main',
        },
      });

      if (childIndex !== undefined) {
        updatedFolders[folderIndex].childrenFolders.splice(childIndex, 1);
      } else {
        updatedFolders.splice(folderIndex, 1);
      }

      setFolderState(updatedFolders);
      handleDeleteModalClose();
    } catch (error) {
      console.error('Failed to delete folder', error);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg">
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h3 className="text-xl font-bold">
          {translations.sideBar.manageFolders}
        </h3>
      </div>

      <div className="p-8">
        {isVisible && (
          <InfoBanner
            message={translations.manage.warning}
            onClose={() => setIsVisible(false)}
          />
        )}

        <FolderStructureComponent
          companyId={companyId}
          nestedFolders={nestedFolders}
          translations={translations}
          message={
            folderToDelete
              ? `Are you sure you want to delete ${folderToDelete.name}? This folder includes ${folderToDelete.subfolderCount} subfolder(s).`
              : 'Are you sure you want to delete this folder?'
          }
        />

        <DeleteConfirmationModal
          open={isModalOpen}
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteConfirm}
          translations={translations}
          message={
            folderToDelete
              ? `Are you sure you want to delete ${folderToDelete.name}? This folder includes ${folderToDelete.subfolderCount} subfolder(s).`
              : 'Are you sure you want to delete this folder?'
          }
        />
      </div>
    </div>
  );
}
