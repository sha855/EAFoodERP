import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState, useEffect, FormEventHandler } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import TableButton from '@/Components/TableButton';
import {
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid';
import ConfirmationBox from '@/Components/ConfirmationBox';
import Container from '@/Components/Container';
import Table from '@/Components/Table';
import CommonButton from '@/Components/CommonButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import {
  FormControlLabel,
  Radio,
  Select,
  FormControl,
  MenuItem as MuiMenuItem,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { PiBuildingOfficeLight } from 'react-icons/pi';

export default function Users({
  auth,
  users,
  businessTypes,
  countries,
  countryCodes,
  employeeOptions,
  locationOptions,
}: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userId, setDeleteId] = useState<number | null>(null);
  const [states, setStates] = useState<{ code: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [stdCodes, setStdCodes] = useState(countryCodes || []);

  const [countryOptions, setCountryOptions] = useState<[string, string][]>([]);
  const fetchStates = async (code: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/country-state/${code}`);
      const result = response.data;
      if (typeof result === 'object' && result !== null) {
        const stateArray = Object.keys(result).map((key) => ({
          code: key,
          name: result[key],
        }));
        setStates(stateArray);
      } else {
        setStates([]);
      }
    } catch (error) {
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value;
    setData({ ...data, country_name: selectedCountry, state: '' });
    fetchStates(selectedCountry);
  };

  useEffect(() => {
    const countryArray = Object.entries(countries) as [string, string][];
    setCountryOptions(countryArray);
  }, [countries]);

  const { data, setData, post, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    company_name: '',
    business_type_id: '',
    country_name: '',
    state: '',
    total_no_of_employees: '',
    total_no_of_business_locations: '',
    std_code: '',
    phone_no: '',
    remember: false,
  });

  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phone_no' },
    {
      label: 'Is Verified',
      key: 'is_verified',
      renderCell: (params: any) =>
        params.email_verified_at ? (
          <CheckCircleIcon
            className="h-5 w-5 text-green-500 mt-4"
            aria-hidden="true"
          />
        ) : (
          <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        ),
    },
    {
      label: '',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2 justify-center items-center">
          <TableButton
            variant="edit"
            onClick={() =>
              router.get(route('admin.users.edit', { user: params.id }))
            }
          >
            <PencilIcon className="h-5 w-5 " aria-hidden="true" />
          </TableButton>

          <TableButton
            variant="delete"
            onClick={() =>
              router.get(route('admin.users.show', { user: params.id }))
            }
          >
            <EyeIcon className="h-5 w-5" aria-hidden="true" />
          </TableButton>

          <TableButton
            variant="delete"
            onClick={() => handleDeleteClick(Number(params.id))}
          >
            <TrashIcon className="h-5 w-5 " aria-hidden="true" />
          </TableButton>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (userId: number) => {
    if (typeof userId !== 'number') {
      return;
    }
    setDeleteId(userId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (userId !== null) {
      router.delete(route('admin.users.destroy', { user: userId }), {
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

  const [open, setOpen] = useState(false);

  const [error, setError] = useState({});
  const toggleModal = () => setOpen(!open);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('admin.new.user.create'), {
      onSuccess: () => {
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Management
        </h2>
      }
    >
      <Head title="User Management" />

      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="flex">
            {notification && (
              <NotificationMessage
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}

            <div className="flex-1  bg-gray-50 rounded-md">
              <div className=" flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
                <h1 className="text-xl font-bold ">User Management</h1>
                <div className="flex justify-end gap-2">
                  <CommonButton onClick={toggleModal} variant="outlined">
                    Create User
                  </CommonButton>
                </div>
              </div>
              <div className="p-4 rounded-b-md bg-white">
                <Table
                  columns={columns}
                  datas={users}
                  route={route('admin.users.index')}
                />
              </div>
            </div>
            {showConfirmation && (
              <ConfirmationBox
                Question="Are you sure want to delete this audit?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
          </div>

          {open && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
                onClick={toggleModal}
              />
              <div className="fixed inset-0 flex items-center justify-center z-[999]">
                <div className="bg-white rounded-lg shadow-lg  max-w-3xl w-full mx-4">
                  <h2 className="text-xl font-semibold py-5 px-8 bg-neutral-100 border-b border-neutral-200 rounded-t-lg">
                    Create New User
                  </h2>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block font-medium text-sm text-gray-700 mb-1">
                          Name
                        </label>
                        <TextInput
                          type="text"
                          name="name"
                          value={data.name}
                          placeholder="Enter Name"
                          onChange={handleChange}
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300  bg-white"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block font-medium text-sm text-gray-700 mb-1">
                          Email
                        </label>
                        <TextInput
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                          placeholder="Enter Email Id"
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300  bg-white"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Password fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="mt-4 w-full">
                        <label className="block font-medium text-sm text-gray-700 mb-1">
                          Password
                        </label>
                        <TextInput
                          id="password"
                          type="password"
                          name="password"
                          value={data.password}
                          autoComplete="new-password"
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300  bg-white"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm">
                            {errors.password}
                          </p>
                        )}
                      </div>
                      <div className="mt-4 w-full">
                        <label className="block font-medium text-sm text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <TextInput
                          id="password_confirmation"
                          type="password"
                          name="password_confirmation"
                          value={data.password_confirmation}
                          autoComplete="new-password"
                          onChange={handleChange}
                          required
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300  bg-white"
                        />
                        {errors.password_confirmation && (
                          <p className="text-red-500 text-sm">
                            {errors.password_confirmation}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-11 gap-6 mb-6">
                      <div className="col-span-2">
                        <InputLabel
                          htmlFor="stdCode"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          STD Code
                        </InputLabel>

                        <select
                          id="country"
                          value={data.std_code}
                          onChange={(e) =>
                            setData({ ...data, std_code: e.target.value })
                          }
                          className="block w-full border border-gray-300 rounded-md p-2"
                        >
                          {stdCodes.map(
                            ({
                              id,
                              stdcode,
                            }: {
                              id: number;
                              stdcode: number;
                            }) => (
                              <option key={id} value={stdcode}>
                                {stdcode}
                              </option>
                            )
                          )}
                        </select>

                        {errors.std_code && (
                          <p className="text-red-500 text-sm">
                            {errors.std_code}
                          </p>
                        )}
                      </div>
                      <div className="col-span-9">
                        <label className="block font-medium !text-sm text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <TextInput
                          type="number"
                          name="phone"
                          value={data.phone_no}
                          onChange={(e) =>
                            setData({ ...data, phone_no: e.target.value })
                          }
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300  bg-white"
                          placeholder="Phone Number"
                        />
                        {errors.phone_no && (
                          <p className="text-red-500 text-sm">
                            {errors.phone_no}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <InputLabel
                          htmlFor="country"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          Country
                        </InputLabel>
                        <Select
                          id="country"
                          value={data.country_name}
                          onChange={handleCountryChange}
                          displayEmpty
                          style={{ maxHeight: '51px', border: '0' }}
                          className="block w-full border border-gray-300 rounded-md"
                        >
                          <MuiMenuItem value="" disabled>
                            Select Country
                          </MuiMenuItem>
                          {countryOptions.map(([code, name]) => (
                            <MuiMenuItem key={code} value={code}>
                              {name}
                            </MuiMenuItem>
                          ))}
                        </Select>
                        {errors?.country_name && (
                          <p className="text-red-500 text-sm">
                            {errors.country_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <InputLabel
                          htmlFor="state"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          State
                        </InputLabel>
                        {loading ? (
                          <CircularProgress />
                        ) : (
                          <FormControl fullWidth>
                            <Select
                              id="state"
                              value={data.state}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  state: e.target.value,
                                })
                              }
                              style={{ maxHeight: '51px', border: '0' }}
                              displayEmpty
                              className="block w-full border border-gray-300 rounded-md"
                            >
                              <MuiMenuItem value="" disabled>
                                Select State
                              </MuiMenuItem>
                              {states.map((state) => (
                                <MuiMenuItem
                                  key={state.code}
                                  value={state.code}
                                >
                                  {state.name}
                                </MuiMenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                        {errors?.state && (
                          <p className="text-red-500 text-sm">{errors.state}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block font-medium text-sm text-gray-700 mb-1">
                          Company Name
                        </label>
                        <TextInput
                          type="text"
                          name="company_name"
                          value={data.company_name}
                          placeholder="Enter  Company Name"
                          onChange={handleChange}
                          className="w-full p-3 border rounded focus:outline-none !border-zinc-300	 bg-white"
                        />
                        {errors.company_name && (
                          <p className="text-red-500 text-sm">
                            {errors.company_name}
                          </p>
                        )}
                      </div>
                      <div>
                        <InputLabel
                          htmlFor="businessType"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          Business Type
                        </InputLabel>
                        <Select
                          id="businessType"
                          value={data.business_type_id}
                          onChange={(e) =>
                            setData({
                              ...data,
                              business_type_id: e.target.value,
                            })
                          }
                          displayEmpty
                          style={{ maxHeight: '51px', border: '0' }}
                          className="block w-full border border-gray-200 rounded-md bg-white"
                        >
                          <MuiMenuItem value="" disabled>
                            Select Business Type
                          </MuiMenuItem>
                          {businessTypes.map((type: any) => (
                            <MuiMenuItem key={type.id} value={type.id}>
                              {type.name}
                            </MuiMenuItem>
                          ))}
                        </Select>
                        {errors?.business_type_id && (
                          <p className="text-red-500 text-sm">
                            {errors.business_type_id}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <InputLabel
                          htmlFor="totalEmployees"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          Total Employees
                        </InputLabel>
                        <div
                          id="totalEmployees"
                          className="grid grid-cols-3 gap-2"
                        >
                          {employeeOptions.map((option: any) => (
                            <FormControlLabel
                              key={option}
                              classes={{ label: '!text-sm', root: 'radio-bg' }}
                              control={
                                <Radio
                                  className="!p-0"
                                  checked={
                                    data.total_no_of_employees === option
                                  }
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      total_no_of_employees: e.target.value,
                                    })
                                  }
                                  value={option}
                                  name="totalEmployees"
                                  color="primary"
                                />
                              }
                              label={option}
                            />
                          ))}
                        </div>
                        {errors?.total_no_of_employees && (
                          <p className="text-red-500 text-sm">
                            {errors.total_no_of_employees}
                          </p>
                        )}
                      </div>
                      <div>
                        <InputLabel
                          htmlFor="totalLocations"
                          className="block font-medium text-gray-700 text-base mb-2"
                        >
                          Total Locations
                        </InputLabel>
                        <div
                          id="totalLocations"
                          className="grid grid-cols-3 gap-2"
                        >
                          {locationOptions.map((option: any) => (
                            <FormControlLabel
                              classes={{ label: '!text-sm', root: 'radio-bg' }}
                              key={option}
                              control={
                                <Radio
                                  className="!p-0"
                                  checked={
                                    data.total_no_of_business_locations ===
                                    option
                                  }
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      total_no_of_business_locations:
                                        e.target.value,
                                    })
                                  }
                                  value={option}
                                  name="totalLocations"
                                  color="primary"
                                />
                              }
                              label={option}
                            />
                          ))}
                        </div>
                        {errors?.total_no_of_business_locations && (
                          <p className="text-red-500 text-sm">
                            {errors.total_no_of_business_locations}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex justify-end gap-4 bg-neutral-100 border-t border-neutral-200 rounded-b-lg">
                    <CommonButton onClick={toggleModal} variant="outlined">
                      Cancel
                    </CommonButton>
                    <CommonButton onClick={handleSubmit} variant="success">
                      Submit
                    </CommonButton>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
