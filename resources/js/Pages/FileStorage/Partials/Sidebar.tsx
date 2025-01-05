import { useEffect, useState } from 'react';
import CommonButton from '@/Components/CommonButton';
import NavLink from '@/Components/NavLink';

import { IoSettingsOutline } from 'react-icons/io5';
import { IoDocumentSharp } from 'react-icons/io5';
import clsx from 'clsx';

interface Folder {
  id: number;
  parent_id: number;
  menu: string;
  href?: string;
  children?: Folder[];
}

interface SidebarProps {
  folders: Folder[];
  isActive: any;
  translations?: {
    sideBar: {
      settings: string;
      shareDocuments: string;
      manageFolders: string;
      documents: string;
    };
  };
}

const Sidebar: React.FC<SidebarProps> = ({
  folders,
  isActive,
  translations,
}) => {
  const [openFolders, setOpenFolders] = useState<{ [key: number]: boolean }>(
    () => {
      const savedState = localStorage.getItem('openFolders');
      return savedState ? JSON.parse(savedState) : {};
    }
  );

  function getIdFromUrl() {
    const url = window.location.href;
    const idMatch = url.match(/[?&]id=(\d+)/);
    return idMatch ? idMatch[1] : null;
  }

  useEffect(() => {
    localStorage.setItem('openFolders', JSON.stringify(openFolders));
  }, [openFolders]);

  const toggleFolder = (id: number) => {
    setOpenFolders((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

  const activeId = getIdFromUrl();

  const renderFolder = (folder: Folder, level: number = 0) => {
    const isOpen = openFolders[folder.id] || false;
    const hasChildren = folder.children && folder.children.length > 0;
    const isActive = (folder: Folder): boolean => {
      if (
        route().current('document.folder') &&
        Number(route().params.id) == folder.id
      ) {
        return true;
      }

      return false;
    };

    return (
      <div key={folder.id} className={`pl-${level * 4}`}>
        <div
          className={` relative inline-block w-full ${folder.parent_id ? '' : ''}`}
        >
          <NavLink
            href={`${slugify(folder.menu)}?id=${folder.id}`}
            active={isActive(folder)}
            className={clsx(
              ' cursor-pointer p-2',
              folder.parent_id === 0 ? '' : '!pl-8'
            )}
          >
            {folder.menu}
          </NavLink>
          {hasChildren && (
            <CommonButton
              onClick={() => toggleFolder(folder.id)}
              variant="text"
              className="!p-0 absolute right-8 top-3  w-4 h-4 bg-gradient-org-red flex
                        justify-center items-center text-white"
            >
              {isOpen ? '-' : '+'}
            </CommonButton>
          )}
        </div>

        {/* Render children if folder is open */}
        {isOpen && hasChildren && (
          <div
            className={` my-0 ${isActive(folder) ? 'text-red-600 font-semibold' : ''}`}
          >
            {folder.children!.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]	">
        {/* Settings Section */}
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations?.sideBar?.settings || 'Settings'}{' '}
          </h3>

          <div className="">
            <NavLink
              href={route('document.fileStorage')}
              active={route().current('document.fileStorage')}
            >
              <span className="cursor-pointer">
                {translations?.sideBar.shareDocuments}
              </span>
            </NavLink>

            <NavLink
              href={route('manage.folders')}
              active={route().current('manage.folders')}
            >
              <span className="cursor-pointer">
                {translations?.sideBar.manageFolders}
              </span>
            </NavLink>
          </div>
        </div>

        {/* Documents Section */}
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations?.sideBar.documents}
          </h3>

          {folders.map((folder) => renderFolder(folder))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
