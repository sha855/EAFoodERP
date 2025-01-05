import React, { useState } from 'react';
import CommonButton from '../CommonButton';
import { useForm } from '@inertiajs/react';
import Select from 'react-select';

interface BusinessUnitEditProps {
  data: any;
  countries: { [code: string]: string };
  timeZones: Array<{ value: string; label: string }>;
  languages: Array<{ id: number; name: string }>;
  dateFormat: string;
  business_type_id?: Array<{ id: number; name: string }>;
  typeOfLocation?: Array<{ value: string; label: string }>;
  businessType?: Array<{ value: string; label: string }>;
  numberOfEmployee?: Array<{ value: string; label: string }>;
  selectLanguage?: Array<{ value: string; label: string }>;
  onCancel: () => void;
  translations: any;
}

export default function BusinessUnitEdit({
  data,
  countries,
  timeZones,
  businessType = [],
  typeOfLocation = [],
  numberOfEmployee = [],
  selectLanguage = [],
  onCancel,
  translations,
}: BusinessUnitEditProps) {
  const {
    data: formData,
    setData,
    patch,
    processing,
    errors,
  } = useForm({
    company_name: data.company_name || '',
    address: data.address || '',
    country_name: data.country_name || '',
    phone: data.phone || '',
    email: data.email || '',
    work_email_for_notification: data.work_email_for_notification || '',
    representative_person: data.representative_person || '',
    business_type_id: data.business_type_id || '',
    total_no_of_business_locations: data.total_no_of_business_locations || '',
    total_no_of_employees: data.total_no_of_employees || '',
    preferred_language: data.preferred_language || '',
    time_zone: data.time_zone || '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData(name as keyof typeof formData, value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('setup.places.update', { id: data.id }), {
      preserveScroll: true,
      data: formData,
      onError: () => {
        console.log(errors);
      },
    });
  };

  const countryOptions = Object.entries(countries).map(([code, name]) => ({
    value: name,
    label: name,
  }));

  const handleCountryChange = (selectedOption: any) => {
    setData('country_name', selectedOption.value);
  };

  const handleTimeZoneChange = (selectedOption: any) => {
    setData('time_zone', selectedOption.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-1">
          <label className="black text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.businessUnitName}
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.company_name && (
            <span className="text-red-500 text-sm">{errors.company_name}</span>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.address}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{errors.address}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.country}
          </label>
          <Select
            classNamePrefix="react-select"
            options={countryOptions}
            value={countryOptions.find(
              (option) => option.value === formData.country_name
            )}
            onChange={handleCountryChange}
            placeholder={translations.BusinessUnitEdit.selectCountry}
          />
          {errors.country_name && (
            <span className="text-red-500 text-sm">{errors.country_name}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.workEmailForNotifications}
          </label>
          <input
            type="email"
            name="work_email_for_notification"
            value={formData.work_email_for_notification}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.work_email_for_notification && (
            <span className="text-red-500 text-sm">
              {errors.work_email_for_notification}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.representativePerson}
          </label>
          <input
            type="text"
            name="representative_person"
            value={formData.representative_person}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.representative_person && (
            <span className="text-red-500 text-sm">
              {errors.representative_person}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.businessType}
          </label>
          <select
            name="business_type_id"
            value={formData.business_type_id}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">{translations.BusinessUnitEdit.choose}</option>
            {businessType.map((type: any) => (
              <option key={type.name} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.business_type_id && (
            <span className="text-red-500 text-sm">
              {errors.business_type_id}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.typeOfLocation}
          </label>
          <select
            name="total_no_of_business_locations"
            value={formData.total_no_of_business_locations}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">{translations.BusinessUnitEdit.choose}</option>
            {typeOfLocation.map((type: any) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.total_no_of_business_locations && (
            <span className="text-red-500 text-sm">
              {errors.total_no_of_business_locations}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.numberOfEmployees}
          </label>
          <select
            name="total_no_of_employees"
            value={formData.total_no_of_employees}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">{translations.BusinessUnitEdit.choose}</option>
            {numberOfEmployee.map((emp: any) => (
              <option key={emp.value} value={emp.value}>
                {emp.label}
              </option>
            ))}
          </select>
          {errors.total_no_of_employees && (
            <span className="text-red-500 text-sm">
              {errors.total_no_of_employees}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.preferredLanguage}
          </label>
          <select
            name="preferred_language"
            value={formData.preferred_language}
            onChange={handleInputChange}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">
              {translations.BusinessUnitEdit.selectLanguage}
            </option>
            {selectLanguage.map((lang: any) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          {errors.total_no_of_employees && (
            <span className="text-red-500 text-sm">
              {errors.total_no_of_employees}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {translations.BusinessUnitEdit.timeZone}
          </label>
          <div>
            <Select
              classNamePrefix="react-select"
              options={timeZones}
              value={timeZones.find(
                (zone) => zone.value === formData.time_zone
              )}
              onChange={handleTimeZoneChange}
              placeholder={translations.NewBusinessUnit.selectTimeZone}
              required
            />
            {errors.time_zone && (
              <span className="text-red-500 text-sm">{errors.time_zone}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <CommonButton
          variant="outlined"
          onClick={onCancel}
          className="mr-2 col-span-1"
        >
          {translations.BusinessUnitEdit.cancel}
        </CommonButton>
        <CommonButton
          variant="success"
          type="submit"
          disabled={processing}
          className="col-span-1"
        >
          {translations.BusinessUnitEdit.save}
        </CommonButton>
      </div>
    </form>
  );
}
