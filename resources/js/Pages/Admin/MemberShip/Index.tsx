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
import PlanManageSidebar from '@/Components/Admin/PlanManageSidebar';

export default function MembershipIndex({ packages }: PageProps) {
  const auth: any = usePage().props.auth;

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [packageId, setDeleteId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPackageId, setCurrentPackageId] = useState(null);

  const { data, setData, post, put, processing, errors, reset } = useForm({
    id: 0,
    name: '',
    description: '',
    annually_price: '',
    monthly_price: '',
    annually_discounted_price: '',
    monthly_discounted_price: '',
    package_type: '',
    member_limit: '',
    is_trial: false,
    details: '',
    monthly: false,
    yearly: false,
    yearly_saving: '',
    is_recommended: false,
  });

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    reset();
    setIsEditMode(false);
    setIsDrawerOpen(false);
  };

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'description' },
    { label: 'Annual Price', key: 'annually_price' },
    { label: 'Monthly Price', key: 'monthly_price' },

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
        route('admin.membership.destroy', { membership: packageId }),
        {
          onSuccess: () => {
            setNotification({
              message: 'Package deleted successfully',
              type: 'success',
            });
          },
          onError: () => {
            setNotification({
              message: 'Error deleting package',
              type: 'error',
            });
          },
        }
      );
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const handleCKEditorChange = (event: any, editor: any) => {
    const content = editor.getData();
    setData('details', content);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isEditMode && currentPackageId) {
      put(route('admin.membership.update', { membership: currentPackageId }), {
        onSuccess: () => {
          setNotification({
            message: 'Plan updated successfully',
            type: 'success',
          });
          resetForm();
          setIsDrawerOpen(false);
        },
        onError: () => {
          setNotification({ message: 'Error updating package', type: 'error' });
        },
      });
    } else {
      post(route('admin.membership.store'), {
        onSuccess: () => {
          setIsDrawerOpen(false);
        },
      });
    }
  };

  const resetForm = () => {
    reset();
    setIsEditMode(false);
    setCurrentPackageId(null);
  };

  const handleEditClick = (packageData: any) => {
    setIsEditMode(true);
    setCurrentPackageId(packageData.id);
    setData({
      id: packageData.id,
      name: packageData.name,
      description: packageData.description,
      annually_price: packageData.annually_price,
      monthly_price: packageData.monthly_price,
      annually_discounted_price: packageData.annually_discounted_price,
      monthly_discounted_price: packageData.monthly_discounted_price,
      package_type: packageData.package_type,
      member_limit: packageData.member_limit,
      is_trial: packageData.is_trial,
      details: packageData.details[0]?.details,
      monthly: packageData.monthly,
      yearly: packageData.yearly,
      yearly_saving: packageData.yearly_saving,
      is_recommended: packageData.is_recommended,
    });
    setIsDrawerOpen(true);
  };

  const formContent = (
    <CreatePackage
      handleSubmit={handleSubmit}
      handleCKEditorChange={handleCKEditorChange}
      processing={processing}
      errors={errors}
      data={data}
      setData={setData}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
    />
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Package Details
        </h2>
      }
    >
      <Head title="Package Details" />
      <Container>
        <div className="flex ">
          {notification && (
            <NotificationMessage
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          <PlanManageSidebar />

          <div className="flex-1  bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">Plans</h1>

              <div className="flex justify-end gap-2">
                <CommonButton
                  onClick={handleDrawerOpen}
                  variant="success"
                  className="flex justify-center items-center gap-2"
                >
                  <FaPlus />
                  Create Plans
                </CommonButton>
              </div>
            </div>

            <div className="p-8">
              <Table
                columns={columns}
                datas={packages}
                route={route('admin.membership.index')}
              />
            </div>
          </div>
          {showConfirmation && (
            <ConfirmationBox
              Question="Are you sure you want to delete this plan?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <Drawer
            isDrawerOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            title={isEditMode ? 'Update Plans' : 'Create Plans'}
            formContent={formContent}
          />
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
