import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { MdOutlineSettings } from 'react-icons/md';

import { useState } from 'react';

const SetupSidebar = () => {
  const { url } = usePage();

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const Setup =
    translationData['Validation.SetupCompany'] ||
    translationData['Validation.SetupCompany'] ||
    {};
  const translations = { ...Setup };

  const isActive = (href: string) => url === href;

  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations.sidebar.setup}
          </h3>
          <div className="">
            <NavLink
              active={route().current('setup.user.index')}
              href={route('setup.user.index')}
            >
              {translations.sidebar.users}
            </NavLink>
            <NavLink
              active={route().current('rooms.index')}
              href={route('rooms.index')}
            >
              {translations.sidebar.rooms}
            </NavLink>
            <NavLink
              active={route().current('equipment.index')}
              href={route('equipment.index')}
            >
              {translations.sidebar.equipment}
            </NavLink>
            <NavLink
              active={route().current('setup.monitor.task')}
              href={route('setup.monitor.task')}
            >
              {translations.sidebar.monitoringTask}
            </NavLink>
            <NavLink
              active={route().current('pause-monitorings.index')}
              href={route('pause-monitorings.index')}
            >
              {translations.sidebar.pauseMonitoring}
            </NavLink>
            <hr className="my-1"></hr>
            <NavLink
              active={route().current('setup.companies')}
              href={route('setup.companies')}
            >
              {translations.sidebar.company}
            </NavLink>
            <NavLink
              active={route().current('setup.places')}
              href={route('setup.places')}
            >
              {translations.sidebar.buisnessUnit}
            </NavLink>
            <NavLink
              active={route().current('integrations.index')}
              href={route('integrations.index')}
            >
              {translations.sidebar.integration}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSidebar;
