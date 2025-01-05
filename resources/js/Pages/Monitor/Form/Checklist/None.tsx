import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoIosCheckmarkCircle } from 'react-icons/io';

interface ChecklistNoneProps {
  checklistNoneList: string[];
}

export default function ChecklistNone({
  checklistNoneList,
}: ChecklistNoneProps) {
  return (
    <div className="mt-5">
      {checklistNoneList.map((data: string, index: number) => (
        <div key={index} className="flex items-start mb-3">
          <div className="w-1/12">
            <GoDotFill className="text-orange-400" />
          </div>
          <div className="w-9/12">
            <p className="text-sm">{data}</p>
          </div>
          <div className="w-2/12">
            <IoIosCheckmarkCircle className="w-10 h-10 text-slate-300" />
          </div>
        </div>
      ))}
    </div>
  );
}
