import React from 'react';
import NavLink from '@/Components/NavLink';

import { RiTeamFill } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
interface Messages {
  team: {
    created: string;
    updated: string;
    notFound: string;
  };
  role: {
    used: string;
    name: string;
    team: string;
    newTeamRole: string;
  };
  certificate: {
    created: string;
    missing: string;
  };
  delete: {
    confirm: string;
    no: string;
    yes: string;
  };
  actions: {
    add: string;
    edit: string;
    delete: string;
    activate: string;
    deactivate: string;
    confirmDelete: string;
  };
  training: {
    task: string;
    frequency: string;
    created: string;
    updated: string;
    notFound: string;
  };
  sidebarMenu: {
    team: {
      menu: string;
      subMenu: {
        teamMember: string;
        team: any;
      };
    };
    setting: {
      menu: string;
      subMenu: {
        teamRoles: string;
        certificateTraining: string;
      };
    };
  };
  teamMember: string;
  newTeamMember: string;
  addRole: string;
  addTraining: string;
  assignToTeamRoles: string;
  uploadDocument: string;
  issuedOn: string;
  validUntil: string;
  cancel: string;
  save: string;
  table: {
    membersRoles: string;
    yes: string;
    no: string;
    noTeamAvailable: string;
    noRoleAvailable: string;
    noTrainingAvailable: string;
  };
}

interface SidebarMenuProps {
  translations: Messages;
  isActive: any;
}
const SidebarMenu: React.FC<SidebarMenuProps> = ({
  translations,
  isActive,
}) => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Team
          </h3>

          {/* <h3 className="text-xl font-bold text-gray-800 p-4">{translations.sidebarMenu.team.subMenu?.team}</h3> */}

          <div className="">
            <NavLink active={route().current('team')} href={route('team')}>
              {translations.sidebarMenu.team.subMenu.teamMember}
            </NavLink>
          </div>
        </div>
        <div>
          <div className="">
            <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
              {translations.sidebarMenu.setting.menu}{' '}
            </h3>

            <div className="">
              <NavLink
                active={route().current('team.roles')}
                href={route('team.roles')}
                className=""
              >
                {translations.sidebarMenu.setting.subMenu.teamRoles}
              </NavLink>
              <NavLink
                active={route().current('team.certificates.trainings')}
                href={route('team.certificates.trainings')}
                className=""
              >
                {translations.sidebarMenu.setting.subMenu.certificateTraining}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
