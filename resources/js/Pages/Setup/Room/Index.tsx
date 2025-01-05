import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Rooms from '@/Pages/Setup/Room/Partials/Rooms';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';

export default function Index({ auth, types, rooms }: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Setup Users</h2>}
    >
      <Head title="Rooms" />

      <div className="flex">
        <SetupMonitoringSidebar />
        <Rooms types={types} rooms={rooms} routePrefix={''} />
      </div>
    </AuthenticatedLayout>
  );
}
