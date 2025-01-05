import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CommonButton from '@/Components/CommonButton';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, renderForm } from '@/store/slice/stateSlice';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useForm } from '@inertiajs/react';
import { useStepper } from '@/_hooks/useStepper';
import Alert from '@mui/material/Alert';
import CommonMobileCard from '@/Pages/Monitor/Partials/CommonMobileCard';
import DetailedEquipment from '@/Pages/Monitor/Form/Detailed/Equipment';
import DetailedNone from '@/Pages/Monitor/Form/Detailed/None';
import DetailedRoom from '@/Pages/Monitor/Form/Detailed/Room';
import ChecklistEquipment from '@/Pages/Monitor/Form/Checklist/Equipment';
import ChecklistRoom from '@/Pages/Monitor/Form/Checklist/Room';
import ChecklistNone from '@/Pages/Monitor/Form/Checklist/None';
import Step1 from '@/Pages/Monitor/Steps/Step1';
import CommonModal from '@/Components/CommonModal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Step2 from '@/Pages/Monitor/Steps/Step2';
import StepThreeLayout from '@/Pages/Monitor/Form/StepThreeLayout';
import useUniqueId from '@/_hooks/useUniqueId';
import { MONITORING_TASK_SETUP_ENUM } from '@/types/enum';
import { useStepThree } from '@/providers/useStepThreeData';
import StepThreeLayoutMobile from '@/Pages/Monitor/Form/StepThreeLayoutMobile';
import StepThreeLayoutChecklist from '@/Pages/Monitor/Form/StepThreeLayoutChecklist';
import CheckListTask from '@/Pages/Monitor/Form/Checklist/CheckListTask';
import {
  ChecklistDataTypes,
  selectedFieldData,
  TaskDetailsTypes,
} from '@/types/monitoringForm';
import TaskDetails from '@/Pages/Monitor/Form/Checklist/TaskDetails';
import ExpandableDetailsCard from '@/Pages/Monitor/Form/ExpandableDetailsCard';
import Step3 from '@/Pages/Monitor/Steps/Step3';
import ComponentsRenderer from '@/Pages/Monitor/Form/ComponentsRenderer';
import CheckListTaskCard from '@/Pages/Monitor/Form/Mobile/Checklist/CheckListTaskCard';
import ComponentsMobileRenderer from '@/Pages/Monitor/Form/ComponentsMobileRenderer';
import CategoriesCheckListTask from '../Form/Checklist/CategoriesCheckListTask';
import SameForAllCheckbox from '@/Pages/Monitor/Form/SameForAllCheckbox';
import clsx from 'clsx';

interface PageProps {
  taskCreateData: {
    taskRelatedOptions: any;
    type: any;
    checklistNoneList: any;
    taskDetails: any;
    fields: any;
    usedFor: any;
    rooms: any;
    equipments: any;
    assignTaskTo: any;
  };
  editData?: any;
  routePrefix?: string;
}

