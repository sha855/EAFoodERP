import React, { ChangeEvent } from 'react';

interface CheckboxProps {
  setSameForAllCheckList: any;
  sameForAllCheckList: any;
}

const SameForAllCheckbox: React.FC<CheckboxProps> = ({
  setSameForAllCheckList,
  sameForAllCheckList,
}) => {
  return (
    <div className="flex items-center justify-start mt-2">
      <input
        type="checkbox"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSameForAllCheckList(e.target.checked)
        }
        checked={sameForAllCheckList}
        className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0	  dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="red-checkbox"
        className="ms-2 text-gray-700 text-sm font-medium"
      >
        Same for all
      </label>
    </div>
  );
};

export default SameForAllCheckbox;
