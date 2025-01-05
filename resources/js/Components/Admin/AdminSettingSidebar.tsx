import NavLink from '@/Components/NavLink';

const AdminSettingSidebar = () => {
  return (
    <div className="w-64 mr-0 relative -left-6">
      <div className="bg-white border border-gray-100 lg:fixed w-64 h-screen lg:top-16 lg:pt-8 px-0 overflow-auto pb-[70px]">
        <h3 className="text-lg font-semibold text-gray-800 py-2 px-3">
          Setting
        </h3>
        <div>
          <NavLink
            href={route('admin.setting')}
            active={route().current('admin.setting')}
          >
            <span className="cursor-pointer">General</span>
          </NavLink>

          <NavLink
            href={route('admin.setting.logo')}
            active={route().current('admin.setting.logo')}
          >
            <span className="cursor-pointer">Logo</span>
          </NavLink>

          {/*  <NavLink*/}
          {/*  href={route('admin.setting.logo')}*/}
          {/*  active={route().current('admin.setting.logo')}*/}
          {/*>*/}
          {/*  <span className="cursor-pointer">SMTP</span>*/}
          {/*</NavLink>*/}
        </div>
      </div>
    </div>
  );
};

export default AdminSettingSidebar;
