import TextInput from '@/Components/TextInput';
import { TbTemperatureFahrenheit } from 'react-icons/tb';
import React from 'react';
import { IoQrCodeOutline } from 'react-icons/io5';
import CommonButton from '@/Components/CommonButton';
import { CiCamera } from 'react-icons/ci';
import { MdAttachFile } from 'react-icons/md';

export default function DetailedNone() {
  return (
    <>
      <div className="mb-3">
        <label className="block text-gray-700 text-sm font-medium">
          Product
        </label>
        <div className="relative mt-3">
          <TextInput
            type="text"
            className="!p-2 border border-gray-300 rounded w-full"
            required
            placeholder="Your product"
          />
          <IoQrCodeOutline className="absolute top-3 right-2 text-xl w-5 h-5" />
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
          Upload a picture
        </label>
        <div className="grid grid-cols-2 gap-4 mt-3">
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
    </>
  );
}
