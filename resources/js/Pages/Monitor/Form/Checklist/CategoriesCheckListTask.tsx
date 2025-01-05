import ToggleButton from '@/Components/CommonToggleButton';
import { Dispatch, SetStateAction, useState } from 'react';
import CheckListTask from './CheckListTask';
import { ChecklistDataTypes } from '@/types/monitoringForm';

interface CheckListTaskProps {
  toggleLabel?: string;
  id?: number;
  frequencyForAll: boolean;
  taskDetails: { frequency: any; customType: any };
  roleForAll: boolean;
  data: ChecklistDataTypes;
  setData: Dispatch<SetStateAction<ChecklistDataTypes>>;
  assignTaskTo: any;
}

export default function CategoriesCheckListTask({
  data,
  frequencyForAll,
  roleForAll,
  setData,
  taskDetails,
  id,
  toggleLabel,
  assignTaskTo,
}: CheckListTaskProps) {
  const [toggle, setToggle] = useState<boolean>(false);

  const taskDetailsData = {
    frequency: taskDetails?.frequency,
    customType: taskDetails?.customType,
  };

  return (
    <div className="rounded-xl border-0 mt-3 bg-white shadow-cardShadow">
      <div className="p-4 space-y-4">
        <div className="flex items-top justify-between">
          <h3 className="font-bold text-base">{toggleLabel}</h3>
          <ToggleButton checked={toggle} onChange={() => setToggle(!toggle)} />
        </div>
      </div>
      {toggle && (
        <CheckListTask
          id={id as number}
          taskDetails={taskDetailsData}
          assignTaskTo={assignTaskTo}
          title={toggleLabel}
          showTitle={false}
          frequencyForAll={frequencyForAll}
          className="shadow-none !mt-1"
          roleForAll={roleForAll}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
}
