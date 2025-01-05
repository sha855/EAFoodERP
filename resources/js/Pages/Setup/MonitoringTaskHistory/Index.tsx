import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import CommonTable from '@/Components/CommonTable';
import { InfoIcon } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';
import NavLink from '@/Components/NavLink';

type PageProps = {
  auth: any;
  monitoringTasks: any;
};

export default function Index({ auth, monitoringTasks }: PageProps) {
  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  const { translation, locale } = usePage<PageProps>().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TaskHistory =
    translationData['Setup.MonitoringTaskHistory'] ||
    translationData['Setup.Setup.MonitoringTaskHistory'] ||
    {};
  const translations = { ...TaskHistory };

  const columns = [
    {
      label: translations.table.monitoringTask,
      key: 'name',
      sortable: true,
    },
    {
      label: translations.table.responsibleRole,
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
      label: translations.table.lastEntry,
      key: 'last_entry',
    },
    {
      label: '',
      key: 'chevron',
      renderCell: (params: any) => {
        return (
          <NavLink
            href={route('task-history-list', params.id)}
            style={{ textDecoration: 'none' }}
          >
            <ChevronRightSharpIcon
              style={{ cursor: 'pointer' }}
              fontSize="large"
              className="text-black-500 hover:text-gray-700"
            />
          </NavLink>
        );
      },
    },
  ];

  const totalRecords = monitoringTasks.length;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">{translations.taskHistory}</h2>
      }
    >
      <Head title={translations.taskHistory} />

      <div className="flex ">
        <SetupMonitoringSidebar />
        <div className="flex-1 bg-white rounded-lg">
          <div className="h-fit w-full  bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h3 className="text-xl font-bold">{translations.taskHistory}</h3>

              <div className="relative mb-0">
                <select
                  id="taskHistory"
                  name="taskHistory"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="all">{translations.all}</option>
                  <option value="active">{translations.active}</option>
                  <option value="inactive">{translations.inactive}</option>
                </select>
              </div>
            </div>
            <div className="p-4">
              {showInfo && (
                <div className="bg-green-200  gap-1 p-4 rounded-md mt-0 relative w-full flex justify-center mb-4">
                  <div className="flex items-start">
                    <div className="w-12 text-xs">
                      <InfoIcon className="w-5 h-5  mr-3 " />
                    </div>
                    <p className="text-sm"> {translations.msgInfo}</p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-6  text-black hover:text-gray-600"
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}

              <CommonTable
                columns={columns}
                data={monitoringTasks}
                dataRoute={'monitoring.task.history'}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
