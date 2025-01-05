import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import Rooms from '@/Pages/Setup/Room/Partials/Rooms';
import Equipments from '@/Pages/Setup/Equipment/Partials/Equipments';

export default function AuditIndex({
  auth,
  types,
  rooms,
  equipments,
  translation,
  folders,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Equipment</h2>}
    >
      <Head title="Equipments" />

      <div className="flex  mt-0">
        <AdminUserSidebar folders={folders || []} />
        <Equipments
          types={types}
          rooms={rooms}
          equipments={equipments}
          routePrefix={'admin.'}
        />
      </div>
    </AuthenticatedLayout>
  );
}
