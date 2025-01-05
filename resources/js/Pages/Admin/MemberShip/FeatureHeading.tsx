import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import CommonButton from '@/Components/CommonButton';
import Container from '@/Components/Container';
import { FaMinus, FaPlus } from 'react-icons/fa';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';
import Drawer from '@/Components/Drawer';
import TextInput from '@/Components/TextInput';
import PlanManageSidebar from '@/Components/Admin/PlanManageSidebar';

export default function FeatureHeading({ featuresHeading }: PageProps) {
  const auth: any = usePage().props.auth;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    feature_heading: [{ id: 0, feature_heading: '' }],
  });

  const {
    data: dataType,
    setData: setDataType,
    put,
    errors: editErrors,
    reset: editReset,
  } = useForm({
    id: 0,
    feature_heading: '',
  });

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    reset();
    setIsDrawerOpen(false);
  };

  const columns = [
    { label: 'Feature Heading', key: 'feature_heading' },
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
    if (deleteId !== null) {
      router.delete(
        route('admin.feature-heading.destroy', { feature_heading: deleteId })
      );
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const removeFeature = (index: number) => {
    setData((prevData: any) => ({
      ...prevData,
      feature_heading: prevData.feature_heading.filter(
        (_: any, i: any) => i !== index
      ),
    }));
  };

  const addFeature = () => {
    setData((prevData: any) => ({
      ...prevData,
      feature_heading: [...prevData.feature_heading, { feature_heading: '' }],
    }));
  };

  const handleFeatureNameChange = (index: number, value: string) => {
    const updatedFeatures = [...data.feature_heading];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      feature_heading: value,
    };
    setData((prevData: any) => ({
      ...prevData,
      feature_heading: updatedFeatures,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isPopupOpen && currentPackageId) {
      put(
        route('admin.feature-heading.update', {
          feature_heading: currentPackageId,
        })
      );
      editReset();
      setPopupOpen(false);
    } else {
      post(route('admin.feature-heading.store'), {
        onSuccess: () => {
          reset();
          setIsDrawerOpen(false);
        },
      });
    }
  };

  const handleEditClick = (packageData: any) => {
    setPopupOpen(true);
    setCurrentPackageId(packageData.id);
    setIsEditMode(true);
    setDataType({
      id: packageData.id,
      feature_heading: packageData.feature_heading,
    });
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        {data.feature_heading.map((feature, index) => (
          <div key={feature.id || index} className="mb-4">
            <label className="block text-gray-700">Feature Heading</label>
            <TextInput
              type="text"
              name={`feature_heading[${index}].feature_heading`}
              value={feature.feature_heading}
              onChange={(e) => handleFeatureNameChange(index, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {(errors as any)[`feature_heading.${index}.feature_heading`] && (
              <p className="text-red-500">This Field Is Required</p>
            )}
            <div className="flex justify-between mt-2">
              <CommonButton
                variant="outlined"
                type="button"
                onClick={() => removeFeature(index)}
                className="flex items-center"
              >
                <FaMinus className="mr-1" />
              </CommonButton>
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <CommonButton variant="outlined" type="button" onClick={addFeature}>
            <FaPlus />
          </CommonButton>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <CommonButton
          variant="outlined"
          className="mt-4 p-2 rounded"
          href={route('admin.feature-heading.index')}
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
              ? 'Update Package'
              : 'Create Package'}
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
          <div className="flex-1  ">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">Plan Features Heading</h1>
              <div className="flex justify-end gap-2">
                <CommonButton
                  onClick={handleDrawerOpen}
                  variant="outlined"
                  className="flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Create Feature Heading
                </CommonButton>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-b-md">
              <Table
                columns={columns}
                datas={featuresHeading}
                route={route('admin.feature-heading.index')}
              />
            </div>
            <Drawer
              isDrawerOpen={isDrawerOpen}
              onClose={handleDrawerClose}
              title="Create Feature Heading"
              formContent={formContent}
            />
            {isPopupOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
                <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-auto">
                  <h2 className="text-xl font-semibold mb-4">
                    Edit Feature Heading
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Feature Heading
                      </label>
                      <TextInput
                        type="text"
                        value={dataType.feature_heading}
                        onChange={(e) =>
                          setDataType('feature_heading', e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                      {editErrors.feature_heading && (
                        <p className="text-red-500 text-sm mt-1">
                          {editErrors.feature_heading}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                      <CommonButton
                        type="button"
                        variant="outlined"
                        onClick={() => {
                          setPopupOpen(false);
                          editReset();
                          setIsEditMode(false);
                        }}
                      >
                        Cancel
                      </CommonButton>
                      <CommonButton type="submit" variant="success">
                        Update
                      </CommonButton>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {showConfirmation && (
              <ConfirmationBox
                Question="Are you sure you want to delete this feature?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
