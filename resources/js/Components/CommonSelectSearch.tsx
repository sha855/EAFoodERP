import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface CommonSelectSearchProps {
  options: OptionType[];
  defaultValue?: OptionType;
  value?: OptionType | null | OptionType[];
  onChange?: (
    selectedOption: SingleValue<OptionType> | MultiValue<OptionType>
  ) => void;
  placeholder?: string;
  isClearable?: boolean;
  [key: string]: any;
}

export default function CommonSelectSearch({
  options,
  defaultValue,
  value,
  onChange,
  placeholder = 'Select an option',
  isClearable = true,
  ...args
}: CommonSelectSearchProps) {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      {...args}
    />
  );
}
