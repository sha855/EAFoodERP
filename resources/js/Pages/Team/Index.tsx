import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { Add as AddIcon } from '@mui/icons-material';
import CommonButton from '@/Components/CommonButton';
import CreateTeam from '@/Components/Form/CreateTeam';
import TeamDataTable from '@/Components/TeamDataTable';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import { useState } from 'react';
import Sidebar from '@/Components/Team/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { InfoIcon } from 'lucide-react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

interface Certificate {
  training_name: string;
  certificate_file: string;
}
interface Team {
  id: number;
  first_last_name: string;
  certificates_and_trainings: Certificate[];
}
interface TeamMembersProps extends PageProps {
  roles: any;
  certificatesAndTrainings: Certificate[];
  teams: Team[];
  companyId: number;
}
export default function TeamMembers({
  roles,
  certificatesAndTrainings,
  teams,
  companyId,
}: PageProps) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const messages =
    translationData['Team.messages'] || translationData['Team.Messages'] || {};
  const team =
    translationData['Team.team'] || translationData['Team.Team'] || {};
  const translations = { ...messages, ...team };

  const [page, setPage] = useState(teams.current_page - 1);
  const [rowsPerPage, setRowsPerPage] = useState(teams.per_page);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
    router.get(route('team'), { page: newPage + 1, per_page: rowsPerPage });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    router.get(route('team'), { page: page - 1, per_page: newRowsPerPage });
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

  const certificates = certificatesAndTrainings.data.map(
    (certificate: any) => ({
      label: certificate.training_name,
      key: certificate.training_name,
    })
  );

  const teamData = teams.data.map((team: any): { [key: string]: any } => {
    let teamInfo: { [key: string]: any } = {
      id: team.id,
      member_roles: team.first_last_name,
    };

    team.certificates_and_trainings.forEach((ct: any, index: number) => {
      let filePath = ct.certificate_file?.replace('public', 'storage');
      let formattedDate = ct.certificate_issue_on ? (
        <span className="bg-green-300 text-black px-2 py-1 rounded-lg">
          {new Date(ct.certificate_issue_on)
            .toLocaleDateString('en-GB')
            .replace(/\//g, '.')}{' '}
        </span>
      ) : (
        <span className="bg-red-100 text-black px-2 py-1 rounded-lg">
          {translations.certificate.missing}
        </span>
      );

      if (certificates[index]?.label) {
        teamInfo[certificates[index].label] = ct.certificate_file ? (
          <>
            <a href={`../${filePath}`} target="_blank" download>
              {formattedDate}
            </a>
            <AttachFileIcon className="inline-block ml-1 text-green-600" />
          </>
        ) : (
          <span className="bg-red-100 text-black px-2 py-1 rounded-lg">
            {translations.certificate.missing}
          </span>
        );
      } else {
        <span className="bg-red-100 text-black px-2 py-1 rounded-lg">
          {translations.certificate.missing}
        </span>;
      }
    });

    return teamInfo;
  });

  certificates.unshift({
    label: translations.table.membersRoles,
    key: 'member_roles',
  });

  const { url } = usePage();
  const isActive = (href: string) => url === href;

  const columns = certificates;
  const menuOptions = { edit: true, deactivate: false, delete: true };

  const data = teamData;

  const [editData, setEditData] = useState<any>(null);
  const handleEdit = (data: any) => {
    setEditData(data[0]);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const allTeams = data || [];
  const totalRecords = teams.total || 0;

  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-bold">
          {translations.sidebarMenu.team.menu.teamMember}
        </h2>
      }
    >
      <Head title={translations.sidebarMenu.team.subMenu.teamMember} />

      <div className="flex">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <Sidebar isActive={isActive} translations={translations} />
        </SidebarCommonLayout>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red 
          mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>

          <div className="bg-white rounded-md">
            <div className="flex flex-wrap gap-3 justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h2 className="text-lg md:text-xl font-bold">
                {translations.teamMember}
              </h2>
              <div className="flex gap-2">
                <CommonButton variant="success" onClick={handleDrawerOpen}>
                  <AddIcon className="mr-0" /> {translations.newTeamMember}
                </CommonButton>
              </div>
            </div>
            <div className="p-4">
              <>
                {isVisible && (
                  <div
                    className={`bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex justify-center items-center`}
                  >
                    <InfoIcon className="w-5 h-5  mr-3" />
                    <div className="flex-1">
                      <h2 className="text-sm font-medium text-black">
                        {translations.team.warning}
                      </h2>
                    </div>
                    <IconButton
                      onClick={handleClose}
                      className="p-0 text-gray-600 hover:text-gray-900 "
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                )}
              </>
              {data.length > 0 ? (
                <TeamDataTable
                  columns={columns}
                  datas={allTeams}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  totalRecords={totalRecords}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  onRowClick={handleRowClick}
                  options={menuOptions}
                  onEdit={handleEdit}
                  translations={translations}
                  action={'team'}
                />
              ) : (
                <div className="text-center text-gray-500">
                  {translations.table.noTeamAvailable}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CommonDrawer
        title={translations.sidebarMenu.team.subMenu.teamMember}
        isDrawerOpen={drawer}
        onClose={handleDrawerClose}
      >
        <CreateTeam
          roles={roles}
          editData={editData}
          certificatesAndTrainings={certificatesAndTrainings}
          translations={translations}
          companyId={companyId}
        />
      </CommonDrawer>
    </AuthenticatedLayout>
  );
}
