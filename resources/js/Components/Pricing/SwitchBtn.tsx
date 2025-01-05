import React, { ChangeEvent, ReactNode } from 'react';

interface SwitchBtnProps {
  className?: string;
  children?: ReactNode;
  value?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SwitchBtn: React.FC<SwitchBtnProps> = ({
  className,
  children,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {children}
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={value}
          type="checkbox"
          className="sr-only peer"
          onChange={onChange}
        />
        <div
          className={`relative w-16 h-8 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:bg-gradient-org-red peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[4px] after:start-[7px] after:bg-white after:rounded-full after:w-6 after:h-6 after:transition-all ${className}`}
        ></div>
      </label>
    </div>
  );
};

export default SwitchBtn;
