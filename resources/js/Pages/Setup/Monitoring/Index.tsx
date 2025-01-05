import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';
import MonitoringTasks from '@/Pages/Monitor/MonitoringTasks';

export default function Index({
  auth,
  monitoringTasks,
  taskCreateData,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Setup Users</h2>}
    >
      <Head title="Rooms" />

      <div className="flex">
        <SetupMonitoringSidebar />.
        <div className="flex-1 bg-white rounded-lg">
          <MonitoringTasks
            className="w-full"
            monitoringTasks={monitoringTasks}
            taskCreateData={taskCreateData}
            auth={auth}
            isMonitoring={true}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
