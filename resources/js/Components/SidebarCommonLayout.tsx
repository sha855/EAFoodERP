import clsx from 'clsx';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface SidebarCommonLayoutProps {
  children: React.ReactNode;
  onMobileActive: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarCommonLayout({
  children,
  onMobileActive,
  onClose,
}: SidebarCommonLayoutProps) {
  return (
    <div
      className={clsx(
        'fixed lg:static z-20 top-8 md:top-8 pt-0 ease-in duration-300',
        onMobileActive ? 'left-5' : '-left-full'
      )}
    >
      <X
        className="mx-auto mr-0 relative top-9 -right-3 lg:hidden bg-gradient-org-red w-8 h-8 rounded-full text-white p-1.5 z-10"
        onClick={() => onClose(false)}
      />
      {children}
    </div>
  );
}
