import React, { useState } from 'react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import ShareDocuments from '@/Pages/FileStorage/Partials/ShareDocuments';
import Sidebar from '@/Pages/FileStorage/Partials/Sidebar';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

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

export default function FileStorage({ folders, sharedDocuments }: PageProps) {
  const auth: any = usePage().props.auth;
  const { translation, locale } = usePage<any>().props;
  const translations =
    translation['FileStorage.messages'] ||
    translation['FileStorage.Messages'] ||
    {};

  const nestedFolders = nestFolders(folders);
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
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
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <Sidebar
            folders={nestedFolders}
            isActive={isActive}
            translations={translations as any}
          />
        </SidebarCommonLayout>

        <ShareDocuments
          auth={auth}
          sharedDocuments={sharedDocuments}
          setIsMobileActive={setIsMobileActive}
          isMobileActive={isMobileActive}
        />
      </div>
    </AuthenticatedLayout>
  );
}
