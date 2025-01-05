import { useForm, usePage } from '@inertiajs/react';
import CommonButton from '../CommonButton';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import axios from 'axios';
import Checkbox from '@/Components/Checkbox';
import NotificationMessage from '../NotificationMessage';
import { PageProps } from '@/types';

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'HACCP.GeneralInfo': TranslationStructure;
  };
  locale: string;
}

const EditGeneralInfo = ({
  company,
  foodBuisnessType,
  mainCustomerGroup,
  setIsEditing,
  addBuisnessActivity,
}: any) => {
  const { data, setData, post, errors } = useForm({
    id: company?.id || '',
    business_unit_id: company?.business_unit?.id || '',
    company_name: company?.company_name || '',
    company_registration_number: company?.company_registration_number || '',
    address: company?.address || '',
    business_unit_address: company?.business_unit?.address,
    unit_name: company?.business_unit?.unit_name || company?.company_name || '',
    phone: company?.user.phone_no || '',
    email: company?.email || '',
    manager: company?.user.name || '',
    food_business_type_id: company?.business_unit?.food_business_type_id || '',
    food_business_unit_id:
      company?.business_unit?.food_business_unit_id?.toString() || '',
    additional_business_activity_id: company?.business_unit
      ?.additional_business_activity_id
      ? JSON.parse(company.business_unit?.additional_business_activity_id)
      : [],
    is_organic: company.business_unit?.is_organic ?? false,
    customer_group_id: company.business_unit?.customer_group_id,
    number_of_seats: company.business_unit?.number_of_seats || '',
    custom_business_unit: company.business_unit?.custom_business_unit || '',
    custom_customer_group: company.business_unit?.custom_customer_group || '',
    is_terrace: company.business_unit?.is_terrace ?? false, 
  });

  console.log('the data is here', data);


  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [businessUnits, setBusinessUnits] = useState<any[]>([]);
  const [additionalActivities, setAdditionalActivities] = useState<any[]>([]);
  const [selectedBusinessType, setSelectedBusinessType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('haccp.general-info.store'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    });
  };

  const handleFoodBusinessTypeChange = async (e: any) => {
    const selectedBusinessTypeId = e.target.value;
    setData('food_business_type_id', selectedBusinessTypeId);

    const value = String(e.target.value);
    setSelectedBusinessType(value);

    try {
      const response = await axios.get(
        route('buisness.type.detail', { businessType: selectedBusinessTypeId })
      );
      const businessUnits = Array.isArray(response.data.buisnessUnit)
        ? response.data.buisnessUnit
        : [];
      const additionalActivities = Array.isArray(
        response.data.addBuisnessActivity
      )
        ? response.data.addBuisnessActivity
        : [];

      setBusinessUnits(businessUnits);
      setAdditionalActivities(additionalActivities);
    } catch (error) {
      console.error('Error fetching business type details:', error);
    }
  };
  const { translation, locale } = usePage<TranslationProps>().props;
  const translations = translation['HACCP.GeneralInfo'] || {};

  const handleAddressChange = (e: any) => {
    const newAddress = e.target.value;
    setData({
      ...data,
      address: newAddress,
      business_unit_address: newAddress,
    });
  };

  const handleBusinessUnitAddressChange = (e: any) => {
    const newBusinessUnitAddress = e.target.value;
    setData('business_unit_address', newBusinessUnitAddress);
  };

  const [showCustomFields, setShowCustomFields] = useState({
    businessUnit: false,
    customerGroup: false,
  });

  const handleBusinessUnitChange = (e: any) => {
    const value = e.target.value;
    setData({ ...data, food_business_unit_id: value });

    setShowCustomFields((prev) => ({
      ...prev,
      businessUnit: value === 'other',
    }));
  };

  const handleCustomerGroupChange = (e: any) => {
    const value = e.target.value;
    setData({ ...data, customer_group_id: value });

    setShowCustomFields((prev) => ({
      ...prev,
      customerGroup: value === 'other',
    }));
  };

  const showAdditionalFieldsFor = [
    "Accommodation Company",
    "Food Service Company (Independent and A la Carte Menu Providing)",
    "Institutional Food Production & Catering Services",
  ];

  const shouldShowAdditionalFields = foodBuisnessType.some(
    (business: any) =>
      business.id == Number(data.food_business_type_id) &&
      showAdditionalFieldsFor.includes(business.name)
  );
  

  return (
    <div>
      {notification && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <form className="space-y-6 editDetail" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2 bg-gray-50 p-3 border-l-4 border-orange-400">
            1.1.1 Company
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <strong className="text-right pr-2 font-medium">
                {translations.companyName}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter company name"
                  name="company_name"
                  required
                  value={data.company_name}
                  onChange={(e) => setData('company_name', e.target.value)}
                />

                {errors.company_name && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.company_name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.companyRegister}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter company registration number"
                  name="company_registration_number"
                  value={data.company_registration_number}
                  onChange={(e) =>
                    setData('company_registration_number', e.target.value)
                  }
                />
                {errors.company_registration_number && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.company_registration_number}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.address}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter address"
                  name="address"
                  required
                  value={data.address}
                  onChange={handleAddressChange}
                />
                {errors.address && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 bg-gray-50 p-3 border-l-4 border-orange-400">
            1.1.2 Business Unit
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.buisnessName}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter business unit name"
                  name="unit_name"
                  required
                  value={data.unit_name}
                  onChange={(e) => setData('unit_name', e.target.value)}
                />
                {errors.unit_name && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.unit_name}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.address}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter address"
                  name="business_unit_address"
                  required
                  value={data.business_unit_address}
                  onChange={handleBusinessUnitAddressChange}
                />
                {errors.business_unit_address && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.business_unit_address}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.phone}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter phone number"
                  name="phone"
                  required
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                />
                {errors.phone && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.email}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter email"
                  name="email"
                  required
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium">
                {translations.generalmanager}
              </strong>
              <div className="flex-grow">
                <TextInput
                  className="w-full"
                  placeholder="Enter general manager/owner"
                  name="manager"
                  required
                  value={data.manager}
                  onChange={(e) => setData('manager', e.target.value)}
                />
                {errors.manager && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.manager}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium">
                {translations.businessType}
              </strong>
              <div className="flex-grow">
                <select
                  className=" bg-slate-50 rounded-md text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 w-full"
                  name="food_business_type_id"
                  value={data.food_business_type_id}
                  onChange={handleFoodBusinessTypeChange}
                >
                  <option value="">select food business type</option>
                  {foodBuisnessType.map((business: any) => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
                {errors.food_business_type_id && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.food_business_type_id}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <strong className="text-right pr-2 font-medium">
                {translations.additionalBusiness}
              </strong>
              <div className="flex-grow mt-4">
                {addBuisnessActivity.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-2 mb-2"
                  >
                    <Checkbox
                      checked={data.additional_business_activity_id.some(
                        (a: any) => a.id === activity.id
                      )}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setData('additional_business_activity_id', [
                            ...data.additional_business_activity_id,
                            activity,
                          ]);
                        } else {
                          setData(
                            'additional_business_activity_id',
                            data.additional_business_activity_id.filter(
                              (a: any) => a.id !== activity.id
                            )
                          );
                        }
                      }}
                    />
                    <label>{activity.name}</label>
                  </div>
                ))}

                {errors.additional_business_activity_id && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.additional_business_activity_id}
                  </span>
                )}
              </div>
            </div>

            <div>
              <strong className="text-right pr-2 font-medium		">
                {translations.organic}
              </strong>
              <div className="flex-grow">
                <input
                  type="checkbox"
                  className="ml-0 bg-slate-50 rounded-md text-orange-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200"
                  checked={data.is_organic}
                  onChange={(e) => setData('is_organic', e.target.checked)}
                />
                {errors.is_organic && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.is_organic}
                  </span>
                )}
              </div>
            </div>


            <div>
              <strong className="text-right pr-2 font-medium">
                {translations.businessIs}
              </strong>
              <div className="flex-grow">
                <select
                  className="bg-slate-50 rounded-md text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 w-full"
                  name="food_business_unit_id"
                  value={data.food_business_unit_id}
                  onChange={handleBusinessUnitChange}
                >
                  <option value="">Select a Business Unit</option>
                  {company.business_unit && (
                    <option value={company.business_unit.id}>
                      {company.business_unit.unit_name}
                    </option>
                  )}
                  {Array.isArray(businessUnits) &&
                    businessUnits
                      .filter((unit) => unit.id !== company.business_unit?.id)
                      .map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                  <option value="other">Other</option>
                </select>

                {/* Custom Business Unit Input */}
                {showCustomFields.businessUnit ||
                  (data.custom_business_unit && (
                    <input
                      type="text"
                      className="bg-slate-50 rounded-md text-slate-400 p-2.5 mt-2 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 w-full"
                      placeholder="Enter Custom Business Unit"
                      value={data.custom_business_unit}
                      onChange={(e) =>
                        setData({
                          ...data,
                          custom_business_unit: e.target.value,
                        })
                      }
                    />
                  ))}

                {errors.food_business_unit_id && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.food_business_unit_id}
                  </span>
                )}
              </div>
            </div>

            {/* Customer Group Field */}
            <div>
              <strong className="text-right pr-2 font-medium">
                {translations.mainGroup}
              </strong>
              <div className="flex-grow">
                <select
                  className="bg-slate-50 rounded-md text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 w-full"
                  name="customer_group_id"
                  value={data.customer_group_id}
                  onChange={handleCustomerGroupChange}
                >
                  {mainCustomerGroup.map((group: any) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>

                {showCustomFields.customerGroup ||
                  (data.custom_customer_group && (
                    <input
                      type="text"
                      className="bg-slate-50 rounded-md text-slate-400 p-2.5 mt-2 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 w-full"
                      placeholder="Enter Custom Customer Group"
                      value={data.custom_customer_group}
                      onChange={(e) =>
                        setData({
                          ...data,
                          custom_customer_group: e.target.value,
                        })
                      }
                    />
                  ))}

                {errors.customer_group_id && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.customer_group_id}
                  </span>
                )}
              </div>
            </div>

        {shouldShowAdditionalFields && (
          <>
          <div className="mt-4">
            <strong className="text-right pr-2 font-medium mb-3 inline-block">
              {translations.terrace}
            </strong>
                  <div className="flex space-x-4">
                    <label>
                      <input
                        type="radio"
                        name="is_terrace"
                        value="yes"
                        checked={data.is_terrace === true}
                        onChange={() => setData("is_terrace", true)}
                        className="mr-2 text-orange-400 bg-gray-100 border-gray-300 focus:ring-orange-400 dark:focus:ring-orange-400 dark:ring-offset-gray-800 focus:ring-2"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="is_terrace"
                        value="no"
                        checked={data.is_terrace === false}
                        onChange={() => setData("is_terrace", false)}
                        className="mr-2 text-orange-400 bg-gray-100 border-gray-300 focus:ring-orange-400 dark:focus:ring-orange-400 dark:ring-offset-gray-800 focus:ring-2"
                      />
                      No
                    </label>
                  </div>

                </div>
          <div className="mt-4">
            <strong className="text-right pr-2 font-medium">{translations.noSeats}</strong>
            <div className="flex-grow">
              <TextInput
                className="w-full"
                placeholder="Enter number of seats"
                name="number_of_seats"
                required
                value={data.number_of_seats}
                onChange={(e) => setData("number_of_seats", e.target.value)}
              />
              {errors.number_of_seats && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.number_of_seats}
                </span>
              )}
            </div>
          </div>
        </>
      )}
            
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <CommonButton variant="success" type="submit" onClick={handleSubmit}>
            Save
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default EditGeneralInfo;
