import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import TextInput from '@/Components/TextInput';
import CommonButton from '@/Components/CommonButton';
import FoodSidebar from '@/Components/FoodManagement/foodSidebar';
import Drawer from '@/Components/Drawer';
import DataTable from '@/Components/DataTable';
import { GridColDef } from '@mui/x-data-grid';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Container from '@/Components/Container';
import { FaPlus } from 'react-icons/fa';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';

export default function BusinessUnitManagement({
  auth,
  foodBusinessTypes,
  foodBusinessUnit,
}: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const {
    data,
    setData,
    put,
    processing: processingEdit,
    errors: editErrors,
  } = useForm({
    id: '',
    name: '',
    food_business_type_id: '',
  });
  const {
    data: typeData,
    setData: setTypeData,
    post: postType,
    processing: processingType,
    errors: typeErrors,
  } = useForm({
    types: [{ name: '', food_business_type_id: '' }],
  });

  const handleAddField = () => {
    setTypeData('types', [
      ...typeData.types,
      { name: '', food_business_type_id: '' },
    ]);
  };

  const handleRemoveField = (index: number) => {
    const updatedTypes = typeData.types.filter((_, i) => i !== index);
    setTypeData('types', updatedTypes);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedTypes = [...typeData.types];
    (updatedTypes[index] as any)[field] = value;
    setTypeData('types', updatedTypes);
  };

  const handleSubmitType = (e: React.FormEvent) => {
    e.preventDefault();
    postType(route('admin.business-unit.store'), {
      onSuccess: () => {
        setTypeData({
          types: [{ name: '', food_business_type_id: '' }],
        });
        setIsDrawerOpen(false);
      },
      onError: () => {
        setIsDrawerOpen(true);
      },
    });
  };

  const handleEditClick = (type: any) => {
    setData({
      id: type.id,
      name: type.name,
      food_business_type_id: type.food_business_type_id,
    });
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setData({ id: '', name: '', food_business_type_id: '' });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.business-unit.update', { business_unit: data.id }), {
      onSuccess: () => {
        setIsEditPopupOpen(false);
      },
      onError: () => {
        setIsEditPopupOpen(true);
      },
    });
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const columns = [
    { label: 'Unit Name', key: 'name' },
    {
      label: 'Food Buisness Type',
      key: 'food_business_type',
      renderCell: (params: any) => <span>{params.business_type?.name}</span>,
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
    if (deleteId !== null) {
      router.delete(
        route('admin.business-unit.destroy', { business_unit: deleteId })
      );
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
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Manage Food Business Unit
        </h2>
      }
    >
      <Head title="Manage Food Businesses" />
      <Container>
        <div className="flex">
          {notification && (
            <NotificationMessage
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          <FoodSidebar />
          <div className="flex-1">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              {/* Left Item */}
              <h1 className="text-xl font-bold">Food Business Unit</h1>

              {/* Right Items */}
              <CommonButton
                variant="outlined"
                className=" p-2 rounded flex gap-2 justify-center items-center"
                onClick={handleDrawerOpen}
              >
                <FaPlus />
                Create Food Business Unit
              </CommonButton>
            </div>
            <div className="bg-gray-50 rounded-t-md p-8">
              <Table
                columns={columns}
                datas={foodBusinessUnit}
                route={route('admin.business-unit.index')}
              />
            </div>
          </div>

          {/* Edit Popup */}
          {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                  Edit Food Business Unit
                </h2>
                <form onSubmit={handleEditSubmit}>
                  <label className="block text-gray-700">
                    Business Type Name
                  </label>
                  <select
                    value={data.food_business_type_id}
                    onChange={(e) =>
                      setData('food_business_type_id', e.target.value)
                    }
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    <option value="">Select a business type</option>
                    {foodBusinessTypes.map((type: any) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>

                  {editErrors.food_business_type_id && (
                    <p className="text-red-500">
                      {editErrors.food_business_type_id}
                    </p>
                  )}

                  <label className="block text-gray-700 mt-2">
                    Food Business Unit
                  </label>
                  <TextInput
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />

                  {editErrors.name && (
                    <p className="text-red-500">{editErrors.name}</p>
                  )}

                  <div className="flex justify-end mt-4">
                    <CommonButton
                      variant="outlined"
                      type="button"
                      onClick={handleClosePopup}
                    >
                      Cancel
                    </CommonButton>
                    <CommonButton
                      variant="success"
                      type="submit"
                      className={`ml-2 ${
                        processingEdit ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      disabled={processingEdit}
                    >
                      {processingEdit ? 'Updating...' : 'Update'}
                    </CommonButton>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Drawer for Creating New Unit */}
          <Drawer
            isDrawerOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            title="Create Business Unit"
            formContent={
              <form onSubmit={handleSubmitType}>
                {typeData.types.map((item, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-gray-700">Business Type</label>
                    <select
                      value={item.food_business_type_id}
                      onChange={(e) =>
                        handleChange(
                          index,
                          'food_business_type_id',
                          e.target.value
                        )
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                      required
                    >
                      <option value="">Select a business type</option>
                      {foodBusinessTypes.map((type: any) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>

                    <label className="block text-gray-700 mt-2">
                      Unit Name
                    </label>
                    <TextInput
                      name="name"
                      value={item.name}
                      onChange={(e) =>
                        handleChange(index, 'name', e.target.value)
                      }
                      className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />

                    <CommonButton
                      variant="text"
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="mt-2"
                    >
                      <TrashIcon className="h-5 w-5 text-orange-500" />
                    </CommonButton>
                  </div>
                ))}

                <div className="flex justify-between">
                  <CommonButton variant="outlined" onClick={handleAddField}>
                    Add Another Type
                  </CommonButton>
                  <CommonButton
                    variant="success"
                    type="submit"
                    disabled={processingType}
                  >
                    {processingType ? 'Creating...' : 'Create'}
                  </CommonButton>
                </div>
              </form>
            }
          />

          {showConfirmation && (
            <ConfirmationBox
              Question="Are you sure want to delete this audit?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
