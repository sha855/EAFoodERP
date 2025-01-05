import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TextInput from '@/Components/TextInput';
import { TbTemperatureFahrenheit } from 'react-icons/tb';
import React from 'react';

export default function DetailedRoom() {
  return (
    <>
      <div className="flex justify-between py-4">
        <div>Used for: Preparation room</div>
        <div>
          <FaChevronUp />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">
          Room temperature
        </label>
        <div className="relative mt-3">
          <TextInput
            type="text"
            className="!p-2 border border-gray-300 rounded w-full"
            required
          />
          <TbTemperatureFahrenheit className="absolute top-3 right-2 text-xl w-5 h-5" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">
          Room humidity %
        </label>

        <TextInput
          type="number"
          className="border rounded px-4 py-2 w-full mb-3"
        />
      </div>

      <div className="flex justify-between py-4">
        <div>Used for: Kitchen</div>
        <div>
          <FaChevronDown />
        </div>
      </div>
    </>
  );
}
