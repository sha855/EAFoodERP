import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupSidebar from '@/Components/Setup/SetupSidebar';
import CommonButton from '@/Components/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import UserCreate from '@/Pages/Setup/User/Partials/UserCreate';
import CommonDrawer from '@/Components/CommonDrawer';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import CommonTable from '@/Components/CommonTable';
import { InfoIcon } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';

interface SetupSidebarProps {
  translations: any;
}

interface User {
  id: number;
  name: string;
  roles: { id: number; name: string }[];
  status?: string;
}

type RoleListType = { id: string; name: string }[];

export default function Index({
  auth,
  roles,
  sharedRights,
  sharedRightsLocation,
  users,
  translations: any,
}: PageProps & {
  roles: RoleListType;
  sharedRights: any;
  sharedRightsLocation: any;
}) {
  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();

  const [userRoles, setUserRoles] = useState<RoleListType[]>([]);

  const { translation, locale } = usePage<PageProps>().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const SetupUser =
    translationData['Validation.setupUser'] ||
    translationData['Setup.Validation.setupUser'] ||
    {};
  const translations = { ...SetupUser };

  const handleDrawerOpen = () => {
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const columns = [
    {
      label: translations.table.nameTeamRole,
      key: 'name',
      sortable: true,
    },
    {
      label: translations.table.sharedRights,
      key: 'user_rights',
      sortable: true,
    },
    {
      label: translations.table.status,
      key: 'status',
    },
  ];

  const handleRolesUpdated = (roles: RoleListType[]) => {
    setUserRoles(roles);
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  const totalRecords = users.length;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">{translations.setupUsers}</h2>
      }
    >
      <Head title="Users" />

      <div className="flex ">
        <SetupSidebar />

        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">{translations.addNew}</h3>

            <div className="relative">
              <CommonButton onClick={handleDrawerOpen} variant="success">
                <AddIcon /> {translations.addNew}
              </CommonButton>
            </div>
          </div>

          <div className="p-4">
            {showInfo && (
              <div className="bg-green-200 p-4 rounded-md mb-4 relative w-full flex  items-start">
                <h2 className="text-sm flex gap-1">
                  <span>
                    <InfoIcon className="w-5 h-5  mr-3" />
                  </span>
                  {translations.drawer.msgInfo}
                </h2>

                <button
                  onClick={handleClose}
                  className=" text-black hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            <CommonTable
              columns={columns}
              data={users}
              dataRoute={'setup.user.index'}
            />
          </div>

          <CommonDrawer
            title="Shared rights"
            isDrawerOpen={drawer}
            onClose={handleDrawerClose}
          >
            <UserCreate
              roles={roles}
              sharedRights={sharedRights}
              sharedRightsLocation={sharedRightsLocation}
              onRolesUpdated={handleRolesUpdated}
            />
          </CommonDrawer>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
