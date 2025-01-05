import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import React from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoIosCheckmarkCircle } from 'react-icons/io';

export default function ChecklistEquipment() {
  return (
    <>
      <div className="flex justify-between py-4">
        <div>Used for: Fridge</div>
        <div>
          <FaChevronUp />
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-start mb-3">
          <div className="w-1/12">
            <GoDotFill className="text-orange-400" />
          </div>
          <div className="w-9/12">
            <p className="text-sm">What needs to be done?</p>
          </div>
          <div className="w-2/12">
            <IoIosCheckmarkCircle className="w-10 h-10 text-slate-300" />
          </div>
        </div>
      </div>

      <div className="flex justify-between py-4">
        <div>Used for: Kitchen</div>
        <div>
          <FaChevronDown />
        </div>
      </div>
    </>
  );
}
