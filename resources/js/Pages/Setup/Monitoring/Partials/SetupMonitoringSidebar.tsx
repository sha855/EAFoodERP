import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';
import { MdOutlineSettings } from 'react-icons/md';

const SetupMonitoringSidebar = () => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Monitoring
          </h3>
          <div>
            {/*<NavLink*/}
            {/*  active={route().current('monitor')}*/}
            {/*  href={route('monitor')}*/}
            {/*>*/}
            {/*  Fill tasks*/}
            {/*</NavLink>*/}

            <NavLink
              active={route().current('setup.monitor.verification')}
              href={route('setup.monitor.verification')}
            >
              Verify tasks
            </NavLink>

            <NavLink
              active={route().current('monitoring.task.history')}
              href={route('monitoring.task.history')}
            >
              Task history
            </NavLink>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Settings
          </h3>
          <div>
            <NavLink
              active={route().current('equipment.index')}
              href={route('equipment.index')}
            >
              Equipment
            </NavLink>

            <NavLink
              active={route().current('rooms.index')}
              href={route('rooms.index')}
            >
              Rooms
            </NavLink>

            <NavLink
              active={route().current('setup.monitor.task')}
              href={route('setup.monitor.task')}
            >
              Monitoring tasks
            </NavLink>

            <NavLink
              active={route().current('pause-monitorings.index')}
              href={route('pause-monitorings.index')}
            >
              Pause monitoring
            </NavLink>

            <NavLink
              active={route().current('setup.monitor.app.download')}
              href={route('setup.monitor.app.download')}
            >
              Download the app
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupMonitoringSidebar;
