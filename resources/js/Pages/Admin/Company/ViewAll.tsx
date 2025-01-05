import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Table from '@/Components/Table';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Container from '@/Components/Container';
import TableButton from '@/Components/TableButton';
import CommonButton from '@/Components/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import NewCompanyCreate from '@/Components/Form/NewCompanyCreate';
import { PencilIcon, Trash } from 'lucide-react';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid';

export default function ViewAll({
  auth,
  dateFormat,
  user,
  foodBusinessType,
  countries,
  volumeUnit,
  weightUnits,
  temperatureUnit,
  monitoring,
  temperaturePrefill,
  companies = [],
}: PageProps) {
  const allCompanyRecord = companies.data || [];
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  type FormDataKeys =
    | 'company_name'
    | 'country_name'
    | 'registration_number'
    | 'vat_no'
    | 'address'
    | 'email'
    | 'preferred_language'
    | 'volume_units'
    | 'weight_units'
    | 'temperature_unit'
    | 'monitoring'
    | 'temperature_prefill'
    | 'date_format';

  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    company_name: '',
    country_name: '',
    registration_number: '',
    vat_no: '',
    address: '',
    email: '',
    preferred_language: '',
    volume_units: '',
    weight_units: '',
    temperature_unit: '',
    monitoring: '',
    temperature_prefill: '',
    date_format: '',
    business_type_id: '',
  });

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const Setup =
    translationData['Validation.SetupCompany'] ||
    translationData['Validation.SetupCompany'] ||
    {};
  const translations = { ...Setup };

  const columns = [
    { label: 'Company', key: 'company_name' },
    { label: 'Email', key: 'email' },
    { label: 'Country', key: 'country_name' },
    { label: 'Registration', key: 'registration_number' },
    { label: 'Total Employees', key: 'total_no_of_employees' },
    { label: 'Total Location', key: 'total_no_of_business_locations' },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (row: any) => (
        <div className="flex gap-2 justify-center">
          <TableButton
            variant="edit"
            onClick={() =>
              router.get(route('admin.company.edit', { company: row.id }))
            }
          >
            <PencilIcon />
          </TableButton>
          <TableButton
            variant="delete"
            onClick={() =>
              router.delete(
                route('admin.setup.companies.delete', { company: row.id })
              )
            }
          >
            <Trash />
          </TableButton>

          <TableButton
            variant="view"
            onClick={() =>
              router.get(route('admin.company.detail', { company: row.id }))
            }
          >
            <VisibilityIcon />
          </TableButton>

          <TableButton
            variant="success"
            onClick={() =>
              router.post(route('admin.users.impersonate', { company: row.id }))
            }
          >
            <ArrowRightOnRectangleIcon
              className="h-5 w-5 "
              aria-hidden="true"
            />
          </TableButton>
        </div>
      ),
    },
  ];

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setData('country_name', event.target.value);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData(name as FormDataKeys, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('setup.companies.submit'), {
      onSuccess: () => {
        setShowModal(false);
      },
    });
  };

  return (
    <AuthenticatedLayout auth={auth} user={auth.user}>
      <Head title="Manage Food Businesses" />

      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="flex bg-gray-100">
            <div className="w-full">
              <div className="bg-white rounded-md">
                <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
                  <h2 className="font-bold">All Companies</h2>

                  <CommonButton onClick={toggleModal} variant="success">
                    <AddIcon /> Add New
                  </CommonButton>
                </div>

                <div className="p-8">
                  {allCompanyRecord.length > 0 ? (
                    <Table
                      columns={columns}
                      datas={companies}
                      route={route('admin.all.companies')}
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      No companies available.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showModal && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-[9999] overflow-y-auto">
                <div className="bg-white  rounded-lg shadow-lg max-w-3xl w-full h-auto max-h-[90vh] grid grid-cols-1 gap-4 mt-6 overflow-y-auto relative">
                  <div className="px-8 py-4 bg-gray-100">
                    <CommonButton
                      className="absolute top-4 !p-1 right-4 text-gray-500 hover:text-gray-800"
                      onClick={toggleModal}
                      aria-label="Close"
                      variant="text"
                    >
                      <CloseIcon />
                    </CommonButton>

                    <h3 className="text-xl font-bold mb-0">
                      {translations.addCompany}
                    </h3>
                  </div>

                  <div className="px-8 py-2">
                    <NewCompanyCreate
                      data={data}
                      setData={setData}
                      errors={errors}
                      handleInputChange={handleInputChange}
                      handleCountryChange={handleCountryChange}
                      foodBusinessType={foodBusinessType}
                      countries={countries}
                      user={user}
                    />
                    <CommonButton
                      variant="success"
                      onClick={handleSubmit}
                      className="my-4 w-full"
                      disabled={processing}
                    >
                      {translations.addCompany}
                    </CommonButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
