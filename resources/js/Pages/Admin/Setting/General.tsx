import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';
import { useEffect, useState } from 'react';
import TextInput from '@/Components/TextInput';
import CommonButton from '@/Components/CommonButton';
import AdminSettingSidebar from '@/Components/Admin/AdminSettingSidebar';

export default function General({ setting }: PageProps) {
  const auth: any = usePage().props.auth;

  const handleClearCache = async () => {
    router.post(route('admin.cache.clear'));
  };

  const handleStorageLink = async () => {
    router.post(route('admin.setting.storageLink'));
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Settings
        </h2>
      }
    >
      <Head title="Settings" />
      <Container>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/4">
            <AdminSettingSidebar />
          </div>
          <div className="flex-1 flex-col gap-6 p-8 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between p-8 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold">Clear Cache</h2>
              <CommonButton
                onClick={handleClearCache}
                type="button"
                variant="success"
              >
                Clear
              </CommonButton>
            </div>
            <div className="flex items-center justify-between p-8 bg-gray-50 rounded-md">
              <h2 className="text-lg font-semibold">Storage Link</h2>
              <CommonButton
                onClick={handleStorageLink}
                type="button"
                variant="success"
              >
                Link
              </CommonButton>
            </div>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
