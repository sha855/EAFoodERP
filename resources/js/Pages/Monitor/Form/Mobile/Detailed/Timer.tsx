import React from 'react';
import TextInput from '@/Components/TextInput';
import { TfiAngleDown } from 'react-icons/tfi';

const Timer: React.FC = () => {
  return (
    <div className="mt-2">
      <label className="block text-gray-700 text-sm font-medium ">Timer</label>
      <div className="mt-1 relative">
        <TextInput
          type="text"
          className=" !p-1.5 border-0 border-gray-300 rounded w-full"
          required
          readOnly
          value={'2 hours'}
        />
        <TfiAngleDown className="absolute top-3 right-2 text-lg w-4 h-4" />
      </div>
    </div>
  );
};
export default Timer;
