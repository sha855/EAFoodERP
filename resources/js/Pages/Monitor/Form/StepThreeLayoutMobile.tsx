import React from 'react';
import CommonToolTip from '@/Components/CommonTooltip';
import { LuBookOpen } from 'react-icons/lu';
import CommonButton from '@/Components/CommonButton';

interface StepThreeProps {
  data: {
    task_name: string;
  };
  children?: React.ReactNode;
  isButton?: boolean;
}

const StepThreeLayoutMobile: React.FC<StepThreeProps> = ({
  data,
  children,
  isButton = true,
}) => {
  return (
    <div className="max-h-[536px] overflow-y-auto bg-white rounded-xl p-3 mt-5 max-w-[275px] w-[30vh]">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base">{data?.task_name}</h3>
        <CommonToolTip
          placement={'bottom-end'}
          title={'Your instructions will be shown in the app'}
        >
          <div>
            <LuBookOpen className="text-orange-400 cursor-pointer" />
          </div>
        </CommonToolTip>
      </div>
      {children}
      {isButton && (
        <div className="mt-8">
          <CommonButton
            variant="outlined"
            type="button"
            className="flex justify-center items-center w-full bg-gradient-org-red text-white !border-0"
          >
            Save
          </CommonButton>
        </div>
      )}
    </div>
  );
};
export default StepThreeLayoutMobile;
