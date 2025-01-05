import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import WorkGroupTask from '@/Components/Haccp/WorkGroupTask';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import WorkGroupTaskView from '@/Components/Haccp/WorkGroupTaskView';
import CommonButton from '@/Components/CommonButton';
import { PageProps } from '@/types';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

interface Task {
  responsible: string;
}

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'HACCP.Workgroup': TranslationStructure;
  };
  locale: string;
}

export default function WorkGroup({
  workGroup,
  workGroupUser,
  users,
  tasks: initialTasks,
  companyWorkGroup,
  company,
  customWorkGroup,
  folders,
}: any) {
  const auth: any = usePage().props.auth;
  const { data, setData, post, processing, errors } = useForm({
    tasks: workGroup.map((task: any) => {
      const workGroup =
        companyWorkGroup.find((wg: any) => wg.task === task) || {};
      return {
        id: workGroup.id || 0,
        task: task,
        task_id: task.id,
        company_id: company.id,
        user_id: company.user.id,
        responsible: workGroup.responsible || '',
        is_service_provider: workGroup.is_service_provider || false,
        outsourced_service: workGroup.outsourced_service || '',
        is_required: workGroup.is_required || false,
        isNew: false,
      };
    }),
    overallResponsible: company.user.name,
    sameResponsible: false,
  });

  const [notification, setNotification] = useState(null);
  const [previousResponsibleValues, setPreviousResponsibleValues] = useState(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [responsible, setResponsible] = useState(false);
  const { translation, locale } = usePage<TranslationProps>().props;
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const translations = translation['HACCP.Workgroup'] || {};

  useEffect(() => {
    if (initialTasks.length > 0) {
      const newTasks = workGroup.map((task: any) => {
        const workGroup =
          companyWorkGroup.find((wg: any) => wg.task === task) || {};
        return {
          id: workGroup.id || 0,
          task: task,
          task_id: task.id,
          company_id: company.id,
          user_id: company.user.id,
          responsible: workGroup.responsible || '',
          is_service_provider: workGroup.is_service_provider || false,
          outsourced_service: workGroup.outsourced_service || '',
          is_required: true,
          isNew: false,
        };
      });
      const combinedTasks = [...newTasks];
      const tasksAreDifferent =
        JSON.stringify(combinedTasks) !== JSON.stringify(data.tasks);

      if (tasksAreDifferent) {
        setData('tasks', combinedTasks);
      }
    }
  }, [companyWorkGroup, company.id, company.user.id, customWorkGroup]);

  const handleOutsourcedChange = (taskIndex: number) => {
    const newTasks = [...data.tasks];
    newTasks[taskIndex].is_service_provider =
      !newTasks[taskIndex].is_service_provider;
    setData('tasks', newTasks);
  };

  const handleOutsourcedDetailsChange = (taskIndex: number, value: number) => {
    const newTasks = [...data.tasks];
    newTasks[taskIndex].outsourced_service = value;
    setData('tasks', newTasks);
  };

  const handleResponsibleChange = (taskIndex: number, value: number) => {
    const newTasks = [...data.tasks];
    newTasks[taskIndex].responsible = value;
    setData('tasks', newTasks);
  };

  const handleAddNewTask = () => {
    const newTask = {
      id: 0,
      task: '',
      task_id: 0,
      company_id: company.id,
      user_id: company.user.id,
      responsible: '',
      is_service_provider: false,
      outsourced_service: '',
      is_required: false,
      isNew: true,
    };
    setData('tasks', [...data.tasks, newTask]);
  };

  const handleDeleteTask = (taskIndex: number, taskItem: any) => {
    const { id: taskId } = taskItem;
    setData(
      'tasks',
      data.tasks.filter((_: number, index: number) => index !== taskIndex)
    );

    if (taskId) {
      router.delete(route('admin.work-group.destroy', taskId), {
        data: taskItem,
      });
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    post(route('admin.workgroup.store'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    });
  };

  const handleSameResponsibleChange = (checked: boolean) => {
    setResponsible(checked);
    setData('sameResponsible', checked);
    const previousResponsibleValues: string[] = data.tasks.map(
      (task: any) => task.responsible
    );
    const newTasks = [...data.tasks] as Task[];
    if (checked) {
      newTasks.forEach((task: Task) => {
        task.responsible = String(company.user_id);
      });
      setData('tasks', newTasks);
    } else {
      newTasks.forEach((task, index) => {
        task.responsible = previousResponsibleValues[index] || '';
      });
      setData('tasks', newTasks);
    }
  };

  const handleOverallResponsibleChange = (value: any) => {
    setData('overallResponsible', value);
    if (data.sameResponsible) {
      const newTasks = [...data.tasks];
      newTasks.forEach((task) => {
        task.responsible = value;
      });
      setData('tasks', newTasks);
    }
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {translations.workGroup}
        </h2>
      }
    >
      <Head title={translations.workGroup} />
      <div className="flex flex-col lg:flex-row lg:space-x-4">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <AdminUserSidebar folders={folders || []} />
        </SidebarCommonLayout>
        <div className=" overflow-hidden  w-full">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>
          <div className="bg-white rounded-md">
            {isEditing ? (
              <WorkGroupTask
                translations={translations}
                tasks={data.tasks}
                onTaskChange={(index: any, value: any) => {
                  const newTasks = [...data.tasks];
                  newTasks[index].task = value;
                  setData('tasks', newTasks);
                }}
                errors={errors}
                onResponsibleChange={handleResponsibleChange}
                onOutsourcedChange={handleOutsourcedChange}
                onOutsourcedDetailsChange={handleOutsourcedDetailsChange}
                onAddNewTask={handleAddNewTask}
                onDeleteTask={handleDeleteTask}
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                processing={processing}
                notification={notification}
                setNotification={setNotification}
                handleSameResponsibleChange={handleSameResponsibleChange}
                handleOverallResponsibleChange={handleOverallResponsibleChange}
                checkedData={data.sameResponsible}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                users={users}
                workGroupUser={workGroupUser}
                responsible={responsible}
              />
            ) : (
              <WorkGroupTaskView
                translations={translations}
                tasks={data.tasks}
                data={data}
                processing={processing}
                notification={notification}
                checkedData={data.sameResponsible}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                companyWorkGroup={companyWorkGroup}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
