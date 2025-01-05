import React from 'react';
import TextInput from '../TextInput';
import CommonButton from '../CommonButton';

const ProcessCreationForm = ({
  handleAddClick,
  data,
  setData,
  processing,
  errors,
  handleSubmit,
}: any) => {
  return (
    <div className="space-y-4">
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <label
              htmlFor="processName"
              className="block text-sm font-medium text-gray-700"
            >
              Process name
            </label>
            <TextInput
              type="text"
              id="processName"
              placeholder="Process name"
              className="mt-1 block w-full rounded-md border-red-500 focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
              value={data.process_name}
              onChange={(e) => setData('process_name', e.target.value)}
            />
            {errors.process_name && (
              <span className="text-red-500">{errors.process_name}</span>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">
            In use
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <TextInput
              type="checkbox"
              className="sr-only peer"
              checked={data.is_active_process}
              onChange={(e) => setData('is_active_process', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>

          {errors.is_active_process && (
            <div className="text-red-500 mt-1">{errors.is_active_process}</div>
          )}
        </div>

        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Additional information
          </label>
          <textarea
            id="additionalInfo"
            placeholder="Insert text here"
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-50 text-gray-500 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 sm:text-sm"
            value={data.additional_info}
            onChange={(e) => setData('additional_info', e.target.value)}
          />
          {errors.additional_info && (
            <div className="text-red-500 mt-1">{errors.additional_info}</div>
          )}
        </div>

        <div className="flex items-center">
          <label className="mr-2 text-sm font-medium text-gray-700">
            In use
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <TextInput
              type="checkbox"
              className="sr-only peer"
              checked={data.is_active_add_info}
              onChange={(e) => setData('is_active_add_info', e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
          {errors.is_active_add_info && (
            <div className="text-red-500 mt-1">{errors.is_active_add_info}</div>
          )}
        </div>

        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Potential hazards
          </h2>
          <CommonButton
            variant="text"
            className="text-green-600 hover:text-green-700"
            onClick={handleAddClick}
          >
            + ADD
          </CommonButton>
        </div>

        <div>
          <label
            htmlFor="hazardInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Hazard Information
          </label>
          <textarea
            id="hazardInfo"
            placeholder="Insert hazard information here"
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-50 text-gray-500 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 sm:text-sm"
            value={data.hazard_info}
            onChange={(e) => setData('hazard_info', e.target.value)}
          />
          {errors.hazard_info && (
            <span className="text-red-500">{errors.hazard_info}</span>
          )}
        </div>

        <div className="flex items-center mt-2">
          <label className="mr-2 text-sm font-medium text-gray-700">
            In use
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <TextInput
              type="checkbox"
              className="sr-only peer"
              checked={data.is_active_hazard_info}
              onChange={(e) =>
                setData('is_active_hazard_info', e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </label>
        </div>

        <div className="flex justify-end mt-4">
          <CommonButton
            type="button"
            variant="success"
            disabled={processing}
            className="mr-2"
            onClick={handleSubmit}
          >
            Save
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default ProcessCreationForm;
