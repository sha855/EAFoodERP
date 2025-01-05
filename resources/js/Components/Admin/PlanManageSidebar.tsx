import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

import { MdManageAccounts } from 'react-icons/md';

const PlanManageSidebar = () => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
          Plan Management
        </h3>
        <div className="">
          <NavLink
            href={route('admin.membership.index')}
            active={route().current('admin.membership.index')}
          >
            <span className="cursor-pointer">Plans</span>
          </NavLink>

          <NavLink
            href={route('admin.feature-heading.index')}
            active={route().current('admin.feature-heading.index')}
          >
            <span className="cursor-pointer">Plans Feature Heading</span>
          </NavLink>

          <NavLink
            href={route('admin.features.index')}
            active={route().current('admin.features.index')}
          >
            <span className="cursor-pointer">Plans Feature</span>
          </NavLink>

          <NavLink
            href={route('admin.feature-comparison.index')}
            active={route().current('admin.feature-comparison.index')}
          >
            <span className="cursor-pointer">Plans Feature Comparison</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PlanManageSidebar;
