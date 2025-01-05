import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';
import EditGeneralInfo from '@/Components/Haccp/EditGeneralInfo';
import ShowGeneralInfo from '@/Components/Haccp/ShowGeneralInfo';
import Container from '@/Components/Container';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'HACCP.GeneralInfo': TranslationStructure;
  };
  locale: string;
}

export default function CompanyUserDetail({
  auth,
  company,
  foodBuisnessType,
  mainCustomerGroup,
  folders,
  addBuisnessActivity,
}: PageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const { translation, locale } = usePage<TranslationProps>().props;
  const translations = translation['HACCP.GeneralInfo'] || {};

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Manage Food Business Unit
        </h2>
      }
    >
      <Head title="Manage Food Businesses" />
      <Container>
        <div className="flex">
          <SidebarCommonLayout
            onMobileActive={isMobileActive}
            onClose={setIsMobileActive}
          >
            <AdminUserSidebar folders={folders || []} />
          </SidebarCommonLayout>

          <div className="w-full">
            <button
              type="button"
              onClick={() => setIsMobileActive(!isMobileActive)}
              className="flex items-center justify-center gap-1 text-white bg-gradient-org-red mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
            >
              <RiListSettingsLine className="w-4 h-4" />
              Menu
            </button>
            <div className="p-0 bg-white rounded-md">
              <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
                <h2 className="text-xl font-bold mb-0">
                  {translations.generalInfo}
                </h2>
                <CommonButton
                  variant="outlined"
                  className=" p-2 rounded"
                  onClick={handleEditClick}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </CommonButton>
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
      </Container>
    </AuthenticatedLayout>
  );
}
