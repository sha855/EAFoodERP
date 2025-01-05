import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import CommonButton from '@/Components/CommonButton';
import TableButton from '@/Components/TableButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import Table from '@/Components/Table';
import { formatDate } from '@/src/utils/dateUtils';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Modal from '@/Components/Modal';

export default function FlowChart({
  companyId,
  flowCharts,
  baseUrl,
  folders,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showExampleModal, setShowExampleModal] = useState(false);

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('admin.flow.chart.delete', { flowChart: deleteId }));
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const columns = [
    {
      label: 'Name',
      key: 'name',
      renderCell: (params: any) => {
        const { file_path } = params;
        const fileName = file_path.split('/').pop();
        const downloadUrl = route('admin.flow.chart.download', {
          file: fileName,
        });
        return (
          <a
            href={downloadUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.name}
          </a>
        );
      },
    },
    {
      label: 'Date Modified',
      key: 'updated_at',
      renderCell: (params: any) => <span>{formatDate(params.updated_at)}</span>,
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton
            variant="delete"
            onClick={() => handleDeleteClick(params.id)}
          >
            <TrashIcon className="h-5 w-5 text-orange-500" />
          </TableButton>
        </div>
      ),
    },
  ];

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const upload = event.target.files;
    if (upload) {
      const fileArray = Array.from(upload);
      const formData = new FormData();
      fileArray.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      formData.append('company_id', companyId);
      router.post(route('admin.flow.chart.upload'), formData);
    }
  };

  const handleShowExampleClick = () => {
    setShowExampleModal(true);
  };

  const BASE_URL = baseUrl;

  const flowChartImage = `${BASE_URL}/charts/flowChart.png`;
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Flow Chart
        </h2>
      }
    >
      <Head title="Manage Flow Chart" />
      {showConfirmation && (
        <ConfirmationBox
          Question="Are you sure want to delete this audit?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      <div className="flex">
        <AdminUserSidebar folders={folders || []} />
        <div className="bg-white shadow rounded w-full h-fit">
          <div className="w-full bg-white p-0 shadow rounded-md">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h5 className="text-xl font-semibold">Flow Chart</h5>
              <div className="flex justify-end gap-2">
                <CommonButton
                  variant="text"
                  style={{
                    background:
                      'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  className="font-bold"
                  onClick={handleShowExampleClick}
                >
                  VIEW EXAMPLE
                </CommonButton>

                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  accept="*/*"
                  multiple
                  onChange={handleFileChange}
                />
                <CommonButton
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add File / Image
                </CommonButton>

                <CommonButton
                  className="!border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                  variant="success"
                  href={route('admin.flow.chart.create', {
                    company: companyId,
                  })}
                >
                  Create
                </CommonButton>
              </div>
            </div>
          </div>
          <div className="py-10 px-6">
            <Table
              columns={columns}
              datas={flowCharts}
              route={route('admin.company.flow.chart', { company: companyId })}
            />
          </div>
        </div>
      </div>

      <Modal show={showExampleModal} onClose={() => setShowExampleModal(false)}>
        <img
          src={flowChartImage}
          alt="Example Flow Chart"
          className="max-w-full h-[600px]"
        />
      </Modal>
    </AuthenticatedLayout>
  );
}
