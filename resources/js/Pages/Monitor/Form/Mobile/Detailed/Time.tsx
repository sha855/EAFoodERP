import React from 'react';
import TextInput from '@/Components/TextInput';
import { FaRegClock } from 'react-icons/fa';

const Time: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div className="md:flex justify-between items-center gap-5">
        <div className="mb-1">
          <div className="mt-1">
            <TextInput
              type="text"
              className=" !p-1.5 border-0 border-gray-300 rounded w-full"
              required
              readOnly
            />
          </div>
        </div>
        <div>:</div>
        <div className="mb-1">
          <div className="mt-1">
            <TextInput
              type="text"
              className=" !p-1.5 border-0 border-gray-300 rounded w-full"
              required
              readOnly
            />
          </div>
        </div>
        <div>
          <FaRegClock />
        </div>
      </div>
    </div>
  );
};
export default Time;
