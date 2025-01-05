import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import ManageFolders from '@/Pages/FileStorage/Partials/Managefolders';

export default function FileStorage({ folders }: PageProps) {
  const auth: any = usePage().props.auth;
  const { translation } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};
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

        <ManageFolders auth={auth} folders={folders} routePrefix={'admin.'} />
      </div>
    </AuthenticatedLayout>
  );
}
