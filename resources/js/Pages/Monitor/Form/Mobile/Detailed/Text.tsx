import React from 'react';
import TextInput from '@/Components/TextInput';

const Text: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div>
        <div className="mb-1">
          <div className="mt-1">
            <TextInput
              type="text"
              className=" !p-1.5 border-0 border-gray-300 rounded w-full"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Text;
