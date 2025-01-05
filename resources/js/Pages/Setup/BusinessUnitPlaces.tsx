import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SetupSidebar from '@/Components/Setup/SetupSidebar';
import CommonButton from '@/Components/CommonButton';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { InfoIcon } from 'lucide-react';
import NewBusinessUnitCreate from '@/Components/Form/NewBusinessUnitCreate';
import BusinessUnitDetail from '@/Components/Setup/BusinessUnitDetail';
import BusinessUnitEdit from '@/Components/Setup/BusinessUnitEdit';
import { PageProps } from '@/types';
import Menu from '@mui/material/Menu';
import { IconButton, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface SetupSidebarProps {
  translations: any;
}

type Translations = {
  businessUnits: string;
  addNew: string;
  edit: string;
  delete: string;
  msg: string;
  [key: string]: string;
};

type FormDataKeys =
  | 'company_name'
  | 'address'
  | 'country_name'
  | 'phone'
  | 'email'
  | 'work_email_for_notification'
  | 'representative_person'
  | 'business_type_id'
  | 'total_no_of_business_locations'
  | 'total_no_of_employees'
  | 'preferred_language'
  | 'time_zone';

export default function BusinessUnitPlaces({
  auth,
  companyDetail,
  languages,
  countries,
  timeZones,
  companies,
  dateFormat,
  businessType,
  typeOfLocation,
  numberOfEmployee,
  selectLanguage,
  translations: any,
}: PageProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const toggleModal = () => setShowModal(!showModal);

  const { data, setData, post, processing, errors } = useForm({
    id: companyDetail.id || '',
    company_name: '',
    address: '',
    country_name: '',
    phone: '',
    email: '',
    work_email_for_notification: '',
    representative_person: '',
    business_type_id: '',
    total_no_of_business_locations: '',
    total_no_of_employees: '',
    preferred_language: '',
    time_zone: '',
  });

  const [businessUnits, setBusinessUnits] = useState(
    companyDetail ? [companyDetail] : []
  );

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const Setup =
    translationData['Setup.BusinessUnitPlaces'] ||
    translationData['Setup.BusinessUnitPlaces'] ||
    {};
  const translations = { ...Setup };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData(name as FormDataKeys, value);
  };

  const handleCountryChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const selectedCountry = event.target.value;
    setData('country_name', selectedCountry);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('setup.places.store'), {
      data: data,
      onSuccess: (response: any) => {
        console.log('response', response.props.companyDetail.id);
        setBusinessUnits((prevBusinessUnits) => [
          ...prevBusinessUnits,
          response.businessUnit,
        ]);
        setShowModal(false);
        data.id = response.props.companyDetail.id;
      },
      onError: (error) => {
        console.error('Form submission error:', error);
      },
    });
  };

  const handleDelete = (deleteId: number | null) => {
    if (deleteId !== null) {
      router.delete(route('setup.places.delete', { id: deleteId }));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.setupBusinessUnit}
        </h2>
      }
    >
      <Head title={translations.businessUnits} />

      <div className="flex">
        <SetupSidebar />

        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">{translations.businessUnits}</h3>

            <div className="flex gap-2 items-center relative">
              <CommonButton onClick={toggleModal} variant="success">
                <AddIcon /> {translations.addNew}
              </CommonButton>

              {!isEditing && (
                <CommonButton
                  className="!px-8"
                  variant="success"
                  onClick={handleEditClick}
                  disabled={processing}
                >
                  {translations.edit}
                </CommonButton>
              )}

              <div className="flex-2 gap-2 item-center relative items-end ">
                <IconButton
                  onClick={handleMenuOpen}
                  aria-label="menu"
                  className="px-6 py-2.5 "
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  className="mt-14"
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem className="hover:bg-gradient-org-red hover:text-white">
                    <span
                      className="ml-2"
                      onClick={() => handleDelete(data.id)}
                    >
                      {translations.delete}
                    </span>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
          <div className="p-4">
            {showInfo && (
              <div className="bg-green-200 p-4 rounded-md mb-4 relative w-full flex  items-start justify-between">
                <h2 className="text-sm flex items-center gap-1">
                  <span>
                    <InfoIcon className="w-5 h-5  mr-3" />
                  </span>
                  <h3 className="text-sm">{translations.msg}</h3>
                </h2>
                <button
                  onClick={handleClose}
                  className=" text-black hover:text-gray-600"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {!isEditing ? (
              <BusinessUnitDetail
                businessUnitDetail={companyDetail}
                userEmail={auth.user?.email}
                translations={translations as any}
              />
            ) : (
              <BusinessUnitEdit
                data={companyDetail}
                countries={countries}
                timeZones={timeZones}
                languages={languages}
                dateFormat={dateFormat}
                businessType={businessType}
                typeOfLocation={typeOfLocation}
                numberOfEmployee={numberOfEmployee}
                selectLanguage={selectLanguage}
                onCancel={handleCancelClick}
                translations={translations as any}
              />
            )}
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-[9999] overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full h-auto max-h-[90vh] grid grid-cols-1 gap-4 mt-6 overflow-y-auto relative">
              <div className="px-8 py-4 bg-gray-200">
                <CommonButton
                  className="absolute top-4 !p-1 right-4 text-gray-500 hover:text-gray-800"
                  onClick={toggleModal}
                  aria-label="Close"
                  variant="text"
                >
                  <CloseIcon />
                </CommonButton>

                <h3 className="text-xl font-bold mb-0">
                  {translations.businessUnits}{' '}
                </h3>
              </div>

              <div className="px-8 py-2">
                <NewBusinessUnitCreate
                  data={data}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  handleCountryChange={handleCountryChange}
                  countries={countries}
                  timeZones={timeZones}
                  businessType={businessType}
                  companies={companies}
                  typeOfLocation={typeOfLocation}
                  numberOfEmployee={numberOfEmployee}
                  selectLanguage={selectLanguage}
                  translations={translations as any}
                />
                <div className="flex justify-end">
                  <CommonButton
                    variant="success"
                    onClick={handleSubmit}
                    className="block text-sm font-medium my-4 text-gray-700 w-80"
                    disabled={processing}
                  >
                    {translations.save}
                  </CommonButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
