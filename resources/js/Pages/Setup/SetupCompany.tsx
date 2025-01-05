import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupSidebar from '@/Components/Setup/SetupSidebar';
import CommonButton from '@/Components/CommonButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import CloseIcon from '@mui/icons-material/Close';
import NewCompanyCreate from '@/Components/Form/NewCompanyCreate';
import CompanyDetail from '../../Components/Setup/CompanyDetail';
import CompanyEdit from '@/Components/Setup/CompanyEdit';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import { Trash } from 'lucide-react';
import { RouterOutlined } from '@mui/icons-material';

export default function SetupCompany({
  company,
  countries,
  languages,
  dateFormat,
  foodBusinessType,
  volumeUnit,
  weightUnits,
  temperatureUnit,
  monitoring,
  temperaturePrefill,
  folders,
}: PageProps) {
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

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const Setup =
    translationData['Validation.SetupCompany'] ||
    translationData['Validation.SetupCompany'] ||
    {};
  const translations = { ...Setup };

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
    setShowModal(true);
    post(route('setup.companies.submit'), {
      onSuccess: (response) => {
        setShowModal(false);
        router.get(route('setup.companies'));
      },
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const auth: any = usePage().props.auth;
  const isAdmin = auth.roles.includes('admin');

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">{translations.setupCompany}</h2>
      }
    >
      <Head title="Company" />

      <div className="flex ">
        {isAdmin ? <AdminUserSidebar folders={folders} /> : <SetupSidebar />}
        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1  bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">{translations.company}</h3>

            <div className="relative flex flex-wrap gap-3 items-center">
              {!isAdmin ? (
                <CommonButton
                  onClick={toggleModal}
                  variant="success"
                  className="flex items-center gap-2 px-6 py-2"
                >
                  <AddIcon className="w-5 h-5" />
                  {translations.addNew}
                </CommonButton>
              ) : (
                <CommonButton
                  onClick={() =>
                    router.delete(
                      route('admin.setup.companies.delete', {
                        company: company.id,
                      })
                    )
                  }
                  variant="outlined"
                  className="flex items-center gap-2 px-6 py-2 border-red-500 text-red-500 hover:bg-red-100"
                >
                  <Trash className="w-5 h-5" />
                  Delete
                </CommonButton>
              )}

              {!isEditing && (
                <CommonButton
                  className="!px-8 py-2"
                  variant="success"
                  onClick={handleEditClick}
                  disabled={processing}
                >
                  {translations.edit}
                </CommonButton>
              )}
            </div>
          </div>

          <div className="p-8">
            {!isEditing ? (
              <CompanyDetail
                companyDetail={company}
                userEmail={auth.user?.email}
              />
            ) : (
              <CompanyEdit
                data={company}
                countries={countries}
                languages={languages}
                dateFormat={dateFormat}
                onCancel={handleCancelClick}
                volumeUnit={volumeUnit}
                weightUnits={weightUnits}
                temperatureUnit={temperatureUnit}
                monitoring={monitoring}
                temperaturePrefill={temperaturePrefill}
                translations={translations as any}
                foodBusinessType={foodBusinessType}
              />
            )}
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
    </AuthenticatedLayout>
  );
}
