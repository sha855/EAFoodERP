import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import Rooms from '@/Pages/Setup/Room/Partials/Rooms';
import MonitoringTasks from '@/Pages/Monitor/MonitoringTasks';

export default function AuditIndex({
  auth,
  folders,
  monitoringTasks,
  taskCreateData,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Task</h2>}
    >
      <Head title="Task" />
      <div className="flex  mt-0">
        <AdminUserSidebar folders={folders || []} />
        <MonitoringTasks
          monitoringTasks={monitoringTasks}
          taskCreateData={taskCreateData}
          auth={auth}
          routePrefix={'admin.'}
        />
      </div>
    </AuthenticatedLayout>
  );
}
