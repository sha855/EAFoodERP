import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import TextInput from '@/Components/TextInput';
import { TbTemperatureFahrenheit } from 'react-icons/tb';
import React from 'react';

export default function DetailedEquipment() {
  return (
    <>
      <div className="flex justify-between py-4">
        <div>Used for: Fridge</div>
        <div>
          <FaChevronUp />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">
          Temperature
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
          Select custom option
        </label>
        <select
          disabled={true}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option>Disinfected</option>
        </select>
      </div>

      <div className="flex justify-between py-4">
        <div>Used for: Fridge 2</div>
        <div>
          <FaChevronDown />
        </div>
      </div>
    </>
  );
}
