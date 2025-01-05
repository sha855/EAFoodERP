import React, { ChangeEvent } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { selectedFieldData } from '@/types/monitoringForm';
import useFormValidations from '@/_hooks/useFormValidations';

interface TextCardProps {
  removeTaskFields: (id: number) => void;
  updateTaskFieldData: (data: {
    id: number;
    field: string;
    value: any;
    nestedData?: string;
  }) => void;
  item: selectedFieldData;
}

const validationSchema = {
  fieldTitle: (value: any) => (!value ? 'Field title is required' : null),
};

const TextCard: React.FC<TextCardProps> = ({
  removeTaskFields,
  updateTaskFieldData,
  item,
}) => {
  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);
  return (
    <div key={item.id} className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
      {/* Title and Delete Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Field: Enter Text</h3>
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
          onBlur={(e) => handleBlur('fieldTitle', e.target.value)}
          value={item.fieldTitle}
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

      {/* Information Tooltip */}
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

export default TextCard;
