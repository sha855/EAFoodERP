import React from 'react';
import TextInput from '@/Components/TextInput';
import { TfiAngleDown } from 'react-icons/tfi';
import CommonButton from '@/Components/CommonButton';
import { CiCamera } from 'react-icons/ci';
import { MdAttachFile } from 'react-icons/md';

const Ticket: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">Ticket</label>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="red-checkbox"
          className="w-4 h-4 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0 dark:bg-gray-700 dark:border-gray-600"
        />
        <label className="ms-2 text-sm font-medium !text-black dark:text-gray-300">
          Create ticket
        </label>
      </div>

      <div className="mt-2">
        <label className="block text-gray-700 text-sm font-medium ">
          Received by
        </label>
        <div className="mt-1 relative">
          <TextInput
            type="text"
            className=" !p-1.5 border-0 border-gray-300 rounded w-full"
            required
            readOnly
            value={'Management'}
          />
          <TfiAngleDown className="absolute top-3 right-2 text-lg w-4 h-4" />
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-gray-700 text-sm font-medium ">
          Ticket file
        </label>
        <div className="mt-1 relative">
          <textarea className="bg-slate-100 text-slate-400  mt-1 !p-1.5 border-0  rounded w-full"></textarea>
        </div>
      </div>
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
    </div>
  );
};
export default Ticket;
