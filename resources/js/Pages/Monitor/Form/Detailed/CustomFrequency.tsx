import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  CheckListDataTypes,
  CustomFrequencyTypes,
} from '@/types/monitoringForm';
import clsx from 'clsx';

interface CustomFrequencyProps {
  taskDetails: any;
  getData: (data: CustomFrequencyTypes) => void;
}

export default function CustomFrequency({
  taskDetails,
  getData,
}: CustomFrequencyProps) {
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const [customData, setCustomData] = useState<CustomFrequencyTypes>({
    date: '',
    on: '',
    repeat: 0,
    types: 'times_a_day',
    repeatOn: [],
  });

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour <= 23; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      times.push(time);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleSelectRepeatOn = (day: string) => {
    if (!customData.repeatOn?.includes(day)) {
      setCustomData({
        ...customData,
        repeatOn: [...(customData?.repeatOn as string[]), day],
      });
    } else {
      setCustomData({
        ...customData,
        repeatOn: [...customData.repeatOn?.filter((item) => item !== day)],
      });
    }
  };

  const sendData = useCallback(() => {
    getData(customData);
  }, [customData]);

  useEffect(() => {
    sendData();
  }, [sendData]);

  return (
    <div>
      <div className="flex justify-between items-center gap-5 mt-5 border-b pb-5">
        <div className="w-5/12">
          <label
            htmlFor="assign"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Set first date
          </label>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              type="date"
              value={customData.date}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setCustomData({ ...customData, date: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base font-medium rounded-lg  block w-full ps-10 p-2.5 dark:placeholder-gray-400  "
              placeholder="Select date"
            />
          </div>
        </div>
        <div className="w-3/12">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Repeat every
          </label>
          <input
            type="number"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCustomData({ ...customData, repeat: +e.target.value });
            }}
            className="bg-gray-50 border !border-gray-300 text-gray-900 text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
            required
          />
        </div>
        <div className="w-4/12">
          <div>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCustomData({
                  ...customData,
                  types: e.target.value as string,
                });
              }}
              value={customData.types}
              className="bg-gray-50 border !border-gray-300 text-gray-900 text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0 mt-7"
            >
              {Object.entries(taskDetails)?.map(
                ([key, value]: [string, any], index: number) => (
                  <option
                    selected={customData.types === 'times_a_day'}
                    key={index}
                    value={key}
                  >
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>
      {customData.types === 'times_a_day' && (
        <>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Repeat on
            </label>

            <div className="flex space-x-2">
              {weekdays.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectRepeatOn(day)}
                  className={clsx(
                    'text-white focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 w-14',
                    customData.repeatOn?.includes(day)
                      ? 'bg-gradient-org-red '
                      : 'bg-gray-200'
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 border-b pb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              On
            </label>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setCustomData({ ...customData, on: e.target.value });
              }}
              value={customData.on}
              className="w-32	 bg-orange-100 border !border-orange-300 text-gray-900 text-base font-medium rounded-lg  block p-2.5 !ring-0 !ring-offset-0"
            >
              {timeOptions.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
