import React from 'react';
import CommonButton from '@/Components/CommonButton';
import { CiCamera } from 'react-icons/ci';
import { MdAttachFile } from 'react-icons/md';

const PhotoFile: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div className="grid grid-cols-2 gap-4 mt-1">
        <CommonButton
          variant="outlined"
          type="button"
          className="flex justify-center items-center !py-1.5 !border"
        >
          <CiCamera className="text-xl w-6 h-6" />
        </CommonButton>
        <CommonButton
          variant="outlined"
          type="button"
          className="flex justify-center items-center !py-1.5 !border"
        >
          <MdAttachFile className="text-xl w-6 h-6" />
        </CommonButton>
      </div>
    </div>
  );
};
export default PhotoFile;
