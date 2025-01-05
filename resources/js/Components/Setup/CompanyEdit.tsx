import React from 'react';
import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import NotificationMessage from '../NotificationMessage';
import Select from 'react-select';
import { SingleValue, ActionMeta } from 'react-select';

interface companyedit {
  data: any;
  countries: string[];
  languages: string[];
  dateFormat: string[];
  volumeUnit: string[];
  weightUnits: string[];
  temperatureUnit: string[];
  monitoring: string[];
  temperaturePrefill: string[];
  onCancel: () => void;
  translations: any;
  foodBusinessType: String[];
}

const CompanyEdit = ({
  data,
  countries,
  onCancel,
  languages,
  dateFormat,
  volumeUnit,
  weightUnits,
  temperatureUnit,
  monitoring,
  temperaturePrefill,
  translations,
  foodBusinessType,
}: companyedit) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

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
    | 'date_format'
    | 'business_type_id';

  const {
    setData,
    post,
    processing,
    errors,
    data: company,
  } = useForm({
    company_name: data.company_name || '',
    country_name: data.country_name || '',
    registration_number: data.registration_number || '',
    vat_no: data.vat_no || '',
    address: data.address || '',
    email: data.email || '',
    preferred_language: data.preferred_language || '',
    volume_units: data.volume_units || '',
    weight_units: data.weight_units || '',
    temperature_unit: data.temperature_unit || '',
    monitoring: data.monitoring || '',
    temperature_prefill: data.temperature_prefill || '',
    date_format: data.date_format || '',
    business_type_id: data.business_type_id || '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setData(name as FormDataKeys, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('setup.companies.update', { company: data.id }));
  };

  const handleSelectChange = (
    selectedOption: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (selectedOption) {
      setData('country_name', selectedOption.value);
    } else {
      setData('country_name', '');
    }
  };

  const countryOptions = Object.entries(countries).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  return (
    <div className=" py-4 ">
      {notification && (
        <NotificationMessage
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="grid grid-cols-2 gap-5">
        <div>
          <div>
            <p className="mb-2">{translations.companies.country}</p>
          </div>
          <div>
            <Select
              className="w-full border rounded bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              name="country_name"
              value={countryOptions.find(
                (option) => option.value === company.country_name
              )}
              onChange={handleSelectChange}
              options={countryOptions}
              placeholder={translations.companies.selectCountry}
              isSearchable
              required
            />

            {errors.country_name && (
              <div className="text-red-500 mt-1">{errors.country_name}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.companyName}</p>
          </div>
          <div>
            <TextInput
              type="text"
              name="company_name"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              placeholder={translations.companies.companyName}
              value={company.company_name}
              onChange={handleInputChange}
              required
            />
            {errors.company_name && (
              <div className="text-red-500 mt-1">{errors.company_name}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">
              {' '}
              {translations.companies.companyRegistrationNumber}
            </p>
          </div>
          <div>
            <TextInput
              type="text"
              name={translations.companies.registrationNumber}
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              placeholder={translations.companies.registrationNumberPlaceholder}
              value={company.registration_number}
              onChange={handleInputChange}
              required
            />
            {errors.registration_number && (
              <div className="text-red-500 mt-1">
                {errors.registration_number}
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2"> {translations.companies.vatNo}</p>
          </div>
          <div>
            <TextInput
              type="text"
              name="vat_no"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              placeholder={translations.companies.vatNumber}
              value={company.vat_no}
              onChange={handleInputChange}
              required
            />
            {errors.vat_no && (
              <div className="text-red-500 mt-1">{errors.vat_no}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.address}</p>
          </div>
          <div>
            <TextInput
              type="text"
              name={translations.companies.address}
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              placeholder={translations.companies.address}
              value={company.address}
              onChange={handleInputChange}
              required
            />
            {errors.address && (
              <div className="text-red-500 mt-1">{errors.address}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.email}</p>
          </div>
          <div>
            <TextInput
              type="email"
              name={translations.companies.email}
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              placeholder={translations.companies.email}
              value={company.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && (
              <div className="text-red-500 mt-1">{errors.email}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.preferredLanguage}</p>
          </div>
          <div>
            <select
              name={translations.companies.preferredLanguage}
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.preferred_language}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectLanguage}</option>
              {languages.map((lang: any) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>

            {errors.preferred_language && (
              <div className="text-red-500 mt-1">
                {errors.preferred_language}
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.volumeUnits}</p>
          </div>
          <div>
            <select
              name="volume_units"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.volume_units}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectUnit}</option>
              {volumeUnit.map((unit: any) => (
                <option key={unit.value} value={unit.value}>
                  {unit.label}
                </option>
              ))}
            </select>
            {errors.volume_units && (
              <div className="text-red-500 mt-1">{errors.volume_units}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.weightUnits}</p>
          </div>
          <div>
            <select
              name="weight_units"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.weight_units}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectUnit}</option>
              {weightUnits.map((weight: any) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
            {errors.weight_units && (
              <div className="text-red-500 mt-1">{errors.weight_units}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.temperatureUnit}</p>
          </div>
          <div>
            <select
              name="temperature_unit"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.temperature_unit}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectUnit}</option>
              {temperatureUnit.map((temp: any) => (
                <option key={temp.value} value={temp.value}>
                  {temp.label}
                </option>
              ))}
            </select>
            {errors.temperature_unit && (
              <div className="text-red-500 mt-1">{errors.temperature_unit}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2">{translations.companies.monitoring}</p>
          </div>
          <div>
            <select
              name="monitoring"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.monitoring}
              onChange={handleInputChange}
              required
            >
              <option value=""> {translations.companies.selectOption}</option>
              {monitoring.map((monitoring: any) => (
                <option key={monitoring.value} value={monitoring.value}>
                  {monitoring.label}
                </option>
              ))}
            </select>
            {errors.monitoring && (
              <div className="text-red-500 mt-1">{errors.monitoring}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2"> {translations.companies.temperaturePrefill}</p>
          </div>
          <div>
            <select
              name="temperature_prefill"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.temperature_prefill}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectOption}</option>
              {temperaturePrefill.map((tempPrefill: any) => (
                <option key={tempPrefill.value} value={tempPrefill.value}>
                  {tempPrefill.label}
                </option>
              ))}
            </select>
            {errors.temperature_prefill && (
              <div className="text-red-500 mt-1">
                {errors.temperature_prefill}
              </div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p className="mb-2"> {translations.companies.dateFormat}</p>
          </div>
          <div>
            <select
              name="date_format"
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              value={company.date_format}
              onChange={handleInputChange}
              required
            >
              <option value="">{translations.companies.selectFormat}</option>
              {dateFormat.map((dformat: any) => (
                <option key={dformat.value} value={dformat.value}>
                  {dformat.label}
                </option>
              ))}
            </select>
            {errors.date_format && (
              <div className="text-red-500 mt-1">{errors.date_format}</div>
            )}
          </div>
        </div>

        <div>
          <div>
            <p>Food Business Type</p>
          </div>
          <div>
            <select
              name="business_type_id"
              value={company.business_type_id}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              required
            >
              <option value="">Select a business type</option>
              {foodBusinessType.map((type: any) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.business_type_id && (
              <div className="text-red-500 mt-1">{errors.business_type_id}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-4 ">
        <CommonButton className="px-8" variant="success" onClick={handleSubmit}>
          {translations.companies.save}
        </CommonButton>
        <CommonButton variant="outlined" className="px-8" onClick={onCancel}>
          {translations.companies.cancel}
        </CommonButton>
      </div>
    </div>
  );
};

export default CompanyEdit;
