import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import CommonButton from '@/Components/CommonButton';
import Container from '@/Components/Container';
import { FaPlus } from 'react-icons/fa';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';
import Drawer from '@/Components/Drawer';
import CreatePackage from '@/Components/Form/CreatePackage';
import PackageManagementSidebar from '@/Components/Admin/PlanManageSidebar';
import CreatePackageFeature from '@/Components/Form/CreatePackageFeature';
import TextInput from '@/Components/TextInput';
import PlanManagementSidebar from '@/Components/Admin/PlanManageSidebar';
import PlanManageSidebar from '@/Components/Admin/PlanManageSidebar';
import PlansComparison from '@/Components/Modal/PlansComparison';

export default function Features({
  features,
  featuresHeading,
  plans,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [packageId, setDeleteId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    id: 0,
    feature_heading: '',
    features: [{ feature_name: '', feature_description: '' }],
  });

  const {
    data: typeData,
    setData: setTypeData,
    put,
    processing: processingType,
    errors: typeErrors,
  } = useForm({
    id: 0,
    feature_heading_id: 0,
    feature_name: '',
    feature_description: '',
  });

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleEditDrawerClose = () => {
    setIsEditDrawerOpen(false);
  };

  const columns = [
    { label: 'Feature Name', key: 'feature_name' },
    {
      label: 'Feature Heading',
      key: 'feature_heading',
      renderCell: (params: any) => (
        <span>{params.feature_heading?.feature_heading}</span>
      ),
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
      router.delete(route('admin.features.destroy', { feature: packageId }));
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleEditClick = (packageData: any) => {
    setIsEditMode(true);
    setCurrentPackageId(packageData.id);
    setTypeData({
      id: packageData.id,
      feature_heading_id: packageData.feature_heading?.id,
      feature_name: packageData.feature_name,
      feature_description: packageData.feature_description,
    });
    setIsEditDrawerOpen(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isEditMode && currentPackageId) {
      put(route('admin.features.update', { feature: currentPackageId }), {
        onError: () => {
          setIsEditDrawerOpen(true);
        },
        onSuccess: () => {
          setIsEditDrawerOpen(false);
        },
      });
    } else {
      post(route('admin.features.store'), {
        onError: () => {
          setIsDrawerOpen(true);
        },
        onSuccess: () => {
          setIsDrawerOpen(false);
          reset();
        },
      });
    }
  };

  const formContent = (
    <CreatePackageFeature
      handleSubmit={handleSubmit}
      processing={processing}
      errors={errors}
      data={data}
      setData={setData}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      featureHeading={featuresHeading}
      plans={plans}
    />
  );

  const handleSelectChange = (e: any) => {
    setTypeData({
      ...typeData,
      feature_heading_id: Number(e.target.value),
    });
  };

  const EditformContent = (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Feature Heading</label>
          <select
            name="feature_heading_id"
            value={Number(typeData.feature_heading_id)}
            onChange={handleSelectChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled>
              Select a feature heading
            </option>
            {featuresHeading.map((heading: any) => (
              <option key={heading.id} value={heading.id}>
                {heading.feature_heading}
              </option>
            ))}
          </select>
          {errors.feature_heading && (
            <p className="text-red-500">{errors.feature_heading}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Package Feature</label>
          <TextInput
            type="text"
            name="feature_name"
            value={typeData.feature_name}
            onChange={(e) => setTypeData('feature_name', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          <label className="block text-gray-700 mt-2">Description</label>
          <textarea
            name="feature_description"
            value={typeData.feature_description}
            onChange={(e) => setTypeData('feature_description', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {typeErrors.feature_description && (
            <p className="text-red-500">{typeErrors.feature_description}</p>
          )}
          {typeErrors.feature_name && (
            <p className="text-red-500">{typeErrors.feature_name}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <CommonButton
          variant="outlined"
          className="mt-4 p-2 rounded"
          href={route('admin.membership.index')}
        >
          Back
        </CommonButton>
        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={processing}
        >
          {processing
            ? isEditMode
              ? 'Updating...'
              : 'Creating...'
            : isEditMode
              ? 'Update Feature'
              : 'Create Feature'}
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
              <h1 className="text-xl font-bold">Plan Features</h1>
              <div className="flex justify-end gap-2">
                <CommonButton
                  onClick={handleDrawerOpen}
                  variant="success"
                  className="flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Create Plans Feature
                </CommonButton>
              </div>
            </div>
            <div className="bg-gray-50 rounded-t-md p-8">
              <Table
                columns={columns}
                datas={features}
                route={route('admin.features.index')}
              />
            </div>

            <Drawer
              isDrawerOpen={isDrawerOpen}
              onClose={handleDrawerClose}
              title="Create Plan Features"
              formContent={formContent}
            />

            <Drawer
              isDrawerOpen={isEditDrawerOpen}
              onClose={handleEditDrawerClose}
              title="Update Plan Feature"
              formContent={EditformContent}
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
