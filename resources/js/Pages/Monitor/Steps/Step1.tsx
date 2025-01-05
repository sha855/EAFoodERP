import Radio from '@mui/material/Radio';
import React from 'react';

export default function Step1({ type, selectedType, handleChange }: any) {
  return (
    <>
      <div className="flex justify-between gap-2 mx-4">
        {Object.entries(type).map(([key, value]: [any, any], index: number) => (
          <label
            key={index}
            htmlFor={`radio-${key}`}
            className="border border-orange-500 rounded-md w-full p-2 col-span-1 cursor-pointer  gap-2"
          >
            <Radio
              id={`radio-${key}`}
              checked={selectedType === key}
              onChange={handleChange}
              value={key}
              name="type"
              inputProps={{ 'aria-label': key }}
            />

            <div>
              <p>
                <strong>{value?.label}</strong> {value?.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}
