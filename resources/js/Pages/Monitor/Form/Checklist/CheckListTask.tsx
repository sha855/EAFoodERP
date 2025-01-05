import TextInput from '@/Components/TextInput';
import { MdDeleteOutline } from 'react-icons/md';
import CommonButton from '@/Components/CommonButton';
import { RiInformationLine } from 'react-icons/ri';
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { CheckListDataTypes, ChecklistDataTypes } from '@/types/monitoringForm';
import clsx from 'clsx';
import { useAppDispatch } from '@/_hooks/useStore';
import { activeCheckList } from '@/store/slice/stateSlice';
import useFormValidations from '@/_hooks/useFormValidations';
import CustomFrequency from '@/Pages/Monitor/Form/Detailed/CustomFrequency';
import CommonToolTip from '@/Components/CommonTooltip';

interface CheckListTaskProps {
  title?: string;
  frequencyForAll: boolean;
  taskDetails: { frequency: any; customType: any };
  roleForAll: boolean;
  data: ChecklistDataTypes;
  className?: string;
  setData: Dispatch<SetStateAction<ChecklistDataTypes>>;
  showTitle?: boolean;
  assignTaskTo: any;
  id?: number;
}

export default function CheckListTask({
  title = 'Checklist Task',
  taskDetails,
  roleForAll,
  id,
  frequencyForAll,
  className = '!shadow-cardShadow',
  setData,
  showTitle = true,
  data,
  assignTaskTo,
}: CheckListTaskProps) {
  const validationSchema = data[title]?.reduce(
    (acc: any, item: any, index: number) => {
      return {
        ...acc,
        [`fieldTitle${index}`]: (value: any) =>
          !value ? 'Field title is required' : null,
        [`frequency${index}`]: (value: any) =>
          !value ? 'Please select frequency' : null,
        [`taskDetails${index}`]: (value: any) =>
          !value ? 'Please select Task' : null,
      };
    },
    {}
  );

  const dispatch = useAppDispatch();

  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);

  const handleAddField = () => {
    setData({
      ...data,
      [title]: [
        ...(data[title] || []),
        {
          id: data[title] ? data[title].length + 1 : 1,
          assignTask: '',
          allowNotDone: false,
          frequency: '',
          title: title,
          data_id: id,
          name: '',
        },
      ],
    });
  };
  const handleRemoveField = (id: number) => {
    setData((prevData) => {
      const updatedFields = (prevData[title] || []).filter(
        (field: any) => field.id !== id
      );

      return {
        ...prevData,
        [title]: updatedFields,
      };
    });
  };

  const handleUpdateField = (newData: CheckListDataTypes): void => {
    const existingData = Array.isArray(data[title]) ? data[title] : [];

    const updatedData = existingData.map((subData: CheckListDataTypes) =>
      subData.id === newData.id ? newData : subData
    );
    setData({ ...data, [title]: updatedData });
  };

  useEffect(() => {
    if (!data[title] || data[title].length === 0) {
      handleAddField();
    }
    dispatch(activeCheckList(title));
  }, [data, title, dispatch]);

  return (
    <div className={clsx(' bg-white p-5 rounded-lg mt-5', className)}>
      {showTitle && <h3 className="font-bold text-base">{title}</h3>}

      <div className="divide-y divide-slate-200 ">
        {data[title]?.map((item, index: number) => (
          <div key={index} className="grid grid-cols-1 gap-3 py-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Checklist task title
              </label>

              <div className="md:flex items-center gap-3">
                <div className="w-11/12">
                  <TextInput
                    type="text"
                    className=" !p-2 border-0 !text-sm border-gray-300 rounded w-full"
                    required
                    onBlur={(e) =>
                      handleBlur(`fieldTitle${index}`, e.target.value)
                    }
                    value={item.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleUpdateField({
                        ...item,
                        id: item.id,
                        name: e.target.value,
                      });
                      handleInputChange(`fieldTitle${index}`, e.target.value);
                    }}
                    placeholder="Your product"
                  />
                  <ShowError fieldName={`fieldTitle${index}`} />
                </div>
                <div className="w-1/12">
                  {data[title].length > 1 && (
                    <MdDeleteOutline
                      onClick={() => handleRemoveField(item.id)}
                      className="w-5 h-5 text-lg text-red-500 cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="md:flex gap-3 mt-2">
              <div className="w-full">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.allowNotDone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleUpdateField({
                        ...item,
                        id: item.id,
                        allowNotDone: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0	  dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="red-checkbox"
                    className="ms-2 text-gray-700 text-sm font-medium"
                  >
                    Allow to mark “not done”
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-5">
              {!frequencyForAll && (
                <div className="w-1/2">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Frequency
                    </label>
                    <select
                      onBlur={(e) =>
                        handleBlur(`frequency${index}`, e.target.value)
                      }
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        handleUpdateField({
                          ...item,
                          id: item.id,
                          frequency: e.target.value,
                        });
                        handleInputChange(`frequency${index}`, e.target.value);
                      }}
                      value={item.frequency}
                      className="!border-0 !bg-slate-100 !text-black text-sm rounded-lg !ring-0 !ring-offset-0 	 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
                    <ShowError fieldName={`frequency${index}`} />
                  </div>
                </div>
              )}

              {!roleForAll && (
                <div className="w-1/2">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Assign task to
                    </label>
                    <div className="relative">
                      <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                          handleUpdateField({
                            ...item,
                            id: item.id,
                            assignTask: e.target.value,
                          });
                          handleInputChange(
                            `taskDetails${index}`,
                            e.target.value
                          );
                        }}
                        onBlur={(e) =>
                          handleBlur(`taskDetails${index}`, e.target.value)
                        }
                        value={item.assignTask}
                        className="!border-0 !bg-slate-100 !text-black text-sm rounded-lg !ring-0 !ring-offset-0 	 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      >
                        {assignTaskTo &&
                          assignTaskTo?.map((item: any, index: number) => (
                            <option key={index} value={item.id}>
                              {item?.name}
                            </option>
                          ))}
                      </select>

                      <ShowError fieldName={`taskDetails${index}`} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {item.frequency === 'custom' && !frequencyForAll && !roleForAll && (
              <CustomFrequency
                taskDetails={taskDetails.customType}
                getData={(value) =>
                  handleUpdateField({
                    ...item,
                    id: item.id,
                    custom: value,
                  })
                }
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-2 py-6">
          <CommonButton
            onClick={handleAddField}
            className=" focus:ring-0 font-bold bg-transparent !text-orange-400  hover:no-underline border-2 border-orange-400 hover:bg-white rounded-md text-sm p-2 uppercase"
          >
            Add task to checklist
          </CommonButton>
          <CommonToolTip
            classTooltip="h-5 w-5"
            className="text-orange-400"
            title="The fields for date, time, and who filled the task are done automatically by us"
          />
        </div>
      </div>
    </div>
  );
}
