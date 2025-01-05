import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ManageFolders from '@/Pages/FileStorage/Partials/Managefolders';
import Sidebar from '@/Pages/FileStorage/Partials/Sidebar';

const nestFolders = (folders: any[]) => {
  const folderMap = new Map(
    folders.map((folder) => [folder.id, { ...folder, children: [] }])
  );
  const nestedFolders: any[] = [];

  folders.forEach((folder) => {
    const parentFolder = folderMap.get(folder.parent_id);
    if (parentFolder) {
      parentFolder.children.push(folderMap.get(folder.id));
    } else if (folder.parent_id === 0) {
      nestedFolders.push(folderMap.get(folder.id));
    }
  });

  return nestedFolders;
};

export default function FileStorage({ folders }: PageProps) {
  const { auth, translation, url } = usePage<any>().props;
  const translations =
    translation?.['FileStorage.messages'] ||
    translation?.['FileStorage.Messages'] ||
    {};
  const nestedFolders = nestFolders(folders);
  const isActive = (href: string) => url === href;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-lg font-semibold">
          {translations.sideBar?.fileStorage}
        </h2>
      }
    >
      <Head title={translations.sideBar?.fileStorage} />

      <div className="flex">
        <Sidebar
          folders={nestedFolders}
          isActive={isActive}
          translations={translations}
        />
        <ManageFolders auth={auth} folders={folders} />
      </div>
    </AuthenticatedLayout>
  );
}
