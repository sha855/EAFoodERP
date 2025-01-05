import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import React from 'react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import Rooms from '@/Pages/Setup/Room/Partials/Rooms';

export default function AuditIndex({
  auth,
  types,
  rooms,
  translation,
  folders,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Rooms</h2>}
    >
      <Head title="Rooms" />

      <div className="flex  mt-0">
        <AdminUserSidebar folders={folders || []} />
        <Rooms types={types} rooms={rooms} routePrefix={'admin.'} />
      </div>
    </AuthenticatedLayout>
  );
}
