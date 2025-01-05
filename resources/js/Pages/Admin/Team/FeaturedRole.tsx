import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Add as AddIcon } from '@mui/icons-material';
import CommonButton from '@/Components/CommonButton';
import CreateTeamRole from '@/Components/Form/CreateTeamRole';
//import Table from '@/Components/Table';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import React, { useState, useEffect } from 'react';
import Sidebar from '@/Components/Team/Sidebar';
import { InfoIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import CommonTable from '@/Components/CommonTable';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Table from '@/Components/Table';

interface TranslationStructure {
  [key: string]: any;
}
interface TranslationProps extends PageProps {
  translation: {
    'Team.team': TranslationStructure;
    'Team.Team': TranslationStructure;
  };
  locale: string;
}

interface RolesData {
  name: string;
  used: string;
  companyId: string;
}

export default function TeamFeaturedRoles({
  roles,
  companyId,
  folders,
}: PageProps) {
  const [edit, setEdit] = useState<any>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, setData, post, processing, errors } = useForm<RolesData>({
    name: '',
    used: '',
    companyId: '',
  });

  const { translation, locale } = usePage<TranslationProps>().props;
  const translations =
    translation['Team.team'] || translation['Team.Team'] || {};

  const auth: any = usePage().props.auth;

  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  let roleData = roles.data.map((role: any) => {
    let roleInfo = {
      id: role.id,
      Name: role.name,
      Used: translations.role.used,
    };
    return roleInfo;
  });

  const { url } = usePage();
  const isActive = (href: string) => url === href;

  const columns = [
    { label: translations.role.name, key: 'name', sortable: true },
    { label: translations.role.used, key: 'used', sortable: true },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2">
          {params.id > 6 && (
            <>
              <TableButton variant="success" onClick={() => setEdit(params)}>
                <span>Edit</span>
              </TableButton>
              <TableButton
                variant="outlined"
                onClick={() => handleDeleteClick(params.id)}
              >
                Delete
              </TableButton>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('team.roles.destroy', { id: deleteId }), {
        onSuccess: () => {},
        onError: () => {},
      });
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (edit) {
      dispatch(openDrawer());
    }
  }, [edit]);

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-bold">
          {translations.sidebarMenu.team.menu}
        </h2>
      }
    >
      <Head title={translations.sidebarMenu.team.subMenu.teamMember} />

      <div className="flex">
        {/* Sidebar */}
        <AdminUserSidebar folders={folders || []} />
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h2 className="text-xl font-bold">
              {translations.sidebarMenu.team.subMenu.teamMember}
            </h2>
            <div className="flex gap-2">
              <CommonButton variant="success" onClick={handleDrawerOpen}>
                <AddIcon className="mr-0" /> {translations.addRole}
              </CommonButton>
            </div>
          </div>
          <div className="p-4">
            <>
              {isVisible && (
                <div
                  className={`bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex items-start`}
                >
                  <InfoIcon className="w-5 h-5 mr-3" />
                  <div className="flex-1">
                    <h2 className="text-sm font-medium text-black">
                      {translations.role.warning}
                    </h2>
                  </div>
                  <IconButton
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </>

            {showConfirmation && (
              <ConfirmationBox
                Question="Are you sure to delete this role?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
            <CommonTable
              columns={columns}
              data={roles}
              dataRoute={'admin.team.roles'}
              routeKeys={{ company: companyId }}
            />
          </div>
        </div>
      </div>

      <CommonDrawer
        title={translations.role.newTeamRole}
        isDrawerOpen={drawer}
        onClose={handleDrawerClose}
      >
        <CreateTeamRole
          translations={translations as any}
          companyId={companyId}
          edit={edit}
          setEdit={setEdit}
        />
      </CommonDrawer>
    </AuthenticatedLayout>
  );
}
