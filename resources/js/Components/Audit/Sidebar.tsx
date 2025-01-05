import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

import { IoIosApps } from 'react-icons/io';

const AuditSidebar = () => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Audits
          </h3>
          <div className="">
            <NavLink active={route().current('audit')} href={route('audit')}>
              Audits
            </NavLink>
            <NavLink
              active={route().current('template.index')}
              href={route('template.index')}
            >
              Audit Template{' '}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditSidebar;
