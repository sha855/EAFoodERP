import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import CommonButton from '@/Components/CommonButton';
import TableButton from '@/Components/TableButton';
import { IoClose } from 'react-icons/io5';

import Table from '@/Components/Table';
import { formatDate } from '@/src/utils/dateUtils';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Modal from '@/Components/Modal';
import axios from 'axios';

import { GoPlus } from 'react-icons/go';
import { RiUpload2Line } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';

export default function FloorPlan({
  companyId,
  baseUrl,
  floorType,
  floorPlans,
  folders,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [floorPlanName, setFloorPlanName] = useState('');

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('admin.floor.plan.delete', { floorPlan: deleteId }));
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleFloorPlanChange = (params: any) => {
    fileInputRef.current?.click();
    setFloorPlanName(params.name);
  };

  const groupedFloorPlans = floorPlans.reduce((acc: any, plan: any) => {
    acc[plan.floor_plan] = acc[plan.floor_plan] || [];
    acc[plan.floor_plan].push(plan);
    return acc;
  }, {});

  const enrichedFloorPlans = floorType.map((type: any) => ({
    id: groupedFloorPlans[type]?.[0]?.id || 0,
    name: type,
    files: groupedFloorPlans[type] || [],
    isActive: groupedFloorPlans[type]?.[0]?.is_active || 0,
    companyId: groupedFloorPlans[type]?.[0]?.company_id || companyId,
    updatedAt: groupedFloorPlans[type]?.[0]?.updated_at || '',
  }));

  const columns = [
    { label: 'Floor Plan', key: 'name' },
    {
      label: 'Plans',
      key: 'files',
      renderCell: (params: any) => {
        const { id, isActive, name, companyId, files } = params;

        return (
          <div className="">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
              {files.length > 0 ? (
                files.map((file: any) =>
                  file.files.map((image: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <Link
                        href={route('admin.floor.plan.download', {
                          file: image.name,
                        })}
                        download
                      >
                        <span className="w-[120px] whitespace-nowrap overflow-hidden text-ellipsis inline-block">
                          {image.name}
                        </span>
                      </Link>
                      <IoClose
                        onClick={() => handleDeleteClick(image.id)}
                        className="h-5 w-5 text-orange-500 cursor-pointer"
                      />
                    </div>
                  ))
                )
              ) : (
                <span></span>
              )}
            </div>

            {isActive ? (
              <div className="flex gap-4">
                <CommonButton
                  className="!px-2 !text-sm !font-semibold  bg-green-100 text-green-800 flex items-center gap-1"
                  variant="text"
                  onClick={() =>
                    router.get(
                      route('admin.company.floor.plan.create', {
                        floorPlan: name,
                        company: companyId,
                      })
                    )
                  }
                >
                  <GoPlus className="w-5 h-5" />
                  Create
                </CommonButton>
                <CommonButton
                  className="!px-2 !text-sm !font-semibold  bg-yellow-100 text-yellow-800 flex items-center gap-1"
                  variant="text"
                  onClick={() => handleFloorPlanChange(params)}
                >
                  <RiUpload2Line className="w-4 h-4" />
                  Upload
                </CommonButton>
                <CommonButton
                  className="bg-blue-100 text-blue-800 flex items-center gap-1"
                  variant="text"
                  onClick={handleShowExampleClick}
                >
                  <FaRegEye className="w-4 h-4" />
                  View Example
                </CommonButton>
              </div>
            ) : (
              <span>Layout not added to digital HACCP plan</span>
            )}
          </div>
        );
      },
    },
    {
      label: 'Date Modified',
      key: 'updated_at',
      renderCell: (params: any) => <span>{formatDate(params.updatedAt)}</span>,
    },
    {
      label: 'In Use',
      key: 'actions',
      renderCell: (params: any) => {
        const { id, isActive, name, companyId } = params;
        const handleToggleChange = async (isChecked: boolean) => {
          await router.post(route('admin.floor.plan.status'), {
            id: id,
            is_active: isChecked,
            floor_plan: name,
            company_id: companyId,
          });
        };

        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isActive}
              onChange={(e) => handleToggleChange(e.target.checked)}
            />
            <div
              className={`w-11 h-6 ${isActive ? 'bg-orange-400' : 'bg-gray-300'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer focus:ring-0 peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
            ></div>
          </label>
        );
      },
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
      formData.append('floor_plan', floorPlanName);
      router.post(route('admin.floor.plan.upload'), formData);
    }
  };

  const handleShowExampleClick = () => {
    setShowExampleModal(true);
  };

  const BASE_URL = baseUrl;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Floor Plan
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
              <h5 className="text-xl font-semibold">Floor Plan</h5>
            </div>
          </div>
          <div className="py-10 px-6">
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept="*/*"
              multiple
              onChange={handleFileChange}
            />

            <Table
              columns={columns}
              datas={enrichedFloorPlans}
              route={route('admin.company.flow.chart', { company: companyId })}
            />
          </div>
        </div>
      </div>

      <Modal show={showExampleModal} onClose={() => setShowExampleModal(false)}>
        <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
          <h2 className="text-xl font-bold text-gray-900">Floor Plan</h2>
        </div>
        <div className="p-4">
          <img
            src={`${BASE_URL}/charts/floorPlan.jpg`}
            alt="Example Floor Plan"
            className="max-w-full h-500"
          />
        </div>
      </Modal>
    </AuthenticatedLayout>
  );
}
