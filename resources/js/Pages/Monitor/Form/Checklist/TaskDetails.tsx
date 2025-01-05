import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { TaskDetailsTypes } from '@/types/monitoringForm';
import CustomFrequency from '@/Pages/Monitor/Form/Detailed/CustomFrequency';

interface TaskDetailsProps {
  taskDetails?: { frequency: any; customType: any; assignTask: string[] };
  data: TaskDetailsTypes;
  setData: Dispatch<SetStateAction<TaskDetailsTypes>>;
  assignTaskTo: any;
}

export default function TaskDetails({
  taskDetails,
  assignTaskTo,
  data,
  setData,
}: TaskDetailsProps) {
  return (
    <div className="!shadow-cardShadow bg-white p-5 rounded-lg">
      <h3 className="font-bold text-base">Task details</h3>
      <div className="mt-5">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Frequency
        </label>

        <div className="md:flex items-center gap-3">
          {data.isFrequency && (
            <div className=" w-1/2">
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setData({
                    ...data,
                    frequency: e.target.value,
                  })
                }
                value={data.frequency}
                className="!border-0 !bg-slate-100 !text-black text-sm rounded-lg !ring-0 !ring-offset-0
                            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white"
              >
                <option selected>Choose a frequency</option>
                {Object.entries(taskDetails?.frequency)?.map(
                  ([key, value]: [any, any], index: number) => (
                    <option key={index} value={key}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
          )}

          <div className="w-1/2">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    isFrequency: e.target.checked,
                  })
                }
                className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0 dark:bg-gray-700 dark:border-gray-600"
                checked={data.isFrequency}
              />
              <label
                htmlFor="red-checkbox"
                className="ms-2 text-xs font-medium !text-black dark:text-gray-300"
              >
                Use same frequency for all tasks
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Assign task to
        </label>

        <div className="md:flex md:items-center gap-3">
          {data.isAssignTask && (
            <div className="w-1/2">
              <div className="relative">
                <select
                  value={data.assignTask}
                  className="!border-0 !bg-slate-100 !text-black text-sm rounded-lg !ring-0 !ring-offset-0 	 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setData({
                      ...data,
                      assignTask: e.target.value,
                    })
                  }
                >
                  {assignTaskTo &&
                    assignTaskTo?.map((item: any, index: number) => (
                      <option key={index} value={item?.id}>
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          <div className="w-1/2">
            <div className="flex items-center">
              <input
                type="checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setData({
                    ...data,
                    isAssignTask: e.target.checked,
                  })
                }
                className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0
                            !ring-offset-0 dark:bg-gray-700 dark:border-gray-600"
                checked={data.isAssignTask}
              />
              <label
                htmlFor="red-checkbox"
                className="ms-2 text-xs font-medium !text-black dark:text-gray-300"
              >
                Use same role for all tasks
              </label>
            </div>
          </div>
        </div>
      </div>
      {data.frequency === 'custom' && data.isFrequency && (
        <CustomFrequency
          taskDetails={taskDetails?.customType}
          getData={(value) => setData({ ...data, custom: value })}
        />
      )}
    </div>
  );
}
