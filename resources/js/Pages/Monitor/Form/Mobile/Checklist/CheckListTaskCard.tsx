import React, { useMemo } from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoMdCheckmark } from 'react-icons/io';
import { useAppSelector } from '@/_hooks/useStore';

interface CheckListCardProps {
  checkListTaskData: any;
}

const CheckListTaskCard: React.FC<CheckListCardProps> = ({
  checkListTaskData,
}) => {
  const { checkListActive } = useAppSelector((state) => state.state);

  const handleChecklistList = useMemo(() => {
    const checkList = 'Checklist Task';
    if (checkListActive === checkList) {
      return checkListTaskData[checkListActive];
    } else {
      return Object.keys(checkListTaskData)
        .filter((item) => item !== checkList)
        .map((item, index: number) => ({
          name: item,
          id: index,
        }));
    }
  }, [checkListActive, checkListTaskData]);

  return (
    <>
      {handleChecklistList?.map((item: any, index: number) => (
        <div key={item.id || index} className="grid grid-cols-1 gap-4 mt-4">
          <div className="flex justify-between items-start">
            {/* Icon */}
            <div className="w-1/12">
              <GoDotFill className="w-5 h-5 text-orange-400" />
            </div>
            {/* Task Description */}
            <div className="w-10/12">
              <p className="text-base text-slate-400 leading-5">
                {item.name?.trim() ? item.name : 'What needs to be done?'}
              </p>
            </div>
            {/* Check Icon */}
            <div className="w-2/12 flex justify-end">
              <span className="w-7 h-7 bg-slate-300 rounded-full flex justify-center items-center">
                <IoMdCheckmark />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CheckListTaskCard;
