import { LuBookOpen } from 'react-icons/lu';
import CommonButton from '@/Components/CommonButton';
import React, { ReactNode } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import CommonToolTip from '@/Components/CommonTooltip';

interface CommonMobileCardProps {
  children: ReactNode;
  sampleAlert: boolean;
  saveButton: boolean;
  data?: any;
}

export default function CommonMobileCard({
  sampleAlert,
  saveButton,
  data,
  children,
}: CommonMobileCardProps) {
  return (
    <>
      {sampleAlert && (
        <div className="flex justify-center items-center w-full">
          <span className="flex gap-2 mx-0 items-center bg-yellow-200 p-3 rounded-md w-full">
            <IoIosInformationCircleOutline className="h-7 w-7" />
            Sample content
          </span>
        </div>
      )}
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
        {saveButton && (
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
    </>
  );
}
