import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IoIosInformationCircleOutline, IoMdClose } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import CommonSelectMenu from '@/Components/CommonSelectMenu';
import PrimaryButton from '@/Components/PrimaryButton';
import {
  CartsTitleTypes,
  ComponentType,
  TaskDetailsTypes,
} from '@/types/monitoringForm';
import { useStepThree } from '@/providers/useStepThreeData';
import useUniqueId from '@/_hooks/useUniqueId';
import VerificationCard from '@/Pages/Monitor/Form/VerificationCard';
import useFormValidations from '@/_hooks/useFormValidations';
import CustomFrequency from './Detailed/CustomFrequency';
import CommonToolTip from '@/Components/CommonTooltip';

interface stepThreelayoutProps {
  children?: ReactNode;
  taskDetails?: {
    frequency: any;
    assignTask: string[];
    frequencyVerification: string[];
    customType: any;
  };
  fields: { [key: string]: string };
  UpdateTaskFieldData: any;
  assignTaskTo?: any;
  setData: any;
  getData?: (values: TaskDetailsTypes) => void;
  data: any;
}

const validationSchema = {
  taskDetails: (value: any) => (!value ? 'Please Select A Task Details' : null),
  fieldTitle: (value: any) => (!value ? 'Field title is required' : null),
  ...Object.assign(
    {},
    ...Array(50)
      .fill('')
      .map((_, index: Number) => ({
        [`options${index}`]: (value: any) =>
          !value ? `Field is required` : null,
      }))
  ),
};

