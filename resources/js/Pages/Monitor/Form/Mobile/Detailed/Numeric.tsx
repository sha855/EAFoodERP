import React from 'react';
import TextInput from '@/Components/TextInput';

const Numeric: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div className="flex justify-between mt-1">
        <TextInput
          type="number"
          className=" !p-1.5 border-0 border-gray-300 border-r-0 rounded-l w-full"
          required
        />
        <TextInput
          type="number"
          className=" !p-1.5 border-0 border-gray-300 border-l-0 rounded-r w-full"
          required
          readOnly
        />
      </div>
    </div>
  );
};
export default Numeric;
