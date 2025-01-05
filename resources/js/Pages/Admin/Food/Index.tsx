import { GridColDef } from '@mui/x-data-grid';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import CommonButton from '@/Components/CommonButton';
import Drawer from '@/Components/Drawer';
import FoodSidebar from '@/Components/FoodManagement/foodSidebar';
import TextInput from '@/Components/TextInput';
import DataTable from '@/Components/DataTable';
import { EyeIcon, TrashIcon, PencilIcon } from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Container from '@/Components/Container';
import { FaPlus } from 'react-icons/fa';
import TableButton from '@/Components/TableButton';
import Table from '@/Components/Table';

export default function FoodBusinessManagement({
  foodBusinessTypes,
}: PageProps) {
  const auth: any = usePage().props.auth;

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedType, setSelectedType] = useState({
    id: null,
    name: '',
    description: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  let foodBusinessType: App.Data.FoodBuisness.FoodBusinessTypeData = {
    id: 0,
    name: '',
    description: '',
  };

  const {
    data: typeData,
    setData: setTypeData,
    post: postType,
    processing: processingType,
    errors: typeErrors,
  } = useForm({
    food_business_types: [foodBusinessType],
  });

  const { data, setData, put, errors } = useForm({
    id: 0,
    name: '',
    description: '',
  });
  const handleAddField = () => {
    setTypeData('food_business_types', [
      ...typeData.food_business_types,
      foodBusinessType,
    ]);
  };

  const handleRemoveField = (index: number) => {
    const updatedTypes = typeData.food_business_types.filter(
      (_, i) => i !== index
    );
    setTypeData('food_business_types', updatedTypes);
  };

  const handleChange = (index: number, field: string, value: string) => {
    const updatedTypes = [...typeData.food_business_types];
    (updatedTypes[index] as any)[field] = value;
    setTypeData('food_business_types', updatedTypes);
  };

  const handleSubmitType = (e: React.FormEvent) => {
    e.preventDefault();
    postType(route('admin.food.store'), {
      onSuccess: () => {
        setTypeData({
          food_business_types: [foodBusinessType],
        });
        setIsDrawerOpen(false);
      },
      onError: () => {
        setIsDrawerOpen(true);
      },
    });
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleEditClick = (type: any) => {
    setData({
      id: type.id,
      name: type.name,
      description: type.description,
    });
    setIsEditPopupOpen(true);
  };

  const columns = [
    { label: 'Name', key: 'name' },
    {
      label: 'Description',
      key: 'description',
      renderCell: (params: any) => {
        const isExpanded = false;
        const [expand, setExpand] = useState(false);
        return (
          <div className="max-w-xs">
            <p className={!expand ? 'truncate' : 'h-fit'}>
              {isExpanded
                ? params.description
                : `${params.description.slice(0, !expand ? 100 : params.description?.length)}
                `}
            </p>
            {params.description.length > 100 && (
              <button
                className="text-blue-500 hover:underline mt-1 text-sm"
                onClick={() => setExpand(!expand)}
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        );
      },
    },
    {
      label: '',
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
          <TableButton
            variant="view"
            onClick={() =>
              router.get(route('admin.food.show', { food: params.id }))
            }
          >
            <EyeIcon className="h-5 w-5 text-black-500" />
          </TableButton>
        </div>
      ),
    },
  ];
  const handleClosePopup = () => {
    setIsEditPopupOpen(false);
    setSelectedType({ id: null, name: '', description: '' });
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    put(route('admin.food.update', { food: data.id }), {
      onSuccess: () => {
        setIsEditPopupOpen(false);
      },
      onError: () => {
        setIsEditPopupOpen(true);
      },
    });
  };

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('admin.food.destroy', { food: deleteId }));
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
      {typeData.food_business_types.map((item, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700">Name</label>
          <TextInput
            type="text"
            name={`food_business_types[${index}].name`}
            value={item.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {(typeErrors as any)[`food_business_types.${index}.name`] && (
            <p className="text-red-500">
              {(typeErrors as any)[`food_business_types.${index}.name`]}
            </p>
          )}

          <label className="block text-gray-700 mt-2">Description</label>
          <textarea
            name={`food_business_types[${index}].description`}
            value={item.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {(typeErrors as any)[`food_business_types.${index}.description`] && (
            <p className="text-red-500">
              {(typeErrors as any)[`food_business_types.${index}.description`]}
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
          Add Business Type Field
        </CommonButton>

        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${processingType ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={processingType}
        >
          {processingType ? 'Creating...' : 'Submit Business Types'}
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
                Food Business Type Management
              </h1>
              <div>
                <CommonButton
                  variant="outlined"
                  className=" p-2 rounded flex items-center gap-2"
                  onClick={handleDrawerOpen}
                >
                  <FaPlus />
                  Create Food Business Type
                </CommonButton>
              </div>
            </div>
            <div className="p-4">
              <Table
                columns={columns}
                datas={foodBusinessTypes}
                route={route('admin.food.index')}
              />
            </div>
          </div>
          <Drawer
            isDrawerOpen={isDrawerOpen}
            onClose={handleDrawerClose}
            title="Create Food Business Type"
            formContent={formContent}
          />
          {isEditPopupOpen && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-xl font-bold mb-4">
                  Edit Food Business Type
                </h2>
                <form onSubmit={handleEditSubmit}>
                  <label className="block text-gray-700">Name</label>
                  <TextInput
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />

                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                  <label className="block text-gray-700 mt-2">
                    Description
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />

                  {errors.description && (
                    <p className="text-red-500">{errors.description}</p>
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
