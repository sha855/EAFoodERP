import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';

interface CommonDrawerProps {
  isDrawerOpen: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: {
    outerClassName?: string;
    innerClassName?: string;
  };
}

export default function CommonDrawer({
  isDrawerOpen,
  title,
  onClose,
  children,
  className,
}: CommonDrawerProps) {
  return isDrawerOpen ? (
    <div
      className={clsx(
        'fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[999]',
        className?.outerClassName
      )}
    >
      <div
        className={clsx(
          'bg-white p-0 w-[500px] flex flex-col h-full overflow-y-auto',
          className?.innerClassName
        )}
      >
        {/* Drawer Header */}
        <div className="px-4 py-4 bg-gray-100">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">{title}</h4>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black w-8 h-8 flex justify-center items-center rounded-full text-white bg-gradient-org-red"
            >
              <IoClose />
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  ) : null;
}
