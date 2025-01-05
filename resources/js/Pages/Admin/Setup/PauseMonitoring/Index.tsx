import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { Add as AddIcon } from '@mui/icons-material';
import CommonButton from '@/Components/CommonButton';
import CreatePauseTask from '@/Components/Form/CreatePauseTask';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import React, { useState, useEffect } from 'react';
import SetupSidebar from '@/Components/Setup/SetupSidebar';
import { InfoIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CommonTable from '@/Components/CommonTable';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'PauseMonitoring.messages': TranslationStructure;
    'PauseMonitoring.Messages': TranslationStructure;
  };
  locale: string;
}

interface ApiAccessTokenData {
  name: string;
  start_date: string;
  end_date: string;
}

export default function PauseTasks({
  allTasks,
  pauseTasks,
  companyId,
  folders,
}: PageProps) {
  const [edit, setEdit] = useState<any>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, setData, post, processing, errors } =
    useForm<ApiAccessTokenData>({
      name: '',
      start_date: '',
      end_date: '',
    });

  const { translation, locale } = usePage<TranslationProps>().props;
  const translations =
    translation['PauseMonitoring.Messages'] ||
    translation['PauseMonitoring.messages'] ||
    {};

  const auth: any = usePage().props.auth;
  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const { url } = usePage();
  const isActive = (href: string) => url === href;

  const columns = [
    { label: translations.table.startDate, key: 'start_date', sortable: true },
    { label: translations.table.endDate, key: 'end_date', sortable: true },
    { label: translations.table.name, key: 'name', sortable: true },
    {
      label: translations?.columns?.actions,
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <TableButton variant="success" onClick={() => setEdit(params)}>
            <span>{translations?.columns?.edit}</span>
          </TableButton>
          <TableButton
            variant="outlined"
            onClick={() => handleDeleteClick(params.id)}
          >
            {translations?.columns?.delete}
          </TableButton>
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
      router.delete(route('pause-monitorings.destroy', { id: deleteId }), {
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
          {translations.sidebarMenu.task.menu}
        </h2>
      }
    >
      <Head title={translations.sidebarMenu.task.subMenu.title} />

      <div className="flex h-screen ">
        <AdminUserSidebar folders={folders || []} />
        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h2 className="text-2xl font-bold">
              {translations.sidebarMenu.task.subMenu.title}
            </h2>
            <div className="flex gap-2">
              <CommonButton variant="success" onClick={handleDrawerOpen}>
                <AddIcon className="mr-0" />{' '}
                {translations.sidebarMenu.task.addNew}
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
                      {translations.table.warning}
                    </h2>
                  </div>
                  <IconButton
                    onClick={handleClose}
                    className=" text-gray-600 hover:text-gray-900"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </>
            {showConfirmation && (
              <ConfirmationBox
                Question={translations.confirm.deleteMsg}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
            <CommonTable
              columns={columns}
              data={pauseTasks}
              dataRoute={'pause-monitorings.index'}
              routeKeys={{ company: companyId }}
            />
          </div>
        </div>
      </div>

      <CommonDrawer
        title={translations.sidebarMenu.task.subMenu.title}
        isDrawerOpen={drawer}
        onClose={handleDrawerClose}
      >
        <CreatePauseTask
          translations={translations as any}
          allTasks={allTasks}
          companyId={companyId}
          edit={edit}
          setEdit={setEdit}
        />
      </CommonDrawer>
    </AuthenticatedLayout>
  );
}
