import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import CommonButton from '@/Components/CommonButton';
import TableButton from '@/Components/TableButton';
import NotificationMessage from '@/Components/NotificationMessage';
import ConfirmationBox from '@/Components/ConfirmationBox';
import React, { useState, useRef } from 'react';
import SelectAuditTemplatePopup from '@/Components/Audit/SelectAuditTemplatePopup';
import Table from '@/Components/Table';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

export default function AuditIndex({ auth, audits, auditTemplate }: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const columns = [
    {
      label: 'Auditor',
      key: 'auditor',
      renderCell: (params: any) => {
        const { audit_template_id, file_path } = params;
        if (audit_template_id) {
          return (
            <div
              className="cursor-pointer text-blue-600"
              onClick={() => auditShow(params.audit_template_id)}
            >
              {params.auditor}
            </div>
          );
        } else {
          const fileName = file_path.split('/').pop();
          const downloadUrl = route('audit.download', { file: fileName });
          return <a href={downloadUrl}>{params.auditor}</a>;
        }
      },
    },
    { label: 'Audit Date', key: 'audit_date' },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton
            variant="success"
            className={params.audit_template_id ? '' : 'invisible'}
            onClick={() =>
              router.get(
                route('audit.template.form.create', {
                  template: params.audit_template_id,
                })
              )
            }
          >
            Edit
          </TableButton>
          <TableButton
            variant="outlined"
            onClick={() => handleDeleteClick(params.id)}
          >
            Delete
          </TableButton>
        </div>
      ),
    },
  ];

  const auditShow = (id: any) => {
    router.get(route('audit.show', { template: id }));
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const upload = event.target.files;
    if (upload) {
      const fileArray = Array.from(upload);
      const formData = new FormData();
      fileArray.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      router.post(route('audit.upload'), formData, {
        onSuccess: () => {
          setNotification({
            message: 'File uploaded successfully!',
            type: 'success',
          });
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
        onError: () => {
          setNotification({
            message: 'File upload failed. Please try again.',
            type: 'error',
          });
        },
      });
    } else {
      console.warn('No files selected');
    }
  };

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('audit.delete', { id: deleteId }), {
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

  const handleNewAuditClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleTemplateSelect = (selectedTemplate: string) => {
    console.log('Selected Template:', selectedTemplate);
  };

  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');

  const handleSelect = () => {
    if (selectedTemplate) {
      router.get(
        route('audit.template.form.create', { template: selectedTemplate })
      );
    } else {
      console.warn('No template selected');
    }
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Audit</h2>}
    >
      <Head title="Audit" />

      <div className="flex  mt-0">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <AuditSidebar />
        </SidebarCommonLayout>

        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1 bg-white rounded-lg">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red 
          mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">Audits</h1>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  multiple
                  onChange={handleFileChange}
                />
                <CommonButton
                  variant="success"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Add File / Image
                </CommonButton>

                <CommonButton variant="success" onClick={handleNewAuditClick}>
                  New Audit
                </CommonButton>
              </div>
            </div>
          </div>

          {showConfirmation && (
            <ConfirmationBox
              Question="Are you sure want to delete this audit?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}

          <SelectAuditTemplatePopup
            isOpen={showPopup}
            data={auditTemplate}
            onClose={handlePopupClose}
            onSelect={handleTemplateSelect}
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
            handleSelect={handleSelect}
          />

          <div className="p-4">
            <Table columns={columns} datas={audits} route={route('audit')} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
