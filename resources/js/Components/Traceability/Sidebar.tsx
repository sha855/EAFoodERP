import React from 'react';
import { usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

import { GoProjectSymlink } from 'react-icons/go';
import { AiOutlineProduct } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';

interface SidebarProps {
  translations?: any[];
}

export default function Sidebar({ translations }: any) {
  const { url } = usePage().props;
  const isActive = (href: string) => url === href;
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]	">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations.sidebarMenu.traceability.menu}
          </h3>
          <div className="">
            <NavLink
              href={route('traceability')}
              active={route().current('traceability')}
            >
              {translations.sidebarMenu.traceability.subMenu.preparedProducts}
            </NavLink>
            {/* <NavLink href="/task-history" active={isActive('/task-history')}>
              {translations.sidebarMenu.traceability.subMenu.taskHistory}
            </NavLink> */}
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations.sidebarMenu.products.menu}
          </h3>

          <div className="">
            <NavLink
              href={route('recipes-ingredients')}
              active={route().current('recipes-ingredients')}
            >
              {translations.sidebarMenu.products.subMenu.recipeIngred}
            </NavLink>
            <NavLink
              href="/allergen-chart"
              active={isActive('/allergen-chart')}
            >
              {translations.sidebarMenu.products.subMenu.allergen}
            </NavLink>
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            {translations.sidebarMenu.setting.menu}
          </h3>

          <div className="">
            <NavLink
              href={route('custom-units')}
              active={route().current('custom-units')}
            >
              {translations.sidebarMenu.setting.subMenu.customMeasure}
            </NavLink>
            {/* <NavLink
              href="/traceability-tasks"
              active={isActive('/traceability-tasks')}
            >
              {translations.sidebarMenu.setting.subMenu.traceablityTask}
            </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
}