export default function StepThreeLayout({
  taskDetails,
  fields,
  children,
  assignTaskTo,
  setData,
  getData,
  data,
}: stepThreelayoutProps) {
  const {
    UpdateTaskFieldData,
    GetFieldValue,
    removeOptions,
    setStepThreeData,
    stepThreeData,
  } = useStepThree();

  const generateUniqueId = useUniqueId();
  const uniqueId = generateUniqueId(10);
  const dispatch = useAppDispatch();
  const { monitoringFromStepThree } = useAppSelector((state) => state.state);
  const { handleBlur, handleInputChange, ShowError } =
    useFormValidations(validationSchema);
  const [taskDetailsData, setTaskDetailsData] = useState<TaskDetailsTypes>({
    assignTask: '',
    frequency: '',
    isAssignTask: false,
    isFrequency: false,
    canSkip: false,
  });

  const handleSelect = (option: ComponentType) => {
    setStepThreeData((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length + 1,
        cartTitle: 'task_Title',
        component: option,
        fieldTitle: '',
        details: null,
      },
    ]);
  };

  function hasIsLimit(details: any): details is { isLimit?: boolean } {
    return (
      typeof details === 'object' && details !== null && 'isLimit' in details
    );
  }

  const numericItemsWithLimit = stepThreeData
    .filter(
      ({ component, details }) =>
        (component === 'numeric' || component === 'temperature') &&
        hasIsLimit(details) &&
        details?.isLimit
    )
    .map(({ details }) => details);

  const creativeComponentDataRender = useCallback(() => {
    const hasCorrectiveAction = stepThreeData.some(
      (item) => item.id === 2000000
    );
    const shouldAddCorrectiveAction = numericItemsWithLimit.length > 0;

    if (shouldAddCorrectiveAction && !hasCorrectiveAction) {
      setStepThreeData((prevFields) => [
        ...prevFields,
        {
          component: 'corrective' as ComponentType,
          id: 2000000,
          details: { options: [{ id: uniqueId, values: '' }] },
          fieldTitle: '',
        },
      ]);
    } else if (!shouldAddCorrectiveAction && hasCorrectiveAction) {
      setStepThreeData((prevFields) =>
        prevFields.filter((item) => item.id !== 2000000)
      );
    }
  }, [numericItemsWithLimit, stepThreeData, uniqueId]);

  useEffect(() => {
    creativeComponentDataRender();
  }, [creativeComponentDataRender]);

  const filterObject = (fields: { [key: string]: string }) => {
    const filterItemSet = new Set(['timer', 'temperature']);
    const selectedOptionsSet = new Set(
      stepThreeData.map((item) => item.component)
    );
    const hasAnyFilterItem = [...filterItemSet].some((item: string) =>
      selectedOptionsSet.has(item as ComponentType)
    );
    if (hasAnyFilterItem) {
      return Object.fromEntries(
        Object.entries(fields).filter(
          ([key]: [string, string]) =>
            !selectedOptionsSet.has(key as ComponentType)
        )
      );
    }
    return fields;
  };

  const updateTaskDetailsDataInMain = useCallback(() => {
    getData && getData(taskDetailsData);
  }, [taskDetailsData]);

  useEffect(() => {
    updateTaskDetailsDataInMain();
  }, [updateTaskDetailsDataInMain]);
  return (
    <>
      <div className="!shadow-cardShadow bg-white p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Task Details</h3>
          <div className="flex items-center me-4">
            <input
              id="red-checkbox"
              type="checkbox"
              checked={taskDetailsData.canSkip}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTaskDetailsData({
                  ...taskDetailsData,
                  canSkip: e.target.checked,
                })
              }
              className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0	  dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="red-checkbox"
              className="ms-2 text-sm font-medium !text-black dark:text-gray-300"
            >
              User can skip the task
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 mt-5 border-b pb-5">
          <div className="w-1/2">
            <div>
              <label
                htmlFor="Frequency"
                className="block mb-2 text-sm font-medium !text-black dark:text-white"
              >
                Frequency
              </label>
              <select
                value={taskDetailsData.frequency}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setTaskDetailsData({
                    ...taskDetailsData,
                    frequency: e.target.value,
                    isFrequency: e.target.value.length > 0,
                  })
                }
                onBlur={(e) => handleBlur('taskDetails', e.target.value)}
                className="bg-gray-100 border !text-black text-base font-medium !border-gray-300  rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
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
          </div>

          <div className="w-1/2">
            <div>
              <label
                htmlFor="assign"
                className="block mb-2 text-sm font-medium !text-black dark:text-white"
              >
                Assign task to
              </label>
              <select
                value={taskDetailsData.assignTask}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setTaskDetailsData({
                    ...taskDetailsData,
                    assignTask: e.target.value,
                    isAssignTask: e.target.value.length > 0,
                  })
                }
                className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
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
        </div>
        {taskDetailsData?.frequency === 'custom' && (
          <CustomFrequency
            taskDetails={taskDetails?.customType}
            getData={(value) =>
              setTaskDetailsData({ ...taskDetailsData, custom: value })
            }
          />
        )}

        <div className="flex items-center gap-1 mb-4 bg-lime-300 p-3 rounded-md">
          <div className="w-10">
            <IoIosInformationCircleOutline className="text-lg w-6 h-6" />
          </div>
          <p>
            When you add task fields to the detailed task, they will appear
            here.
          </p>
        </div>
        {children}
        <div className="border-b pb-5 flex items-center gap-3">
          <CommonSelectMenu
            options={filterObject(fields)}
            onSelect={(key: any) => handleSelect(key)}
          >
            <div className="flex items-center gap-2">
              <PrimaryButton
                type="button"
                className="bg-transparent !border-2 !border-orange-400 active:!bg-orange-100 !text-orange-400  focus:!ring-0 hover:!bg-orange-100"
              >
                Add Fields
              </PrimaryButton>
              <CommonToolTip
                classTooltip="w-5 h-5"
                className="text-orange-400"
                title="The fields for date, time, and who filled the task are done automatically by us"
              />
            </div>
          </CommonSelectMenu>
        </div>
      </div>

      {numericItemsWithLimit.length > 0 && (
        <div className="shadow-xl bg-white p-5 rounded-lg mt-5">
          <div className='class="flex justify-between items-center"'>
            <h3 className="font-bold text-lg mb-4">Corrective actions</h3>
          </div>
          <div className="flex items-center gap-1 mb-4 bg-lime-300 p-3 rounded-md	">
            <div className="w-10">
              <IoIosInformationCircleOutline className="text-lg w-6 h-6" />
            </div>
            <p>
              The following corrective actions will be shown when a
              non-compliant value is logged. Add or edit existing actions.
            </p>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium !text-black dark:!text-black">
              Question
            </label>
            <input
              type="text"
              onBlur={(e) => handleBlur('fieldTitle', e.target.value)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                UpdateTaskFieldData({
                  id: 2000000,
                  field: 'fieldTitle',
                  value: e.target.value,
                });
                handleInputChange('fieldTitle', e.target.value);
              }}
              value={GetFieldValue({
                id: 2000000,
                field: 'fieldTitle',
              })}
              className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
              required
            />
            <ShowError fieldName={'fieldTitle'} />
          </div>

          <div className="gap-2">
            {GetFieldValue({
              id: 2000000,
              field: 'details',
              nestedField: 'options',
            })?.map(
              (
                option: {
                  id: number;
                  value: string;
                },
                index: number
              ) => (
                <>
                  <div className="flex items-center mb-3">
                    <div key={index} className="w-10/12">
                      <label className="block mb-2  text-sm font-medium !text-black dark:text-white">
                        Question {index + 1}
                      </label>
                      <input
                        type="text"
                        value={option.value || ''}
                        onBlur={(e) =>
                          handleBlur(`options${index}`, e.target.value)
                        }
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const updatedOptions = GetFieldValue({
                            id: 2000000,
                            field: 'details',
                            nestedField: 'options',
                          })?.map(
                            (
                              opt: {
                                id: number;
                                value: string;
                              },
                              optIndex: number
                            ) =>
                              optIndex === index
                                ? {
                                    id: index,
                                    value: event.target.value,
                                  }
                                : opt
                          );

                          UpdateTaskFieldData({
                            id: 2000000,
                            field: 'details',
                            value: updatedOptions,
                            nestedData: 'options',
                          });
                          handleInputChange(
                            `options${index}`,
                            event.target.value
                          );
                        }}
                        className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg block w-full p-2.5 !ring-0 !ring-offset-0"
                        required
                      />
                      <ShowError fieldName={`options${index}`} />
                    </div>
                    <div className="w-2/12">
                      <button
                        type="button"
                        onClick={() =>
                          removeOptions({
                            optionId: option.id,
                            componentId: 2000000,
                            nestedField: 'options',
                          })
                        }
                        className="text-black flex cursor-pointer justify-center items-center focus:ring-0 font-medium rounded-md text-sm p-3 w-14 mt-7"
                      >
                        <IoMdClose className="text-lg w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              )
            )}
          </div>

          <button
            onClick={() => {
              const currentOptions =
                GetFieldValue({
                  id: 2000000,
                  field: 'details',
                  nestedField: 'options',
                }) || [];

              UpdateTaskFieldData({
                id: 2000000,
                field: 'details',
                value: [
                  ...currentOptions,
                  {
                    id: uniqueId,
                    values: '',
                  },
                ],
                nestedData: 'options',
              });
            }}
            type="button"
            className="w-28 mt-5 focus:ring-0 font-bold text-orange-400 underline hover:no-underline hover:bg-gray-200 hover:rounded-full rounded-md text-sm p-2 uppercase"
          >
            Add option
          </button>

          <div className="flex items-center mt-5">
            <input
              id="red-checkbox"
              type="checkbox"
              className="w-5 h-5 text-orange-400 bg-gray-100 border-gray-300 rounded-md !ring-0 !ring-offset-0	  dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="red-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Use "Add other" option (user will be able to type in custom
              answer)
            </label>
          </div>
        </div>
      )}

      <VerificationCard
        setData={setData}
        data={data}
        assignTaskTo={assignTaskTo as string[]}
        frequencyVerification={taskDetails?.frequencyVerification as {}}
      />
    </>
  );
}
