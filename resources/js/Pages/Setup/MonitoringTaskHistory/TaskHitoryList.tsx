import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { PageProps } from '@/types';
import CommonTable from '@/Components/CommonTable';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NavLink from '@/Components/NavLink';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';

interface FormListProps {
  auth: any;
  task: any;
  tasks: any;
}
export default function FormList({ auth, task, tasks }: FormListProps) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const { translation, locale } = usePage<PageProps>().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TaskHistory =
    translationData['Setup.MonitoringTaskHistory'] ||
    translationData['Setup.Setup.MonitoringTaskHistory'] ||
    {};
  const translations = { ...TaskHistory };

  const columns = [
    {
      label: 'Date',
      key: 'date',
      sortable: true,
    },
    {
      label: 'Name',
      key: 'task_name',
      sortable: true,
    },
    {
      label: 'Registered By',
      key: 'registered_by',
    },
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.list.taskHistoryList}
        </h2>
      }
    >
      <Head title={translations.list.taskHistoryList} />

      <div className="flex">
        <SetupMonitoringSidebar />
        <div className="flex-1 bg-white rounded-lg">
          <div className="h-fit w-full p-8 bg-white rounded shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <label
                  htmlFor="from-date"
                  className="block text-sm font-bold text-gray-700"
                >
                  {translations.list.from}
                </label>
                <input
                  type="date"
                  id="from-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="to-date"
                  className="block text-sm font-bold text-gray-700"
                >
                  {translations.list.to}
                </label>
                <input
                  type="date"
                  id="to-date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
              <div className="flex items-center">
                <button
                  className="flex items-center gap-1 bg-gradient-org-red text-white p-2 rounded-md text-sm font-medium mt-5 relative"
                  onClick={(e) => {
                    e.preventDefault();
                    const dropdown =
                      document.getElementById('download-options');
                    if (dropdown) dropdown.classList.toggle('hidden');
                  }}
                >
                  <DownloadForOfflineIcon />
                  {translations.list.download}
                </button>

                <div
                  id="download-options"
                  className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                >
                  <ul>
                    <li
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      //onClick={handleCreateCSV}
                    >
                      <ArrowDownwardIcon className="mr-2" />
                      <span>{translations.list.downloadCSVFile}</span>
                    </li>
                    <li
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      //onClick={handleCreateXLSX}
                    >
                      <ArrowDownwardIcon className="mr-2" />
                      <span>{translations.list.downloadXlsxFile}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-0 bg-gradient-org-red text-white p-2 rounded-md">
                <NavLink
                  className=" !p-0 !mr-0 "
                  href={route('monitoring.task.history')}
                >
                  <ArrowBackIosIcon className="!w-5 !h-5 text-white" />
                </NavLink>
                <h1 className="text-md font-semibold">{task.name}</h1>
              </div>
              <div className="max-w-xs">
                <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                  <option value="1">{translations.list.all}</option>
                  <option value="2">{translations.list.correctEntries}</option>
                  <option value="3">
                    {translations.list.incorrectEntries}
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <CommonTable
                columns={columns}
                data={tasks}
                dataRoute={'activity-log/entries/${id}'}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
