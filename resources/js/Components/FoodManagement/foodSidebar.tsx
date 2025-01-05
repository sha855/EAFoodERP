import NavLink from '@/Components/NavLink';

import { IoFastFoodOutline } from 'react-icons/io5';

const FoodSidebar = () => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <div className="">
          <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
            Food Business
          </h3>
          <div className="">
            <NavLink
              active={route().current('admin.food.index')}
              href={route('admin.food.index')}
              className=""
            >
              Business Type
            </NavLink>
            <NavLink
              active={route().current('admin.business-activity.index')}
              href={route('admin.business-activity.index')}
              className=""
            >
              Additional Business Activity
            </NavLink>
            <NavLink
              active={route().current('admin.business-unit.index')}
              href={route('admin.business-unit.index')}
              className=""
            >
              Business Unit
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSidebar;
