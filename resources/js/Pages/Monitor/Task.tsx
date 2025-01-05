import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import { PageProps } from '@/types';
import MonitoringTasks from '@/Pages/Monitor/MonitoringTasks';

export default function Monitor({
  monitoringTasks,
  taskCreateData,
}: PageProps) {
  const auth: any = usePage().props.auth;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Monitoring Task
        </h2>
      }
    >
      <Head title="Monitoring Task" />
      <MonitoringTasks
        monitoringTasks={monitoringTasks}
        taskCreateData={taskCreateData}
        auth={auth}
      />
    </AuthenticatedLayout>
  );
}
