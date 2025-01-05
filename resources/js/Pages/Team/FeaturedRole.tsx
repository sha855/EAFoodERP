import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Add as AddIcon } from '@mui/icons-material';
import CommonButton from '@/Components/CommonButton';
import CreateTeamRole from '@/Components/Form/CreateTeamRole';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/Components/Team/Sidebar';
import { InfoIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CommonTable from '@/Components/CommonTable';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

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

export default function TeamFeaturedRoles({ roles, companyId }: PageProps) {
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const [edit, setEdit] = useState<any>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const pages: any = usePage();

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

  const handleDrawerOpen = () => dispatch(openDrawer());
  const handleDrawerClose = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

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
          {params?.user_id === pages?.props?.auth?.user?.id && (
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

      <div className="flex ">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <Sidebar isActive={isActive} translations={translations as any} />
        </SidebarCommonLayout>

        <div className="flex-1 ">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red 
          mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
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
                    className={`bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex justify-center items-center`}
                  >
                    <InfoIcon className="w-5 h-5  mr-3 mt-0" />
                    <div className="flex-1">
                      <h2 className="text-sm font-medium text-black">
                        {translations.role.warning}
                      </h2>
                    </div>
                    <IconButton
                      onClick={handleClose}
                      className=" !p-0 text-gray-600 hover:text-gray-900"
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
                dataRoute={'team.roles'}
              />
            </div>
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
