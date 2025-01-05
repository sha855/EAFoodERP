import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({
  active,
  className = '',
  children,
  ...props
}: InertiaLinkProps & { active?: boolean }) {
  return (
    <Link
      {...props}
      className={
        'block  transition  !text-base font-normal hover:!bg-transparent ' +
        (active
          ? ' text-orange-400 !bg-slate-50  !border-r-4 !border-orange-400 pl-6 py-2'
          : 'border-indigo-400 text-gray-500 hover:text-orange-400 focus:border-orange-400 hover:!bg-slate-50 !border-r-4 border-transparent pl-6 py-2') +
        className
      }
    >
      {children}
    </Link>
  );
}
