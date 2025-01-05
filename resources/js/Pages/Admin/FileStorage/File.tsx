import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import ManageDocuments from '@/Pages/FileStorage/Partials/ManageDocuments';
import React from 'react';

export default function FileStorage({ folder, folders, files }: PageProps) {
  const { translation, locale } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};

  const auth: any = usePage().props.auth;

  const { url } = usePage();
  const isActive = (href: string) => url === href;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-lg font-semibold">
          {translations.sideBar.fileStorage}
        </h2>
      }
    >
      <Head title={translations.sideBar.fileStorage} />

      <div className="flex ">
        <AdminUserSidebar
          folders={folders || []}
          isActive={isActive}
          translations={translations as any}
        />
        <ManageDocuments
          auth={auth}
          folder={folder}
          files={files}
          routePrefix={'admin.'}
        />
      </div>
    </AuthenticatedLayout>
  );
}
