import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import CommonButton from '@/Components/CommonButton';
import Container from '@/Components/Container';
import { FaPlus } from 'react-icons/fa';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';
import Drawer from '@/Components/Drawer';
import TextInput from '@/Components/TextInput';
import PlanManageSidebar from '@/Components/Admin/PlanManageSidebar';
import PlansComparison from '@/Components/Modal/PlansComparison';
import { PencilIcon } from 'lucide-react';

export default function FeatureComparison({
  featuresComparison,
  features,
  plans,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [packageId, setDeleteId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const {
    data: typeData,
    setData: setTypeData,
    put,
    processing: processingType,
    errors: typeErrors,
  } = useForm({
    id: 0,
    feature_id: 0,
    feature_heading_id: 0,
    package_id: [0],
    package: '',
    is_active: [0],
    optional_act: [''],
  });

  const columns = [
    {
      label: 'Plan Name',
      key: 'name',
      renderCell: (params: any) => <span>{params.package?.name}</span>,
    },
    {
      label: 'Feature Name',
      key: 'feature_name',
      renderCell: (params: any) => (
        <span>{params.feature_package?.feature_name}</span>
      ),
    },
    {
      label: 'Status',
      key: 'is_active',
      renderCell: (params: any) => {
        if (params.optional_act !== null) {
          return <span>{params.optional_act}</span>;
        }
        return <span>{params.is_active === 1 ? 'true' : 'false'}</span>;
      },
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton variant="edit" onClick={() => handleEditClick(params)}>
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </TableButton>
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

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (packageId !== null) {
      router.delete(
        route('admin.feature-comparison.destroy', {
          feature_comparison: packageId,
        })
      );
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleEditClick = (packageData: any) => {
    setIsDrawerOpen(true);
    setCurrentPackageId(packageData.id);
    setTypeData({
      id: packageData.id,
      feature_id: packageData.feature_id,
      feature_heading_id: packageData.feature_heading_id,
      package: packageData.package?.name,
      package_id: [packageData.package?.id],
      is_active: [packageData.is_active],
      optional_act: [packageData.optional_act || ''],
    });
    setIsEditDrawerOpen(true);
  };

  const handlePlanComparison = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    put(
      route('admin.feature-comparison.update', {
        feature_comparison: currentPackageId,
      })
    );
    handleDrawerClose();
  };

  const formEditContent = (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold">Feature Name</label>
          <div className="mb-2 text-lg ">
            {
              features.data.find(
                (feature: any) => feature.id === typeData.feature_id
              )?.feature_name
            }
          </div>
          <label className="block text-gray-700 font-bold">Plan Name</label>
          <div className="mb-2 text-lg ">{typeData.package}</div>
        </div>

        <div className="mt-2 bg-white shadow-lg rounded-md w-full p-4 max-h-60 overflow-y-auto">
          <div className="flex justify-between items-center space-x-2 mb-4">
            <div className="flex items-center space-x-2">
              <label className="block text-gray-700 font-bold">Status</label>
              <span>{typeData.is_active[0] === 1 ? 'True' : 'False'}</span>
              <CommonButton
                type="button"
                variant="success"
                onClick={() =>
                  setTypeData({
                    ...typeData,
                    is_active: [typeData.is_active[0] === 1 ? 0 : 1],
                  })
                }
              >
                <PencilIcon />
              </CommonButton>
            </div>

            <div>
              <label className="block text-gray-700 font-bold">
                Action (Optional)
              </label>
              <TextInput
                type="text"
                value={typeData.optional_act[0] || ''}
                onChange={(e) =>
                  setTypeData({
                    ...typeData,
                    optional_act: [e.target.value],
                  })
                }
                className="border border-gray-300 rounded-md p-1 w-70"
                placeholder="Enter action"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <CommonButton
          variant="outlined"
          className="mt-4 p-2 rounded"
          href={route('admin.feature-comparison.index')}
        >
          Back
        </CommonButton>
        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${processingType ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={processingType}
        >
          Update
        </CommonButton>
      </div>
    </form>
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Plan Details
        </h2>
      }
    >
      <Head title="Package Details" />
      <Container>
        <div className="flex ">
          <PlanManageSidebar />
          <div className="flex-1 ">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">Plan Features Comparison</h1>

              <div className="flex justify-end gap-2">
                <CommonButton
                  onClick={handlePlanComparison}
                  variant="outlined"
                  className="flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Create Plans Comparison
                </CommonButton>
              </div>
            </div>

            <div className="bg-gray-50 rounded-t-md p-8">
              <Table
                columns={columns}
                datas={featuresComparison}
                route={route('admin.feature-comparison.index')}
              />
            </div>

            {showPopup && (
              <PlansComparison
                isOpen={showPopup}
                data={plans}
                onClose={handlePopupClose}
                features={features}
              />
            )}

            <Drawer
              isDrawerOpen={isDrawerOpen}
              onClose={handleDrawerClose}
              title="Edit Features Comparison"
              formContent={formEditContent}
            />
          </div>

          {showConfirmation && (
            <ConfirmationBox
              Question="Are you sure you want to delete this feature?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
