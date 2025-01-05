import { router, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import React, { useState } from 'react';
import Container from '@/Components/Container';
import { useAppDispatch, useAppSelector } from '@/_hooks/useStore';
import { closeDrawer, openDrawer } from '@/store/slice/stateSlice';
import CommonDrawer from '@/Components/CommonDrawer';
import MonitoringTaskSetupCreate from '@/Pages/Monitor/Partials/MonitoringTaskSetupCreate';
import CommonTable from '@/Components/CommonTable';
import SwitchBtn from '@/Components/Pricing/SwitchBtn';
import axios from 'axios';
import { PageProps } from '@/types';
import clsx from 'clsx';
import { IoMdClose, IoMdInformationCircleOutline } from 'react-icons/io';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';

export default function MonitoringTasks({
  monitoringTasks,
  taskCreateData,
  className,
  isMonitoring = false,
  routePrefix = '',
}: PageProps & {
  className?: string;
  isMonitoring?: boolean;
  routePrefix?: string;
}) {
  const [openAlert, setAlertOpen] = React.useState(true);
  const { drawer } = useAppSelector((state) => state.state);
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState<any>(null);
  const [deleteState, setDeleteState] = useState<{
    id: number | null;
    show: boolean;
  }>({ id: null, show: false });

  const routeParams = route().routeParams;
  const queryParams = route().queryParams;
  const companyId = routeParams?.company;
  const handleDrawerOpen = () => {
    setEdit(null);
    dispatch(openDrawer());
  };

  const handleDrawerClose = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

  const handleDeleteClick = (id: number) => {
    setDeleteState({ id, show: true });
  };

  const handleCancelDelete = () => {
    setDeleteState({ id: null, show: false });
  };

  const handleEdit = (params: any) => {
    setEdit(params);
    dispatch(openDrawer());
  };

  const handleConfirmDelete = () => {
    if (deleteState.id !== null) {
      router.delete(
        route(routePrefix + 'monitor.task.destroy', {
          monitoringTask: deleteState.id,
        }),
        {
          onFinish: () => setDeleteState({ id: null, show: false }),
        }
      );
    }
  };

  const columns = [
    { label: 'Monitoring tasks', key: 'name', sortable: true },
    {
      label: 'Responsible role',
      key: 'assign_task_to',
      renderCell: (params: any) => {
        return (
          <div>
            {params?.responsible_roles?.map((item: any) => (
              <span className="me-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                {item?.assigned_role?.name}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      label: 'status',
      key: 'is_enabled',
      renderCell: (params: any) => {
        return (
          <SwitchBtn
            value={params?.is_enabled}
            onChange={(e) =>
              handleIsUse({
                ...params,
                is_enabled: e.target.checked,
              })
            }
            className="!h-7 !w-12 after:!start-[4px] after:!h-5 after:!w-5"
          />
        );
      },
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton variant="success" onClick={() => handleEdit(params)}>
            <span>Edit</span>
          </TableButton>
          <TableButton
            variant="outlined"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </TableButton>
        </div>
      ),
    },
  ];

  const handleIsUse = async (data: any) => {
    const response = await axios.post(
      route(routePrefix + 'monitor.task.status', { monitoring: data.id }),
      { is_enabled: data.is_enabled }
    );
    if (response) filterMonitoringHandle(queryParams?.search);
  };

  const param = {
    ...(routeParams?.company ? { company: routeParams?.company } : {}),
  };

  const filterMonitoringHandle = (name: string) => {
    router.get(
      !isMonitoring
        ? route(routePrefix + 'monitor.task', param)
        : route('setup.monitor.task'),
      {
        page: queryParams?.page,
        per_page: queryParams?.per_page,
        search: name,
      },
      {
        preserveState: true,
        preserveScroll: true,
      }
    );
  };

  return (
    <div>
      <div className={clsx(className ? className : 'mx-auto max-w-7xl')}>
        <div className="">
          <Container>
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold text-gray-900">
                Monitoring tasks
              </h1>
              <div className="flex gap-5">
                <CommonButton href={route('monitor')} variant="success">
                  Done
                </CommonButton>
                <CommonButton
                  onClick={handleDrawerOpen}
                  variant="text"
                  className="rounded border-2 border-solid border-orange-400 !px-4 py-2 text-orange-400 hover:bg-gradient-org-red hover:text-white"
                >
                  + ADD TASK
                </CommonButton>
              </div>
            </div>
            <div className="p-4 bg-white">
              {openAlert && (
                <div className="bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex  justify-center">
                  <div className="w-10 text-center flex">
                    <IoMdInformationCircleOutline className="h-6 w-6" />
                  </div>
                  <div className="pr-3">
                    <p className="text-sm">
                      Monitoring tasks are generated based on your profile. Feel
                      free to Start Monitoring right away or add fully
                      customized tasks from scratch tailored to your exact
                      needs. Drag tasks to change their order.
                    </p>
                  </div>
                  <div className="w-8 text-center flex justify-center items-center">
                    <IoMdClose
                      onClick={() => setAlertOpen(false)}
                      className="h-5 w-5 cursor-pointer"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end w-full mb-4">
                <div className="w-2/12">
                  <select
                    value={queryParams?.search}
                    onChange={(e) => filterMonitoringHandle(e.target.value)}
                    name="filterRoom"
                    className="!border-0 !bg-slate-100  !text-black text-sm rounded-lg !ring-0 !ring-offset-0 	 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option value="2" selected>
                      All tasks
                    </option>
                    <option value="1">Active tasks</option>
                    <option value="0">Inactive tasks</option>
                  </select>
                </div>
              </div>
              <CommonTable
                columns={columns}
                data={monitoringTasks}
                dataRoute={
                  !isMonitoring
                    ? routePrefix + 'monitor.task'
                    : 'setup.monitor.task'
                }
                routeKeys={{ company: companyId }}
              />
            </div>
          </Container>
        </div>
        <CommonDrawer
          title="Monitoring Task setup"
          isDrawerOpen={drawer}
          onClose={handleDrawerClose}
          className={{ innerClassName: '!w-[1200px] !overflow-hidden' }}
        >
          <MonitoringTaskSetupCreate
            editData={edit}
            taskCreateData={taskCreateData}
            routePrefix={routePrefix}
          />
        </CommonDrawer>
        {deleteState.show && (
          <ConfirmationBox
            Question="Are you sure you want to delete this task?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
}
