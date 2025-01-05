import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import CommonButton from '@/Components/CommonButton';
import { formatDate } from '@/src/utils/dateUtils';
import TableButton from '@/Components/TableButton';
import NotificationMessage from '@/Components/NotificationMessage';
import ConfirmationBox from '@/Components/ConfirmationBox';
import { useState } from 'react';
import Table from '@/Components/Table';

export default function AuditTemplate({ auth, template }: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const columns = [
    {
      label: 'Name',
      key: 'name',
      renderCell: (params: any) => (
        <div
          className="cursor-pointer text-blue-600"
          onClick={() => auditTemplateShow(params.id)}
        >
          {params.name}
        </div>
      ),
    },
    {
      label: 'Date Modified',
      key: 'updated_at',
      renderCell: (params: any) => <span>{formatDate(params.updated_at)}</span>,
    },
    { label: 'Audit Frequency', key: 'audit_frequency' },
    {
      label: '',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton
            variant="edit"
            onClick={() => auditTemplateEdit(params.id)}
          >
            Edit
          </TableButton>
          <TableButton
            variant="delete"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </TableButton>
        </div>
      ),
    },
  ];

  const auditTemplateShow = (id: any) => {
    router.get(route('template.show', { template: id }));
  };

  const auditTemplateEdit = (id: any) => {
    router.get(route('template.edit', { template: id }));
  };

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('template.destroy', { id: deleteId }), {
        onSuccess: () => {
          setNotification({
            message: 'Audit deleted successfully',
            type: 'success',
          });
        },
        onError: () => {
          setNotification({ message: 'Error deleting audit', type: 'error' });
        },
      });
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Audit</h2>}
    >
      <Head title="Audit" />

      <div className="flex ">
        <AuditSidebar />

        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1 p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Audits Template</h1>
            <div className="flex gap-2">
              <CommonButton href={route('template.create')} variant="success">
                New Audit Template
              </CommonButton>
            </div>
          </div>

          {showConfirmation && (
            <ConfirmationBox
              Question="Are you sure want to delete this template?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}

          <Table
            columns={columns}
            datas={template}
            route={route('template.index')}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
