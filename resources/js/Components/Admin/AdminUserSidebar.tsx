import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import CommonButton from '../CommonButton';
import { useEffect, useState } from 'react';

interface Folder {
  id: number;
  menu: string;
  href?: string;
  slug: string;
  children?: Folder[];
}

interface SidebarProps {
  folders?: Folder[];
  isActive?: (path: string) => boolean;
  translations?: any[];
}

const AdminUserSidebar: React.FC<SidebarProps> = ({ folders }: any) => {
  const nestFolders = (folders: any[]) => {
    const folderMap = new Map(
      folders.map((folder: any) => [folder.id, { ...folder, children: [] }])
    );
    const nestedFolders: any[] = [];

    folders.forEach((folder: any) => {
      const mappedFolder = folderMap.get(folder.id);
      if (folder.parent_id === 0) {
        nestedFolders.push(mappedFolder);
      } else {
        const parentFolder = folderMap.get(folder.parent_id);
        if (parentFolder) {
          parentFolder.children.push(mappedFolder);
        }
      }
    });

    return nestedFolders;
  };

  const nestedFolders = nestFolders(folders);

  const { url } = usePage();
  const routeParams = route().routeParams;
  const companyId = routeParams?.company;

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
  const activeId = getIdFromUrl();

  const renderFolder = (folder: Folder, level: number = 0) => {
    const isOpen = openFolders[folder.id] || false;
    const hasChildren = folder.children && folder.children.length > 0;
    const isActive = folder.id === Number(activeId);

    return (
      <div key={folder.id} className={`pl-${0}`}>
        <div
          className={`relative inline-block w-full ${isActive ? `text-blue-600 font-semibold ` : ''}  `}
        >
          <NavLink
            href={route('admin.document.folder', {
              company: companyId,
              folderName: folder.slug,
              id: folder.id,
            })}
            className={` mt-0 space-y-0  ${isActive ? 'text-orange-400 !bg-slate-50 !border-r-4 !border-orange-400 font-semibold  ' : ''} ${level > 0 ? '!pl-8' : ''}`}
          >
            {folder.menu}
          </NavLink>
          {hasChildren && (
            <CommonButton
              onClick={() => toggleFolder(folder.id)}
              variant="text"
              className="!p-0 absolute right-4 top-3  w-4 h-4 bg-gradient-org-red flex
                        justify-center items-center text-white"
            >
              {isOpen ? '-' : '+'}
            </CommonButton>
          )}
        </div>

        {isOpen && hasChildren && (
          <div
            className={`mt-0 space-y-0 ${isActive ? 'text-red-600 font-semibold' : ''}`}
          >
            {folder.children!.map((child: any) =>
              renderFolder(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 mr-8 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]	">
        <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
          Haccp Plan
        </h3>

        <div className="">
          <NavLink
            href={route('admin.company.detail', { company: companyId })}
            active={route().current('admin.company.detail', {
              company: companyId,
            })}
          >
            General Info
          </NavLink>

          <NavLink
            href={route('admin.company.workgroup', { company: companyId })}
            active={route().current('admin.company.workgroup', {
              company: companyId,
            })}
          >
            Work group
          </NavLink>

          <NavLink
            href={route('admin.company.processStep', { company: companyId })}
            active={route().current('admin.company.processStep', {
              company: companyId,
            })}
          >
            Process Steps
          </NavLink>

          <NavLink
            href={route('admin.company.producedFood', { company: companyId })}
            active={route().current('admin.company.producedFood', {
              company: companyId,
            })}
          >
            Produce/ Served/ Sold food
          </NavLink>

          <NavLink
            href={route('admin.production.volume', { company: companyId })}
            active={route().current('admin.production.volume', {
              company: companyId,
            })}
          >
            Production Volume
          </NavLink>

          <NavLink
            href={route('admin.company.ingredients', { company: companyId })}
            active={route().current('admin.company.ingredients', {
              company: companyId,
            })}
          >
            Ingredients
          </NavLink>

          <NavLink
            href={route('admin.company.analyses', { company: companyId })}
            active={route().current('admin.company.analyses', {
              company: companyId,
            })}
          >
            Analyses
          </NavLink>

          <NavLink
            href={route('admin.company.flow.chart', { company: companyId })}
            active={route().current('admin.company.flow.chart', {
              company: companyId,
            })}
          >
            Flow chart
          </NavLink>

          <NavLink
            href={route('admin.company.location.plan', { company: companyId })}
            active={route().current('admin.company.location.plan', {
              company: companyId,
            })}
          >
            Location Plan
          </NavLink>

          <NavLink
            href={route('admin.company.floor.plan', { company: companyId })}
            active={route().current('admin.company.floor.plan', {
              company: companyId,
            })}
          >
            Floor Plan
          </NavLink>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
          Monitoring
        </h3>

        <div>
          <NavLink
            href={route('admin.monitor.task', { company: companyId })}
            active={route().current('admin.monitor.task', {
              company: companyId,
            })}
          >
            Tasks
          </NavLink>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Audits
          </h3>
          <div className="">
            <NavLink
              active={route().current('admin.audit', { company: companyId })}
              href={route('admin.audit', { company: companyId })}
            >
              Audits
            </NavLink>
            <NavLink
              active={route().current('admin.template.index', {
                company: companyId,
              })}
              href={route('admin.template.index', { company: companyId })}
            >
              Audit Template{' '}
            </NavLink>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
              Team Members
            </h3>
            <div className="">
              <NavLink
                active={route().current('admin.team', { company: companyId })}
                href={route('admin.team', { company: companyId })}
              >
                Team Members
              </NavLink>

              <NavLink
                active={route().current('admin.team.roles', {
                  company: companyId,
                })}
                href={route('admin.team.roles', { company: companyId })}
              >
                Team Roles
              </NavLink>
              <NavLink
                active={route().current('admin.team.certificates.trainings', {
                  company: companyId,
                })}
                href={route('admin.team.certificates.trainings', {
                  company: companyId,
                })}
              >
                Certificates and Trainings
              </NavLink>
            </div>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
              Setup
            </h3>
            <div className="">
              <NavLink
                active={route().current('admin.setup.companies', {
                  company: companyId,
                })}
                href={route('admin.setup.companies', { company: companyId })}
              >
                Companies
              </NavLink>

              <NavLink
                active={route().current('admin.rooms.index', {
                  company: companyId,
                })}
                href={route('admin.rooms.index', { company: companyId })}
              >
                Rooms
              </NavLink>

              <NavLink
                active={route().current('admin.equipment.index', {
                  company: companyId,
                })}
                href={route('admin.equipment.index', { company: companyId })}
              >
                Equipment
              </NavLink>

              <NavLink
                active={route().current('admin.pause.index', {
                  company: companyId,
                })}
                href={route('admin.pause.index', { company: companyId })}
                className="block !text-gray-500 hover:!text-orange  p-2 rounded !border-0 !text-base font-normal w-full"
              >
                Pause Monitoring
              </NavLink>

              <NavLink
                active={route().current('admin.integrations.index', {
                  company: companyId,
                })}
                href={route('admin.integrations.index', { company: companyId })}
              >
                Integration
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mb-0">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            File Storage
          </h3>
          <div className="">
            <NavLink
              href={route('admin.document.fileStorage', { company: companyId })}
              active={route().current('admin.document.fileStorage', {
                company: companyId,
              })}
            >
              <span className="cursor-pointer">Share Documents</span>
            </NavLink>
            <NavLink
              href={route('admin.manage.folders', { company: companyId })}
              active={route().current('admin.manage.folders', {
                company: companyId,
              })}
            >
              <span className="cursor-pointer">Manage Folders</span>
            </NavLink>
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Documents
          </h3>

          {nestedFolders?.map((folder) => renderFolder(folder))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserSidebar;
