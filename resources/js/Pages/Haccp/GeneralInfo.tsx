import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import EditGeneralInfo from '@/Components/Haccp/EditGeneralInfo';
import ShowGeneralInfo from '@/Components/Haccp/ShowGeneralInfo';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import HaccpSidebar from '@/Components/Haccp/HaccpSidebar';

export default function GeneralInfo({
  translations,
  company,
  isHaccp,
  foodBuisnessType,
  mainCustomerGroup,
  addBuisnessActivity,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h1 className="font-semibold text-2xl text-gray-800 leading-tight">
          General Info
        </h1>
      }
    >
      <Head title="General Info" />

      {notification && (
        <NotificationMessage
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex justify-between items-center pb-6 p-4">
        {/* <h1 className="text-gray-900 text-3xl font-bold">
          {translations.generalInfo}
        </h1> */}
      </div>
      <div>
        {isHaccp === 1 && <HaccpSidebar />}

        <div className="max-w-7xl mx-auto">
          <div className="p-0 bg-white rounded-md">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h2 className="text-xl font-bold mb-0">
                {translations.generalInfo}
              </h2>
              <div className="flex justify-end gap-2">
                <CommonButton
                  variant="outlined"
                  className="p-2 rounded"
                  onClick={handleEditClick}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </CommonButton>

                <CommonButton
                  className="bg-white !border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                  variant="outlined"
                  href={route('haccp')}
                >
                  Back
                </CommonButton>
              </div>
            </div>

            <div className="p-6">
              {isEditing ? (
                <EditGeneralInfo
                  company={company}
                  foodBuisnessType={foodBuisnessType}
                  translations={translations}
                  mainCustomerGroup={mainCustomerGroup}
                  setIsEditing={setIsEditing}
                  addBuisnessActivity={addBuisnessActivity}
                />
              ) : (
                <ShowGeneralInfo
                  company={company}
                  translations={translations}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
