import React, { ChangeEvent, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { selectedFieldData } from '@/types/monitoringForm';
import { useStepThree } from '@/providers/useStepThreeData';
import { X } from 'lucide-react';
import CommonToolTip from '@/Components/CommonTooltip';

interface TimerCardProps {
  index: number;
  item: selectedFieldData;
}

const TimerCard: React.FC<TimerCardProps> = ({ index, item }) => {
  const [timer, setTimer] = useState<number | null>();
  const [timesArray, setTimesArray] = useState<{ id: number; value: number }[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [notifyBefore, setNotifyBefore] = useState<string | null>(null);

  const handleAddTime = async () => {
    if (!timer) {
      return setError('Please enter the time');
    }
    if (timesArray.find((timesdata) => timesdata.value === timer)) {
      return setError('The time is already entered');
    }
    if (timesArray.find((timesdata) => timesdata.value > 1000)) {
      return setError('The time is Less then 1000');
    }
    const newTimesArray = [
      ...timesArray,
      { id: timesArray.length, value: timer },
    ];
    setTimesArray(newTimesArray);
    UpdateTaskFieldData({
      id: item.id,
      field: 'details',
      value: newTimesArray,
      nestedData: 'times',
    });
    setTimer(null);
    setError(null);
  };

  const handleRemoveTime = async (times: { id: number; value: number }) => {
    const newTimesArray = [
      ...timesArray.filter((item) => item.id !== times.id),
    ];
    setTimesArray(newTimesArray);
    UpdateTaskFieldData({
      id: item.id,
      field: 'details',
      value: newTimesArray,
      nestedData: 'times',
    });
  };
  const handleNotifyBefore = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    UpdateTaskFieldData({
      id: item.id,
      field: 'details',
      value: value,
      nestedData: 'notifyBefore',
    });
    setNotifyBefore(value);
  };

  const { removeTaskFields, UpdateTaskFieldData } = useStepThree();

  return (
    <div key={index}>
      <div className="mt-4 grid grid-cols-1 gap-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Field: Timer</h3>
          <MdDeleteOutline
            onClick={() => removeTaskFields(item.id)}
            className="w-6 h-6 text-lg cursor-pointer text-red-400"
          />
        </div>

        <div className="w-full">
          <label className="flex gap-2 items-center mb-2 text-sm font-medium !text-black dark:text-white">
            Set timer options in hours
            <CommonToolTip
              classTooltip="w-5 h-5"
              title="You will choose between these options when setting a new timer in the app"
            />
          </label>
          <div className="flex items-center gap-4">
            <input
              type="number"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTimer(parseFloat(e.target.value))
              }
              value={timer || ''}
              className="bg-gray-50 w-1/4 border !border-gray-300 !text-black text-base font-medium rounded-lg  block  p-2.5 !ring-0 !ring-offset-0"
              required
            />

            <button
              type="button"
              onClick={handleAddTime}
              className="text-white bg-gradient-org-red  focus:ring-0 font-medium rounded-md text-sm p-3 w-14"
            >
              Add
            </button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex items-center flex-wrap gap-3">
          {timesArray.map((times) => (
            <span
              key={times.id}
              className="p-1.5 px-3 text-sm bg-gray-100 border border-gray-200 rounded-full flex items-center gap-3"
            >
              {times?.value}
              <X size={16} onClick={() => handleRemoveTime(times)} />
            </span>
          ))}
        </div>

        <div className="w-3/12">
          <div>
            <label className="flex gap-2 items-center mb-2 text-sm font-medium !text-black dark:text-white">
              Notify before end
            </label>
            <select
              onChange={handleNotifyBefore}
              value={notifyBefore || ''}
              className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
            >
              <option selected>30 minutes</option>
              <option value="US">40 minutes</option>
              <option value="CA">50 minutes</option>
              <option value="FR">60 minutes</option>
              <option value="DE">10 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
