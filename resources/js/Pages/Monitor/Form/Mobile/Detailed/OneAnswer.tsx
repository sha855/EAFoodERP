import React from 'react';
import TextInput from '@/Components/TextInput';
import { MdOutlineQrCode } from 'react-icons/md';

const OneAnswer: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div className="mt-1 relative">
        <TextInput
          type="text"
          className=" !p-1.5 border-0 border-gray-300 rounded w-full"
          required
          readOnly
          placeholder="Your Products"
        />
        <MdOutlineQrCode className="absolute top-3 right-2 text-lg w-4 h-4" />
      </div>
    </div>
  );
};
export default OneAnswer;
