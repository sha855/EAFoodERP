import React from 'react';
import { LuBookOpen } from 'react-icons/lu';
import CommonToolTip from '@/Components/CommonTooltip';
import Radio from '@mui/material/Radio';

interface Step3Props {
  selectedTaskRelated: string;
  taskRelatedOptions: { [key: string]: { label: string } };
  handleModal: () => void;
  handleChangeEntity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedType: string;
  type: any;
  editData?: any;
}

const Step3: React.FC<Step3Props> = ({
  selectedTaskRelated,
  taskRelatedOptions,
  handleModal,
  handleChangeEntity,
  handleChange,
  selectedType,
  type,
  editData,
}) => {
  return (
    <div className="mx-4">
      {/* Button to open modal */}
      <div className="flex justify-end">
        <div
          onClick={handleModal}
          className="p-2 text-red-400 flex gap-2 justify-center cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <LuBookOpen className="text-red-400 cursor-pointer" />
          ADD INSTRUCTIONS
        </div>
      </div>

      {/* Dropdown selection */}
      {!editData && (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="task_related" className="text-base mb-2 block">
              This task is related to
            </label>
            <select
              onChange={handleChangeEntity}
              name="hazards_type"
              value={selectedTaskRelated}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Object.entries(taskRelatedOptions).map(([key, option]) => (
                <option key={key} value={key}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          {Object.entries(type).map(
            ([key, value]: [any, any], index: number) => (
              <div key={index} className="flex items-center pt-5">
                <Radio
                  checked={selectedType === key}
                  onChange={handleChange}
                  value={key}
                  name="type"
                  inputProps={{ 'aria-label': key }}
                />
                <span>{value.label}</span>
                <CommonToolTip className="ml-1" title={value.toolTip} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Step3;
