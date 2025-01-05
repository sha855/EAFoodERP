import CommonButton from './CommonButton';
import { DrawerProps } from '@/types/feature';
import { IoClose } from 'react-icons/io5';
export default function Drawer({
  isDrawerOpen,
  onClose,
  formContent,
  title,
}: DrawerProps) {
  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[9999]">
      <div className="bg-white w-[600px]  flex flex-col md:h-full overflow-y-auto m-2 md:m-0">
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

        <div className="px-6 py-6">
          <div className="flex-grow">{formContent}</div>
        </div>
      </div>
    </div>
  );
}
