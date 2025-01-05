import React, { ChangeEvent } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosInformationCircleOutline, IoMdClose } from 'react-icons/io';
import { selectedFieldData } from '@/types/monitoringForm';
import useFormValidations from '@/_hooks/useFormValidations';

interface Option {
  id: number;
  value: string;
}

interface FieldProps {
  index: number;
  item: selectedFieldData;
  removeTaskFields: (id: number) => void;
  UpdateTaskFieldData: (data: {
    id: number;
    field: string;
    value: any;
    nestedData?: string;
  }) => void;
  GetFieldValue: any;
  removeOptions: any;
  uniqueId: string;
}

const validationSchema = {
  fieldTitle: (value: any) => (!value ? 'Field title is required' : null),
  ...Object.assign(
    {},
    ...Array(50)
      .fill('')
      .map((_, index: Number) => ({
        [`options${index}`]: (value: any) =>
          !value ? `Field is required` : null,
      }))
  ),
};

const MultipleAnswerCard: React.FC<FieldProps> = ({
  index,
  item,
  removeTaskFields,
  UpdateTaskFieldData,
  GetFieldValue,
  removeOptions,
  uniqueId,
}) => {
  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);
  return (
    <div key={index}>
      <div className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Field: Choose multiple answers</h3>
          <MdDeleteOutline
            onClick={() => removeTaskFields(item.id)}
            className="w-6 h-6 text-lg cursor-pointer text-red-400"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
            Question
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
            value={GetFieldValue({
              id: item.id,
              field: 'fieldTitle',
            })}
            className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
            required
          />
          <ShowError fieldName={'fieldTitle'} />
        </div>

        <div>
          <div className="gap-2">
            {GetFieldValue({
              id: item.id,
              field: 'details',
              nestedField: 'options',
            })?.map((option: Option, optionIndex: number) => (
              <div key={option.id} className="flex items-center mb-3">
                <div className="w-10/12">
                  <label className="block mb-2 text-sm font-medium !text-black dark:text-white">
                    Option {optionIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={option.value || ''}
                    onBlur={(e) =>
                      handleBlur(`options${optionIndex}`, e.target.value)
                    }
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const updatedOptions = GetFieldValue({
                        id: item.id,
                        field: 'details',
                        nestedField: 'options',
                      })?.map((opt: Option, optIndex: number) =>
                        optIndex === optionIndex
                          ? { id: option.id, value: event.target.value }
                          : opt
                      );
                      UpdateTaskFieldData({
                        id: item.id,
                        field: 'details',
                        value: updatedOptions,
                        nestedData: 'options',
                      });
                      handleInputChange(
                        `options${optionIndex}`,
                        event.target.value
                      );
                    }}
                    className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
                    required
                  />
                  <ShowError fieldName={`options${optionIndex}`} />
                </div>
                <div className="w-2/12">
                  <button
                    type="button"
                    onClick={() =>
                      removeOptions({
                        optionId: option.id,
                        componentId: item.id,
                        nestedField: 'options',
                      })
                    }
                    className="text-black flex justify-center items-center focus:ring-0 font-medium rounded-md text-sm p-3 w-14 mt-7"
                  >
                    <IoMdClose className="text-lg w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              const currentOptions =
                GetFieldValue({
                  id: item.id,
                  field: 'details',
                  nestedField: 'options',
                }) || [];

              UpdateTaskFieldData({
                id: item.id,
                field: 'details',
                value: [
                  ...currentOptions,
                  {
                    id: uniqueId,
                    value: '',
                  },
                ],
                nestedData: 'options',
              });
            }}
            type="button"
            className="w-28 mt-5 focus:ring-0 font-bold text-orange-400 underline hover:no-underline hover:bg-gray-200 hover:rounded-full rounded-md text-sm p-2 uppercase"
          >
            Add option
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultipleAnswerCard;
