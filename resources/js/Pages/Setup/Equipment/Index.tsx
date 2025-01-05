import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Equipments from '@/Pages/Setup/Equipment/Partials/Equipments';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';

export default function Index({ auth, types, rooms, equipments }: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Setup Equipments</h2>}
    >
      <Head title="Equipments" />

      <div className="flex">
        <SetupMonitoringSidebar />
        <Equipments
          types={types}
          rooms={rooms}
          equipments={equipments}
          routePrefix={''}
        />
      </div>
    </AuthenticatedLayout>
  );
}
