import NavLink from '@/Components/NavLink';

const HaccpSidebar = () => {
  return (
    <div className="w-72 bg-white  border border-gray-100 mr-4 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 p-4">Haccp Plan</h3>

        <div className="space-y-1 px-5">
          <div className="mt-2">
            <NavLink
              href={route('haccp.general-Info')}
              active={route().current('haccp.general-Info')}
            >
              <span className="cursor-pointer">General Info</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('work-group.index')}
              active={route().current('work-group.index')}
            >
              <span className="cursor-pointer"> Work group</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('haccp.process')}
              active={route().current('haccp.process')}
            >
              <span className="cursor-pointer">Process Steps</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('haccp.food-product')}
              active={route().current('haccp.food-product')}
            >
              <span className="cursor-pointer">Produce/ Served/ Sold food</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('production.volume')}
              active={route().current('production.volume')}
            >
              <span className="cursor-pointer">Production Volume</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('haccp.ingredients')}
              active={route().current('haccp.ingredients')}
            >
              <span className="cursor-pointer">Ingredients</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('haccp.analyses')}
              active={route().current('haccp.analyses')}
            >
              <span className="cursor-pointer">Analyses</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('flow-chart.index')}
              active={route().current('flow-chart.index')}
            >
              <span className="cursor-pointer">Flow chart</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('location-plan.index')}
              active={route().current('location-plan.index')}
            >
              <span className="cursor-pointer">Location Plan</span>
            </NavLink>
          </div>

          <div className="mt-2">
            <NavLink
              href={route('floor-plan.index')}
              active={route().current('floor-plan.index')}
            >
              <span className="cursor-pointer">Floor Plan</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaccpSidebar;