const MonitoringTaskSetupCreate = ({
  taskCreateData,
  editData,
  routePrefix,
}: PageProps) => {
  const generateUniqueId = useUniqueId();
  const uniqueId = generateUniqueId(10);
  const steps: number = editData ? 3 : 1;
  const { nextStep, currentStep } = useStepper({
    steps: 4,
    initialStep: steps,
  });
  const dispatch = useAppDispatch();
  const { monitoringActiveFrom } = useAppSelector((state) => state.state);
  const {
    taskRelatedOptions,
    checklistNoneList,
    type,
    taskDetails,
    fields,
    rooms,
    equipments,
    assignTaskTo,
  } = taskCreateData;
  const [instructionModal, setInstructionModal] = useState<boolean>(false);
  const {
    setStepThreeData,
    stepThreeData,
    removeTaskFields,
    UpdateTaskFieldData,
    GetFieldValue,
    removeOptions,
  } = useStepThree();

  const handleModal = () => setInstructionModal(!instructionModal);
  const [selectedType, setSelectedType] = React.useState(editData?.type || '');
  const [selectedTaskRelated, setSelectedTaskRelated] = React.useState(
    editData?.task_related || ''
  );
  const [openAlert, setAlertOpen] = React.useState(true);
  const [expand, setExpand] = useState(true);
  const [sameForAllCheckList, setSameForAllCheckList] = useState<boolean>(true);
  const [checkListTaskData, setCheckListTaskData] =
    useState<ChecklistDataTypes>({});
  const [usedForData, setUsedForData] =
    useState<{ [key: string]: boolean }[]>();
  const [taskDetailsData, setTaskDetailsData] = useState<TaskDetailsTypes>({
    isAssignTask: true,
    assignTask: '',
    frequency: '',
    isFrequency: true,
  });

  const routeParams = route().routeParams;
  const companyId = routeParams?.company;

  const adminRouteParams = {
    monitoring: editData?.id,
    ...(companyId ? { company: companyId } : {}),
  };

  const { data, setData, transform, post, processing, errors } = useForm({
    task_name: editData?.name || '',
    type: editData?.type || '',
    task_related: editData?.task_related || '',
    summary: editData?.summary || '',
    instructions_editor: editData?.instructions_editor || '',
    is_verification: editData?.is_verification || false,
    frequency: editData?.frequency || 'month',
    verifier: editData?.verifier || '',
    data: null,
  });

  // const updateEditData = useCallback(() => {
  //   if (editData) {
  //     const checklistData = editData.responsible_roles?.map((item: any) => ({
  //       [item?.type?.name]: editData.responsible_roles?.map((values: any) => ({
  //         id: values.id,
  //         name: values?.name,
  //         allowNotDone: values?.allow_not_done === 1 ? true : false,
  //         frequency: values.frequency,
  //         assignTask: values?.assign_task_to,
  //         title: values?.type?.name,
  //         data_id: values?.id,
  //         custom: values?.custom,
  //       })),
  //     }));

  //     console.log(checklistData)
  //     setCheckListTaskData(checklistData);
  //     // console.log(editData?.responsible_roles?.map((item: any) => ({[item.type.name]:})))
  //   }
  // }, [editData]);
  // useEffect(() => {
  //   updateEditData();
  // }, [updateEditData]);

  const modifyData = useCallback(() => {
    const checkLists = Object.entries(checkListTaskData).map(
      ([key, value]: [string, any], index: number) => ({
        ...value,
      })
    );
    setData('data', {
      'check-list': checkLists,
      'task-details-single': taskDetailsData,
      'task-details-multiple-fields': stepThreeData,
    } as any);
  }, [checkListTaskData, taskDetailsData, stepThreeData]);

  useEffect(() => {
    modifyData();
  }, [modifyData]);

  const usedFor =
    data.task_related === MONITORING_TASK_SETUP_ENUM.EQUIPMENT
      ? equipments
      : rooms;

  const handleNextButton = useCallback(
    (currentStep: number) => {
      if (currentStep === 1) {
        return data.type && true;
      }
      if (currentStep === 2) {
        return data.type && data.task_related && true;
      }
    },
    [data]
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSelectedType(event.target.value);
    setData('type', event.target.value);
  };

  const handleChangeEntity = (
    event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();
    setSelectedTaskRelated(event.target.value);
    setData('task_related', event.target.value);
  };

  const cancelDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleStepThreeComponent = useCallback(() => {
    dispatch(renderForm({ type: data.type, task: data.task_related }));
  }, [data, dispatch]);

  useEffect(() => {
    handleStepThreeComponent();
  }, [handleStepThreeComponent]);

  const submitFormHandler = (e: any) => {
    e.preventDefault();

    transform((data: any) => ({
      ...data,
      id: editData?.id,
    }));

    post(route(routePrefix + 'monitor.task.store', adminRouteParams), {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
    });
  };

  const handleButtonDisable = useMemo(() => {
    // Object.values(checkListTaskData)?.some((group) =>
    //     group.some((item) => item.name === '')
    // );
    return false;
  }, [checkListTaskData]);

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="col-span-1 mx-4 bg-blue-400 bg-gradient-org-red p-8">
          <div className="rounded-md">
            <div className="h-full w-3/4">
              <div className="right-0 mt-4 flex h-[700px] max-h-[75vh] max-w-[370px] items-start justify-center overflow-y-hidden rounded-2xl bg-[url(https://app.fooddocs.com/img/Apple%20iPhone%2011%20Green.d149cb64.png)] bg-contain bg-center bg-no-repeat pb-8 pt-16">
                <div>
                  {data.type !== MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                  data.type !== MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                  stepThreeData.length === 0 ? (
                    <ScrenAlert />
                  ) : null}
                  {data.type !== MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                  (data.task_related === MONITORING_TASK_SETUP_ENUM.NONE ||
                    data.task_related ===
                      MONITORING_TASK_SETUP_ENUM.EQUIPMENT ||
                    data.task_related === MONITORING_TASK_SETUP_ENUM.ROOMS) &&
                  currentStep === 3 &&
                  stepThreeData.length === 0 ? (
                    <ScrenAlert />
                  ) : null}

                  {/*TYPE 1*/}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related === '' &&
                    (currentStep === 1 || currentStep === 2) && (
                      <>
                        <CommonMobileCard
                          data={data}
                          sampleAlert={true}
                          saveButton={true}
                        >
                          <DetailedNone />
                        </CommonMobileCard>
                      </>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related ===
                      MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={true}
                      >
                        <DetailedEquipment />
                      </CommonMobileCard>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.ROOMS &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={true}
                      >
                        <DetailedRoom />
                      </CommonMobileCard>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.NONE &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={true}
                      >
                        <DetailedNone />
                      </CommonMobileCard>
                    )}

                  {/*TYPE 2*/}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related === '' &&
                    (currentStep === 1 || currentStep === 2) && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={false}
                      >
                        <ChecklistNone checklistNoneList={checklistNoneList} />
                      </CommonMobileCard>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related ===
                      MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={false}
                      >
                        <ChecklistEquipment />
                      </CommonMobileCard>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.ROOMS &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={false}
                      >
                        <ChecklistRoom />
                      </CommonMobileCard>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.NONE &&
                    currentStep === 2 && (
                      <CommonMobileCard
                        data={data}
                        sampleAlert={true}
                        saveButton={false}
                      >
                        <ChecklistNone checklistNoneList={checklistNoneList} />
                      </CommonMobileCard>
                    )}

                  {/*Type 1*/}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.NONE &&
                    currentStep === 3 &&
                    stepThreeData.length > 0 && (
                      <StepThreeLayoutMobile data={data}>
                        {stepThreeData?.map((item: any, index: number) => (
                          <ComponentsMobileRenderer item={item} index={index} />
                        ))}
                      </StepThreeLayoutMobile>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.ROOMS &&
                    currentStep === 3 &&
                    stepThreeData.length > 0 && (
                      <StepThreeLayoutMobile data={data}>
                        {stepThreeData?.map((item: any, index: number) => (
                          <ComponentsMobileRenderer item={item} index={index} />
                        ))}
                      </StepThreeLayoutMobile>
                    )}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                    data.task_related ===
                      MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                    currentStep === 3 &&
                    stepThreeData.length > 0 && (
                      <StepThreeLayoutMobile data={data}>
                        {stepThreeData?.map((item: any, index: number) => (
                          <ComponentsMobileRenderer item={item} index={index} />
                        ))}
                      </StepThreeLayoutMobile>
                    )}

                  {/*Type 2*/}

                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.NONE &&
                    currentStep === 3 && (
                      <StepThreeLayoutMobile data={data} isButton={false}>
                        <CheckListTaskCard
                          checkListTaskData={checkListTaskData}
                        />
                      </StepThreeLayoutMobile>
                    )}
                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related === MONITORING_TASK_SETUP_ENUM.ROOMS &&
                    currentStep === 3 && (
                      <StepThreeLayoutMobile data={data} isButton={false}>
                        <CheckListTaskCard
                          checkListTaskData={checkListTaskData}
                        />
                      </StepThreeLayoutMobile>
                    )}
                  {data.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                    data.task_related ===
                      MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                    currentStep === 3 && (
                      <StepThreeLayoutMobile data={data} isButton={false}>
                        <CheckListTaskCard
                          checkListTaskData={checkListTaskData}
                        />
                      </StepThreeLayoutMobile>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <form className="h-[85vh] overflow-auto">
            <div className="mx-4 py-5">
              {openAlert && (
                <Alert
                  className="flex items-center justify-center"
                  icon={<IoIosInformationCircleOutline />}
                  onClose={() => setAlertOpen(false)}
                  severity="info"
                >
                  Create your own detailed task or checklist. Detailed tasks are
                  for monitoring that requires specific parameters (e.g.,
                  temperature). Use checklists for tasks that only require a
                  "done/not done" answer. Need help? Read how to create detailed
                  task or checklist.
                </Alert>
              )}
            </div>

            <div className="mx-4">
              <InputLabel
                htmlFor="task_name"
                value="Task name"
                className="mb-2 text-base"
              />
              <TextInput
                type="text"
                name="task_name"
                placeholder="Task name"
                className="mb-3 w-full rounded border px-4 py-2"
                value={data.task_name}
                onChange={(e) => setData('task_name', e.target.value)}
              />
              {errors.task_name && (
                <p className="text-sm text-red-500">{errors.task_name}</p>
              )}
            </div>

            {/*stepper form */}
            {(() => {
              switch (currentStep) {
                case 1:
                  return (
                    <Step1
                      type={type}
                      selectedType={selectedType}
                      handleChange={handleChange}
                    />
                  );
                case 2:
                  return (
                    <Step2
                      type={type}
                      TaskRelatedOptions={taskRelatedOptions}
                      selectedType={selectedType}
                      handleChange={handleChange}
                      selectedTaskRelated={selectedTaskRelated}
                      handleChangeEntity={handleChangeEntity}
                    />
                  );
                case 3:
                  return (
                    <>
                      <Step3
                        selectedTaskRelated={selectedTaskRelated}
                        taskRelatedOptions={taskRelatedOptions}
                        handleModal={handleModal}
                        handleChangeEntity={handleChangeEntity}
                        handleChange={handleChange}
                        selectedType={selectedType}
                        type={type}
                        editData={editData}
                      />

                      {/* custom form */}
                      <div className="m-4">
                        {/*Type 1*/}
                        {monitoringActiveFrom.currentType ===
                          MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.NONE &&
                          currentStep === 3 && (
                            <StepThreeLayout
                              getData={(values) => setTaskDetailsData(values)}
                              setData={setData}
                              data={data}
                              assignTaskTo={assignTaskTo}
                              taskDetails={taskDetails}
                              fields={fields}
                              UpdateTaskFieldData={UpdateTaskFieldData}
                            >
                              {stepThreeData?.map(
                                (item: selectedFieldData, index: number) => (
                                  <ComponentsRenderer
                                    item={item}
                                    index={index}
                                    uniqueId={uniqueId}
                                    removeTaskFields={removeTaskFields}
                                    UpdateTaskFieldData={UpdateTaskFieldData}
                                    GetFieldValue={GetFieldValue}
                                    removeOptions={removeOptions}
                                  />
                                )
                              )}
                            </StepThreeLayout>
                          )}

                        {monitoringActiveFrom.usedFor &&
                          monitoringActiveFrom.currentType ===
                            MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.ROOMS &&
                          currentStep === 3 && (
                            <>
                              <ExpandableDetailsCard
                                title="Used for"
                                getData={(value) =>
                                  setData('data', {
                                    ...(data.data as any),
                                    'used-for': value,
                                  })
                                }
                                items={usedFor}
                                expand={expand}
                                setExpand={setExpand}
                              />
                              <StepThreeLayout
                                getData={(values) => setTaskDetailsData(values)}
                                setData={setData}
                                data={data}
                                assignTaskTo={assignTaskTo}
                                taskDetails={taskDetails}
                                fields={fields}
                                UpdateTaskFieldData={UpdateTaskFieldData}
                              >
                                {stepThreeData?.map((item, index: number) => (
                                  <ComponentsRenderer
                                    item={item}
                                    index={index}
                                    uniqueId={uniqueId}
                                    removeTaskFields={removeTaskFields}
                                    UpdateTaskFieldData={UpdateTaskFieldData}
                                    GetFieldValue={GetFieldValue}
                                    removeOptions={removeOptions}
                                  />
                                ))}
                              </StepThreeLayout>
                            </>
                          )}

                        {monitoringActiveFrom.usedFor &&
                          monitoringActiveFrom.currentType ===
                            MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                          currentStep === 3 && (
                            <>
                              <ExpandableDetailsCard
                                title="Used for"
                                items={usedFor}
                                getData={(value) =>
                                  setData('data', {
                                    ...(data.data as any),
                                    'used-for': value,
                                  })
                                }
                                expand={expand}
                                setExpand={setExpand}
                              />
                              <StepThreeLayout
                                getData={(values) => setTaskDetailsData(values)}
                                setData={setData}
                                data={data}
                                assignTaskTo={assignTaskTo}
                                taskDetails={taskDetails}
                                fields={fields}
                                UpdateTaskFieldData={UpdateTaskFieldData}
                              >
                                {stepThreeData?.map((item, index: number) => (
                                  <ComponentsRenderer
                                    item={item}
                                    index={index}
                                    uniqueId={uniqueId}
                                    removeTaskFields={removeTaskFields}
                                    UpdateTaskFieldData={UpdateTaskFieldData}
                                    GetFieldValue={GetFieldValue}
                                    removeOptions={removeOptions}
                                  />
                                ))}
                              </StepThreeLayout>
                            </>
                          )}

                        {/*Type 2*/}
                        {monitoringActiveFrom.currentType ===
                          MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.NONE &&
                          currentStep === 3 && (
                            <StepThreeLayoutChecklist
                              setData={setData}
                              data={data}
                              assignTaskTo={assignTaskTo}
                              taskDetails={taskDetails}
                            >
                              <TaskDetails
                                assignTaskTo={assignTaskTo}
                                taskDetails={taskDetails}
                                data={taskDetailsData}
                                setData={setTaskDetailsData}
                              />

                              <CheckListTask
                                assignTaskTo={assignTaskTo}
                                frequencyForAll={taskDetailsData.isFrequency}
                                taskDetails={taskDetails}
                                title="Check list"
                                roleForAll={taskDetailsData.isAssignTask}
                                data={checkListTaskData}
                                setData={setCheckListTaskData}
                              />
                            </StepThreeLayoutChecklist>
                          )}

                        {monitoringActiveFrom.usedFor &&
                          monitoringActiveFrom.currentType ===
                            MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.ROOMS &&
                          currentStep === 3 && (
                            <StepThreeLayoutChecklist
                              setData={setData}
                              data={data}
                              assignTaskTo={assignTaskTo}
                              taskDetails={taskDetails}
                            >
                              {sameForAllCheckList && (
                                <ExpandableDetailsCard
                                  title="Used for"
                                  items={usedFor}
                                  expand={expand}
                                  getData={(value) =>
                                    setData('data', {
                                      ...(data.data as any),
                                      'used-for': value,
                                    })
                                  }
                                  renderCheckBox={
                                    <SameForAllCheckbox
                                      setSameForAllCheckList={
                                        setSameForAllCheckList
                                      }
                                      sameForAllCheckList={sameForAllCheckList}
                                    />
                                  }
                                  setExpand={setExpand}
                                />
                              )}

                              <TaskDetails
                                assignTaskTo={assignTaskTo}
                                taskDetails={taskDetails}
                                data={taskDetailsData}
                                setData={setTaskDetailsData}
                              />

                              {sameForAllCheckList ? (
                                <CheckListTask
                                  assignTaskTo={assignTaskTo}
                                  frequencyForAll={taskDetailsData.isFrequency}
                                  taskDetails={taskDetails}
                                  roleForAll={taskDetailsData.isAssignTask}
                                  data={checkListTaskData}
                                  setData={setCheckListTaskData}
                                />
                              ) : (
                                <div className="my-4 rounded-lg bg-white p-5 shadow-cardShadow">
                                  <div className="mb-4">
                                    <h3 className="text-xl font-bold">
                                      Used for
                                    </h3>
                                    <SameForAllCheckbox
                                      setSameForAllCheckList={
                                        setSameForAllCheckList
                                      }
                                      sameForAllCheckList={sameForAllCheckList}
                                    />
                                  </div>
                                  {usedFor?.map((item: any, index: number) => (
                                    <CategoriesCheckListTask
                                      key={index}
                                      assignTaskTo={assignTaskTo}
                                      frequencyForAll={
                                        taskDetailsData.isFrequency
                                      }
                                      taskDetails={taskDetails}
                                      roleForAll={taskDetailsData.isAssignTask}
                                      data={checkListTaskData}
                                      setData={setCheckListTaskData}
                                      id={item.id}
                                      toggleLabel={item.name as string}
                                    />
                                  ))}
                                </div>
                              )}
                            </StepThreeLayoutChecklist>
                          )}

                        {monitoringActiveFrom.usedFor &&
                          monitoringActiveFrom.currentType ===
                            MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
                          monitoringActiveFrom.task_related ===
                            MONITORING_TASK_SETUP_ENUM.EQUIPMENT &&
                          currentStep === 3 && (
                            <StepThreeLayoutChecklist
                              setData={setData}
                              data={data}
                              assignTaskTo={assignTaskTo}
                              taskDetails={taskDetails}
                            >
                              {sameForAllCheckList && (
                                <ExpandableDetailsCard
                                  title="Used for"
                                  items={usedFor}
                                  expand={expand}
                                  getData={(value) =>
                                    setData('data', {
                                      ...(data.data as any),
                                      'used-for': value,
                                    })
                                  }
                                  renderCheckBox={
                                    <SameForAllCheckbox
                                      setSameForAllCheckList={
                                        setSameForAllCheckList
                                      }
                                      sameForAllCheckList={sameForAllCheckList}
                                    />
                                  }
                                  setExpand={setExpand}
                                />
                              )}

                              <TaskDetails
                                assignTaskTo={assignTaskTo}
                                taskDetails={taskDetails}
                                data={taskDetailsData}
                                setData={setTaskDetailsData}
                              />

                              {sameForAllCheckList ? (
                                <CheckListTask
                                  assignTaskTo={assignTaskTo}
                                  frequencyForAll={taskDetailsData.isFrequency}
                                  taskDetails={taskDetails}
                                  roleForAll={taskDetailsData.isAssignTask}
                                  data={checkListTaskData}
                                  setData={setCheckListTaskData}
                                />
                              ) : (
                                <div className="my-4 rounded-lg bg-white p-5 shadow-cardShadow">
                                  <div className="mb-4">
                                    <h3 className="text-xl font-bold">
                                      Used for
                                    </h3>
                                    <SameForAllCheckbox
                                      setSameForAllCheckList={
                                        setSameForAllCheckList
                                      }
                                      sameForAllCheckList={sameForAllCheckList}
                                    />
                                  </div>

                                  {usedFor?.map((item: any, index: number) => (
                                    <CategoriesCheckListTask
                                      key={index}
                                      assignTaskTo={assignTaskTo}
                                      frequencyForAll={
                                        taskDetailsData.isFrequency
                                      }
                                      taskDetails={taskDetails}
                                      roleForAll={taskDetailsData.isAssignTask}
                                      data={checkListTaskData}
                                      setData={setCheckListTaskData}
                                      id={item.id}
                                      toggleLabel={item?.name}
                                    />
                                  ))}
                                </div>
                              )}
                            </StepThreeLayoutChecklist>
                          )}
                      </div>

                      <CommonModal
                        open={instructionModal}
                        onClose={handleModal}
                      >
                        <div>
                          <h1 className="py-3 text-center text-3xl font-bold">
                            Instruction
                          </h1>
                          <p className="py-3 text-center">
                            This will be shown in your HACCP plan under the
                            ‘Monitoring’ section description of this task.
                          </p>

                          <TextInput
                            type="text"
                            name="summary"
                            placeholder="Summary"
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                            className="mb-3 w-full rounded border px-4 py-2"
                          />

                          <p className="py-5 text-center">
                            This will be shown to users in Owlly mobile app.
                          </p>

                          <CKEditor
                            data={data.instructions_editor}
                            editor={ClassicEditor as any}
                            onChange={(event, value) => {
                              setData('instructions_editor', value.getData());
                            }}
                            config={{
                              toolbar: {
                                items: [
                                  'undo',
                                  'redo',
                                  '|',
                                  'heading',
                                  '|',
                                  'font family',
                                  'fontsize',
                                  'fontColor',
                                  'fontBackgroundColor',
                                  '|',
                                  'bold',
                                  'italic',
                                  'strikethrough',
                                  'subscript',
                                  'superscript',
                                  'code',
                                  '|',
                                  'link',
                                  'uploadImage',
                                  'blockQuote',
                                  'codeBlock',
                                  '|',
                                  'bulletedList',
                                  'numberedList',
                                  'todoList',
                                  'outdent',
                                  'indent',
                                ],
                                shouldNotGroupWhenFull: false,
                              },
                            }}
                          />
                        </div>

                        <div className="mt-8 flex justify-between space-x-2">
                          <CommonButton
                            onClick={handleModal}
                            variant="outlined"
                          >
                            Cancel
                          </CommonButton>

                          <CommonButton
                            className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-white"
                            variant="success"
                            type="button"
                            onClick={handleModal}
                          >
                            Save
                          </CommonButton>
                        </div>
                      </CommonModal>
                    </>
                  );
                default:
                  return <p>Form Error</p>;
              }
            })()}

            <div className="mx-4 mt-8 flex justify-between space-x-2">
              <CommonButton onClick={cancelDrawer} variant="outlined">
                Cancel
              </CommonButton>

              {handleNextButton(currentStep) && (
                <CommonButton
                  className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-white"
                  variant="success"
                  type="button"
                  onClick={nextStep}
                >
                  Next
                </CommonButton>
              )}

              {currentStep === 3 && (
                <CommonButton
                  disabled={handleButtonDisable}
                  onClick={submitFormHandler}
                  className={clsx(
                    handleButtonDisable
                      ? 'bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400'
                      : 'bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400',
                    ' text-white'
                  )}
                  type="button"
                >
                  Save
                </CommonButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default MonitoringTaskSetupCreate;

function ScrenAlert() {
  return (
    <div className="mt-5 max-h-[536px] w-[30vh] max-w-[275px] overflow-y-auto rounded-xl p-3">
      <div className="flex h-[500px] items-center justify-center">
        <span className="mx-0 flex rounded-md bg-yellow-200 p-3">
          <IoIosInformationCircleOutline className="mr-2 h-9 w-9" />
          Please make a selection to see the preview
        </span>
      </div>
    </div>
  );
}
