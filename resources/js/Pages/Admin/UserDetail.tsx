import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import CommonButton from '@/Components/CommonButton';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import UserManagementSidebar from '@/Components/Admin/UserManagementSidebar';
import { FaPen } from 'react-icons/fa';

export default function UserDetail({ auth, user }: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Details
        </h2>
      }
    >
      <Head title="User Details" />

      <div className="flex  ">
        <UserManagementSidebar />

        <div className="flex-1 space-y-6 bg-white rounded-md">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold">User Information</h1>
            <CommonButton
              className="flex justify-center items-center gap-4"
              variant="outlined"
              href={route('admin.users.edit', { user: user.id })}
            >
              <FaPen />
              Edit User
            </CommonButton>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                <strong className="sm:w-2/3">Name:</strong>
                <span className="sm:w-2/3">{user.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                <strong className="sm:w-2/3">Email:</strong>
                <span className="sm:w-2/3">{user.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                <strong className="sm:w-2/3">Phone Number:</strong>
                <span className="sm:w-2/3">{`${user.std_code} ${user.phone_no}`}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                <strong className="sm:w-2/3">Verified:</strong>
                <span className="sm:w-2/3">
                  {user.email_verified_at ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
