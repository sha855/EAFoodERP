import React, { ChangeEvent } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { selectedFieldData } from '@/types/monitoringForm';
import useFormValidations from '@/_hooks/useFormValidations';

interface TaskFieldCardProps {
  removeTaskFields: (id: number) => void;
  item: selectedFieldData;
  UpdateTaskFieldData: (data: {
    id: number;
    field: string;
    value: any;
    nestedData?: string;
  }) => void;
  GetFieldValue: any;
}

interface ValidationSchema {
  fieldTitle: string | null;
  min: string | null;
  max: string | null;
  isLimit: string | null;
}

const validationSchema = {
  fieldTitle: (value: any) => (!value ? 'Field title is required' : null),
  min: (value: any) => (!value ? 'Min is Required' : null),
  max: (value: any) => (!value ? 'max is Required' : null),
};

const TaskFieldCard: React.FC<TaskFieldCardProps> = ({
  removeTaskFields,
  item,
  UpdateTaskFieldData,
  GetFieldValue,
}) => {
  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);
  return (
    <div className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg !text-black">
          Field: Enter temperature
        </h3>
        <MdDeleteOutline
          onClick={() => removeTaskFields(item.id)}
          className="w-6 h-6 text-lg cursor-pointer text-red-400"
        />
      </div>

      <div className="w-full">
        <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
          Field title
        </label>
        <input
          type="text"
          onBlur={(e) => handleBlur('fieldTitle', e.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            UpdateTaskFieldData({
              id: item.id,
              field: 'fieldTitle',
              value: event.target.value,
            });
            handleInputChange('fieldTitle', event.target.value);
          }}
          value={
            GetFieldValue({
              id: item.id,
              field: 'fieldTitle',
            }) as string
          }
          className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0"
          required
        />
        <ShowError fieldName={'fieldTitle'} />
      </div>

      <div className="flex">
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Minimum
          </label>
          <div className="flex items-center gap-2">
            <div className="w-10/12">
              <input
                type="number"
                onBlur={(e) => handleBlur('min', e.target.value)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  UpdateTaskFieldData({
                    id: item.id,
                    field: 'details',
                    value: event.target.value,
                    nestedData: 'min',
                  });
                  handleInputChange('min', event.target.value);
                }}
                value={
                  GetFieldValue({
                    id: item.id,
                    field: 'details',
                    nestedField: 'min',
                  }) as string
                }
                className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0"
                required
              />
            </div>
            <div className="w-2/12">
              <h5 className="text-lg font-bold">°C</h5>
            </div>
          </div>
          <ShowError fieldName={'min'} />
        </div>
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Maximum
          </label>
          <div className="flex items-center gap-2">
            <div className="w-10/12">
              <input
                type="number"
                onBlur={(e) => handleBlur('max', e.target.value)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  UpdateTaskFieldData({
                    id: item.id,
                    field: 'details',
                    value: event.target.value,
                    nestedData: 'max',
                  });
                  handleInputChange('max', event.target.value);
                }}
                value={
                  GetFieldValue({
                    id: item.id,
                    field: 'details',
                    nestedField: 'max',
                  }) as string
                }
                className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0"
                required
              />
            </div>
            <div className="w-2/12">
              <h5 className="text-lg font-bold">°C</h5>
            </div>
          </div>
          <ShowError fieldName={'max'} />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            UpdateTaskFieldData({
              id: item.id,
              field: 'details',
              value: event.target.checked,
              nestedData: 'isLimit',
            })
          }
          checked={Boolean(
            GetFieldValue({
              id: item.id,
              field: 'details',
              nestedField: 'isLimit',
            })
          )}
        />
        <label className="ms-2 text-sm font-medium !text-black dark:text-gray-300">
          If entry is out of limits, ask for explanation
        </label>
      </div>

      <div className="flex gap-3">
        <IoIosInformationCircleOutline className="text-lg w-6 h-6" />
        <small>
          Two task fields cannot have the same name — try to modify by adding 1,
          2, or 3 to the end!
        </small>
      </div>
    </div>
  );
};

export default TaskFieldCard;
