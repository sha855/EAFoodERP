import Radio from '@mui/material/Radio';
import CommonToolTip from '@/Components/CommonTooltip';
import React from 'react';

interface Step2Props {
  type: [];
  selectedType: string;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  selectedTaskRelated: string;
  handleChangeEntity: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  TaskRelatedOptions?: any;
}

export default function Step2({
  type,
  selectedType,
  handleChange,
  selectedTaskRelated,
  TaskRelatedOptions,
  handleChangeEntity,
}: Step2Props) {
  return (
    <>
      <div className="flex justify-between gap-2 py-3 mx-4">
        <div className="flex items-center gap-3">
          <span>This task is a</span>

          {Object.entries(type).map(
            ([key, value]: [any, any], index: number) => (
              <div key={index} className="flex items-center">
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
      </div>
      <p className="mx-4">This task is related to</p>

      <div className="gap-1 mx-4">
        {Object.entries(TaskRelatedOptions).map(([key, value]: [any, any]) => (
          <label
            key={key}
            htmlFor={`radio-${key}`}
            className="border border-orange-500 rounded-md w-full p-2 col-span-1 mb-5 cursor-pointer flex items-center gap-2"
          >
            <Radio
              id={`radio-${key}`}
              checked={selectedTaskRelated === key}
              onChange={handleChangeEntity}
              value={key}
              name="taskRelated"
              inputProps={{ 'aria-label': key }}
            />
            <div>
              <strong>{value?.label}</strong>
              <p>{value?.description}</p>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}
