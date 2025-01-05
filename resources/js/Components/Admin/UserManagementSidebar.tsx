import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

import { FaRegUser } from 'react-icons/fa';

const UserManagementSidebar = () => {
  const { url } = usePage();

  const userId = url.split('/').pop();

  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
          User Detail
        </h3>
        <div className="">
          <NavLink
            href={route('admin.users.show', { user: userId })}
            active={route().current('admin.users.show', { user: userId })}
          >
            <span className="cursor-pointer">User Detail</span>
          </NavLink>

          <NavLink
            href={route('admin.companies', { user: userId })}
            active={route().current('admin.companies', { user: userId })}
          >
            <span className="cursor-pointer">Companies</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSidebar;
