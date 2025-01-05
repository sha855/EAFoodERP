import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Table from '@/Components/Table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Container from '@/Components/Container';
import TableButton from '@/Components/TableButton';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import CommonButton from '@/Components/CommonButton';
import Drawer from '@/Components/Drawer';
import TextInput from '@/Components/TextInput';
import { FaMinus, FaPlus } from 'react-icons/fa';
import ConfirmationBox from '@/Components/ConfirmationBox';
import { DateTime } from 'luxon';
import CommonModal from '@/Components/CommonModal';

export default function Index({ customers = [] }: PageProps) {
  const auth: any = usePage().props.auth;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const { data, setData, post, processing, errors, reset } = useForm({
    main_customer: [{ id: 0, name: '' }],
  });

  const {
    data: dataType,
    setData: setDataType,
    put,
    processing: userProcessing,
    reset: userReset,
    errors: updateErrors,
  } = useForm({
    id: 0,
    name: '',
  });

  const handleDrawerOpen = () => {
    setIsEditMode(false);
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    reset();
    setIsDrawerOpen(false);
  };

  const allCustomerRecord = customers.data || [];

  const columns = [
    { label: 'Name', key: 'name' },
    {
      label: 'Created At',
      key: 'created_at',
      renderCell: (row: any) => (
        <span>
          {DateTime.fromISO(row.created_at).toFormat('dd-MM-yyyy, hh:mm a')}
        </span>
      ),
    },
    {
      label: 'Updated At',
      key: 'updated_at',
      renderCell: (row: any) => (
        <span>
          {DateTime.fromISO(row.updated_at).toFormat('dd-MM-yyyy, hh:mm a')}
        </span>
      ),
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (row: any) => (
        <div className="flex gap-2 justify-center">
          <TableButton variant="edit" onClick={() => handleEditClick(row)}>
            <PencilIcon className="h-5 w-5 text-blue-500" />
          </TableButton>
          <TableButton
            variant="delete"
            onClick={() => handleDeleteClick(row.id)}
          >
            <TrashIcon className="h-5 w-5 text-orange-500" />
          </TableButton>
        </div>
      ),
    },
  ];

  const handleFeatureNameChange = (index: number, value: string) => {
    const updatedFeatures = [...data.main_customer];
    updatedFeatures[index] = { ...updatedFeatures[index], name: value };
    setData((prevData: any) => ({
      ...prevData,
      main_customer: updatedFeatures,
    }));
  };

  const [customerId, setCustomerId] = useState(0);

  const handleEditClick = (mainCustomer: any) => {
    setDataType({
      id: mainCustomer.id,
      name: mainCustomer.name,
    });
    setOpen(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('admin.main-customer.store'), {
      onSuccess: () => {
        reset();
        setIsDrawerOpen(false);
      },
      onError: (errors) => {
        console.error('Error creating customer:', errors);
      },
    });
  };

  const handleSave = () => {
    put(route('admin.main-customer.update', { main_customer: customerId }), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: (errors) => {
        console.error('Error updating customer:', errors);
      },
    });
  };

  const removeFeature = (index: number) => {
    setData((prevData: any) => ({
      ...prevData,
      main_customer: prevData.main_customer.filter(
        (_: any, i: any) => i !== index
      ),
    }));
  };

  const addFeature = () => {
    setData((prevData: any) => ({
      ...prevData,
      main_customer: [...prevData.main_customer, { name: '' }],
    }));
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        {data.main_customer.map((feature, index) => (
          <div key={feature.id || index} className="mb-4">
            <label className="block text-gray-700">Main Customer</label>
            <TextInput
              type="text"
              name={`main_customer[${index}].name`}
              value={feature.name}
              onChange={(e) => handleFeatureNameChange(index, e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {(errors as any)[`main_customer.${index}.name`] && (
              <p className="text-red-500">This Field Is Required</p>
            )}

            {!isEditMode && (
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
            )}
          </div>
        ))}
        {!isEditMode && (
          <div className="flex justify-end mt-4">
            <CommonButton variant="outlined" type="button" onClick={addFeature}>
              <FaPlus />
            </CommonButton>
          </div>
        )}
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
              ? 'Update Package'
              : 'Create Package'}
        </CommonButton>
      </div>
    </form>
  );

  const handleDeleteClick = (id: any) => {
    setCustomerId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (customerId !== null) {
      router.delete(
        route('admin.main-customer.destroy', { main_customer: customerId })
      );
      setShowConfirmation(false);
      setCustomerId(0);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setCustomerId(0);
  };

  return (
    <AuthenticatedLayout auth={auth} user={auth.user}>
      <Head title="Manage Food Businesses" />

      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="flex bg-gray-100">
            <div className="w-full">
              <div className="bg-white rounded-md">
                <div className="flex justify-between items-center px-8 py-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
                  <h2 className="font-bold">Customers Group</h2>
                  <CommonButton variant="success" onClick={handleDrawerOpen}>
                    {' '}
                    Create{' '}
                  </CommonButton>
                </div>

                <div className="p-8">
                  {allCustomerRecord.length > 0 ? (
                    <Table
                      columns={columns}
                      datas={customers}
                      route={route('admin.main-customer.index')}
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      No Customers available.
                    </div>
                  )}
                </div>
                <Drawer
                  isDrawerOpen={isDrawerOpen}
                  onClose={handleDrawerClose}
                  title="Create Customers Group"
                  formContent={formContent}
                />
                <CommonModal className="!p-0" onClose={handleClose} open={open}>
                  <div className="flex justify-between items-center px-6 py-3 bg-neutral-100 rounded-t-md border-b border-neutral-200">
                    <h2 className="text-lg font-bold">Edit Customer</h2>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSave();
                    }}
                  >
                    <div className=" p-6">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 mb-1"
                      >
                        Name:
                      </label>
                      <TextInput
                        id="name"
                        type="text"
                        value={dataType.name}
                        onChange={(e) => setDataType('name', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />

                      {updateErrors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          Customer group Name is required
                        </p>
                      )}
                    </div>
                    <div className="p-3 border-t">
                      <div className="flex gap-2 justify-end">
                        <CommonButton
                          variant="outlined"
                          type="button"
                          onClick={handleClose}
                        >
                          Cancel
                        </CommonButton>
                        <CommonButton variant="success" type="submit">
                          Save
                        </CommonButton>
                      </div>
                    </div>
                  </form>
                </CommonModal>
                {showConfirmation && (
                  <ConfirmationBox
                    Question="Are you sure you want to delete this feature?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
