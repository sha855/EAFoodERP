import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { Add as AddIcon } from '@mui/icons-material';
import CommonButton from '@/Components/CommonButton';
import CreateCertificatesAndTrainings from '@/Components/Form/CreateTeamCertificateTraining';
import TeamDataTable from '@/Components/TeamDataTable';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

interface TranslationStructure {
  [key: string]: any;
}
interface TranslationProps extends PageProps {
  translation: {
    'Team.messages': TranslationStructure;
    'Team.team': TranslationStructure;
    'Team.Messages': TranslationStructure;
    'Team.Team': TranslationStructure;
  };
  locale: string;
}

interface CertificateAndTraining {
  id: number;
  training_name: string;
  frequency: string;
}

export default function TeamcertificatesAndTrainings({
  certificatesAndTrainings,
  frequencies,
  companyId,
  folders,
}: PageProps) {
  const { translation, locale } = usePage<TranslationProps>().props;
  const messages =
    translation['Team.messages'] || translation['Team.Messages'] || {};
  const team = translation['Team.team'] || translation['Team.Team'] || {};
  const translations = { ...messages, ...team };

  const [page, setPage] = useState(certificatesAndTrainings.current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    certificatesAndTrainings.per_page
  );

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    router.get(
      route('admin.team.certificates.trainings', { company: companyId }),
      { page: newPage + 1, per_page: rowsPerPage }
    );
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    router.get(
      route('admin.team.certificates.trainings', { company: companyId }),
      { page: page - 1, per_page: newRowsPerPage }
    );
  };

  const handleRowClick = (userId: number) => {};

  const auth: any = usePage().props.auth;

  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
    setEditData([]);
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const { url } = usePage();
  const isActive = (href: string) => url === href;

  const columns = [
    {
      label: translations.training.task,
      key: 'Task',
    },
    {
      label: translations.training.frequency,
      key: 'Frequency',
    },
  ];

  let certificateInfo = certificatesAndTrainings.data.map(
    (
      certificateAndTraining: CertificateAndTraining
    ): { id: number; Task: string; Frequency: string } => {
      return {
        id: certificateAndTraining.id,
        Task: certificateAndTraining.training_name,
        Frequency: certificateAndTraining.frequency,
      };
    }
  );

  const data = certificateInfo;
  const totalRecords = certificatesAndTrainings.total || 0;

  const menuOptions = { edit: true, deactivate: false, delete: false };
  const [editData, setEditData] = useState<any>(null);
  const handleEdit = (data: any) => {
    setEditData(data);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

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

      <div className="flex  ">
        <AdminUserSidebar folders={folders || []} />

        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h2 className="text-2xl font-bold">
              {translations.sidebarMenu.team.subMenu.teamMember}
            </h2>
            <div className="flex gap-2">
              <CommonButton variant="success" onClick={handleDrawerOpen}>
                <AddIcon className="mr-0" /> {translations.addTraining}
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
                      {translations.certificate.warning}
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
            {data.length > 0 ? (
              <TeamDataTable
                columns={columns}
                datas={data}
                page={page}
                rowsPerPage={rowsPerPage}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onRowClick={handleRowClick}
                options={menuOptions}
                onEdit={handleEdit}
                translations={translations}
                action={'team/certificates-and-trainings'}
              />
            ) : (
              <div className="text-center text-gray-500">
                {translations.table.noTrainingAvailable}
              </div>
            )}
          </div>
        </div>
      </div>

      <CommonDrawer
        title="Manage training"
        isDrawerOpen={drawer}
        onClose={handleDrawerClose}
      >
        <CreateCertificatesAndTrainings
          editData={editData}
          frequencies={frequencies}
          translations={translations as any}
          companyId={companyId}
        />
      </CommonDrawer>
    </AuthenticatedLayout>
  );
}
