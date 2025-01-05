import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import TextInput from '@/Components/TextInput';
import CommonButton from '@/Components/CommonButton';
import FoodSidebar from '@/Components/FoodManagement/foodSidebar';
import Drawer from '@/Components/Drawer';
import ConfirmationBox from '@/Components/ConfirmationBox';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import Container from '@/Components/Container';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';

export default function BusinessActivity({
  foodBusinessTypes,
  businessActivity,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedType, setSelectedType] = useState({
    id: null,
    name: '',
    food_business_type_id: 0,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  let foodBusinessType: App.Data.FoodBuisness.BusinessActivityData = {
    id: 0,
    name: '',
    food_business_type_id: 0,
  };

  const {
    data: typeData,
    setData: setTypeData,
    post: postType,
    processing: processingType,
    errors: typeErrors,
  } = useForm({
    types: [foodBusinessType],
  });

  const { data, setData, put, errors } = useForm({
    id: 0,
    name: '',
    food_business_type_id: 0,
  });

  const handleAddField = () => {
    setTypeData('types', [...typeData.types, foodBusinessType]);
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
    postType(route('admin.business-activity.store'), {
      onSuccess: () => {
        setTypeData({
          types: [foodBusinessType],
        });
        setIsDrawerOpen(false);
      },
      onError: () => {
        //
      },
    });
  };

  const handleEditClick = (type: any) => {
    setData({
      id: type.id,
      name: type.name,
      food_business_type_id: parseInt(type.food_business_type_id, 10),
    });
    setIsEditPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setSelectedType({ id: null, name: '', food_business_type_id: 0 });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(
      route('admin.business-activity.update', { business_activity: data.id }),
      {
        onSuccess: () => {
          setIsEditPopupOpen(false);
        },
      }
    );
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const columns = [
    { label: 'Business Activity', key: 'name' },
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
        route('admin.business-activity.destroy', {
          business_activity: deleteId,
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

  const formContent = (
    <form onSubmit={handleSubmitType}>
      {typeData.types.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 mt-2">Name</label>
          <TextInput
            name={`types[${index}].name`}
            value={item.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {(typeErrors as any)[`types.${index}.name`] && (
            <p className="text-red-500">
              {(typeErrors as any)[`types.${index}.name`]}
            </p>
          )}

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
      <div className="flex gap-4">
        <CommonButton
          variant="outlined"
          type="button"
          onClick={handleAddField}
          className="mt-4"
        >
          Add Field
        </CommonButton>

        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${processingType ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={processingType}
        >
          {processingType ? 'Creating...' : 'Submit'}
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
          Manage Food Business Entities
        </h2>
      }
    >
      <Head title="Manage Food Businesses" />

      <Container>
        <div className="flex ">
          {notification && (
            <NotificationMessage
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          <FoodSidebar />

          <div className="flex-1  bg-white rounded-md">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">
                Additional Food Business Activity
              </h1>

              <div className="flex gap-2">
                <CommonButton
                  variant="outlined"
                  className=" p-2 rounded"
                  onClick={handleDrawerOpen}
                >
                  Create Business Activity
                </CommonButton>
              </div>
            </div>
            <div className="p-4">
              <Table
                columns={columns}
                datas={businessActivity}
                route={route('admin.business-activity.index')}
              />
            </div>
          </div>

          {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                  Edit Business Activity
                </h2>
                <form onSubmit={handleEditSubmit}>
                  <label className="block text-gray-700 mt-2">
                    Business Activity Name
                  </label>
                  <TextInput
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />

                  {errors.name && <p className="text-red-500">{errors.name}</p>}

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
                      className={`ml-2 ${processingType ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={processingType}
                    >
                      {processingType ? 'Updating...' : 'Update'}
                    </CommonButton>
                  </div>
                </form>
              </div>
            </div>
          )}

          <Drawer
            isDrawerOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            title="Create Additional Business Food Activity"
            formContent={formContent}
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
