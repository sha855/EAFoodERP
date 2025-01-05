import React, { ChangeEvent } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { selectedFieldData } from '@/types/monitoringForm';
import useFormValidations from '@/_hooks/useFormValidations';

interface NumericCardProps {
  removeTaskFields: (id: number) => void;
  updateTaskFieldData: (data: {
    id: number;
    field: string;
    value: any;
    nestedData?: string;
  }) => void;
  getFieldValue: any;
  item: selectedFieldData;
}

const validationSchema = {
  fieldTitle: (value: any) => (!value ? 'Field title is required' : null),
  min: (value: any) => (!value ? 'Min is Required' : null),
  max: (value: any) => (!value ? 'max is Required' : null),
  unit: (value: any) => (!value ? 'unit is Required' : null),
};

const NumericCard: React.FC<NumericCardProps> = ({
  removeTaskFields,
  updateTaskFieldData,
  getFieldValue,
  item,
}) => {
  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);
  return (
    <div key={item.id} className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
      {/* Title and Delete Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Field: Enter numeric value</h3>
        <MdDeleteOutline
          onClick={() => removeTaskFields(item.id)}
          className="w-6 h-6 text-lg cursor-pointer text-red-400"
        />
      </div>

      {/* Field Title Input */}
      <div className="w-full">
        <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
          Field title
        </label>
        <input
          type="text"
          value={item.fieldTitle}
          onBlur={(e) => handleBlur('fieldTitle', e.target.value)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            updateTaskFieldData({
              id: item.id,
              field: 'fieldTitle',
              value: event.target.value,
            });
            handleInputChange('fieldTitle', event.target.value);
          }}
          className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
          required
        />
        <ShowError fieldName={'fieldTitle'} />
      </div>

      {/* Numeric Range Inputs */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Minimum
          </label>
          <input
            type="number"
            onBlur={(e) => handleBlur('min', e.target.value)}
            onChange={(e) => {
              updateTaskFieldData({
                id: item.id,
                field: 'details',
                value: e.target.value,
                nestedData: 'min',
              });
              handleInputChange('min', e.target.value);
            }}
            className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
            required
          />
          <ShowError fieldName={'min'} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Maximum
          </label>
          <input
            type="number"
            onBlur={(e) => handleBlur('max', e.target.value)}
            onChange={(e) => {
              updateTaskFieldData({
                id: item.id,
                field: 'details',
                value: e.target.value,
                nestedData: 'max',
              });
              handleInputChange('max', e.target.value);
            }}
            className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
            required
          />
          <ShowError fieldName={'max'} />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Unit
          </label>
          <input
            type="text"
            onBlur={(e) => handleBlur('unit', e.target.value)}
            onChange={(e) => {
              updateTaskFieldData({
                id: item.id,
                field: 'details',
                value: e.target.value,
                nestedData: 'unit',
              });
              handleInputChange('unit', e.target.value);
            }}
            className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
            required
          />
          <ShowError fieldName={'unit'} />
        </div>
      </div>

      {/* Checkbox for "Limit" */}
      <div className="flex items-center">
        <input
          id="limit-checkbox"
          type="checkbox"
          className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0 dark:bg-gray-700 dark:border-gray-600"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            updateTaskFieldData({
              id: item.id,
              field: 'details',
              value: event.target.checked,
              nestedData: 'isLimit',
            })
          }
          checked={getFieldValue({
            id: item.id,
            field: 'details',
            nestedField: 'isLimit',
          })}
        />
        <label
          htmlFor="limit-checkbox"
          className="ms-2 text-sm font-medium !text-black dark:text-gray-300"
        >
          If entry is out of limits, ask for explanation
        </label>
      </div>
    </div>
  );
};

export default NumericCard;
