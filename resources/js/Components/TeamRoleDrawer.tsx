import CommonButton from './CommonButton';
import { DrawerProps } from '@/types/feature';
import { useRef } from 'react';

export default function Drawer({
  isDrawerOpen,
  onClose,
  formContent,
  title,
}: DrawerProps) {
  const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form

  if (!isDrawerOpen) return null;

  const handleSaveClick = () => {
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-end z-[999]">
      <div className="bg-white w-[500px] p-6 flex flex-col h-full overflow-y-auto">
        {/* Drawer Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-bold">{title}</h4>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            X
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-grow">
          <form ref={formRef} id="teamFrm">
            {formContent}
          </form>
        </div>

        {/* Footer with Buttons */}
        <div className="flex justify-between mt-4 space-x-2">
          <CommonButton onClick={onClose} variant="outlined">
            Cancel
          </CommonButton>
          <CommonButton
            style={{
              background:
                'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
            }}
            variant="success"
            type="button"
            onClick={handleSaveClick}
          >
            Save
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
