import React from 'react';
import TextInput from '../TextInput';
import Select from 'react-select';
import { SingleValue, ActionMeta } from 'react-select';
import { usePage } from '@inertiajs/react';

interface NewCompanyCreateProps {
  data: {
    country_name: string;
    company_name: string;
    registration_number: string;
    vat_no: string;
    address: string;
    email: string;
    preferred_language: string;
    volume_units: string;
    weight_units: string;
    temperature_unit: string;
    monitoring: string;
    temperature_prefill: string;
    date_format: string;
    business_type_id: string;
  };
  errors: {
    country_name?: string;
    company_name?: string;
    registration_number?: string;
    vat_no?: string;
    address?: string;
    email?: string;
    preferred_language?: string;
    volume_units?: string;
    weight_units?: string;
    temperature_unit?: string;
    monitoring?: string;
    temperature_fill?: string;
    date_format?: string;
    business_type_id?: string;
  };
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  countries: { [code: string]: string };
  foodBusinessType: { id: string; name: string }[];

  setData: (key: string, value: string | number | boolean) => void;

  user?: String[];
}

const NewCompanyCreate: React.FC<NewCompanyCreateProps> = ({
  data,
  setData,
  errors,
  handleInputChange,
  handleCountryChange,
  countries,
  foodBusinessType,
  user,
}: any) => {
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

  const countryOptions: { value: string; label: string }[] = Object.entries(
    countries
  ).map(([code, name]) => ({
    value: code,
    label: name as string,
  }));

  const formattedOptions = user?.map((users: any) => ({
    value: users?.id,
    label: `${users?.name} (${users?.email})`,
  }));

  const auth: any = usePage().props.auth;
  const isAdmin = auth.roles.includes('admin');

  return (
    <div className="px-0 py-3 grid grid-cols-2 gap-5">
      {isAdmin && (
        <div>
          <div>
            <p>Select User</p>
          </div>
          <div>
            <Select
              className="w-full border rounded bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
              name="user_id"
              value={
                formattedOptions.find(
                  (option: any) => option.value === data.user_id
                ) || ''
              }
              onChange={(selectedOption: any) =>
                setData('user_id', selectedOption.value)
              }
              options={formattedOptions}
              placeholder="Select User"
              isSearchable
              required
            />
            {errors.user_id && (
              <div className="text-red-500 mt-1">{errors.user_id}</div>
            )}
          </div>
        </div>
      )}

      <div>
        <div>
          <p>Country</p>
        </div>
        <div>
          <Select
            className="w-full border rounded bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            name="country_name"
            value={countryOptions.find(
              (option) => option.value === data.country_name || ''
            )}
            onChange={handleSelectChange}
            options={countryOptions}
            placeholder="Select Country"
            isSearchable
            required
          />
          {errors.country_name && (
            <div className="text-red-500 mt-1">{errors.country_name}</div>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div>
        <div>
          <p>Company Name</p>
        </div>
        <div>
          <TextInput
            type="text"
            name="company_name"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            placeholder="Company name"
            value={data.company_name}
            onChange={handleInputChange}
            required
          />
          {errors.company_name && (
            <div className="text-red-500 mt-1">{errors.company_name}</div>
          )}
        </div>
      </div>

      {/* Company Registration Number */}
      <div>
        <div>
          <p>Company Registration Number</p>
        </div>
        <div>
          <TextInput
            type="text"
            name="registration_number"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            placeholder="Registration number"
            value={data.registration_number}
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
          <p>Food Business Type</p>
        </div>
        <div>
          <select
            name="business_type_id"
            value={data.business_type_id}
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

      {/* VAT No */}
      <div>
        <div>
          <p>VAT No</p>
        </div>
        <div>
          <TextInput
            type="text"
            name="vat_no"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            placeholder="VAT number"
            value={data.vat_no}
            onChange={handleInputChange}
            required
          />
          {errors.vat_no && (
            <div className="text-red-500 mt-1">{errors.vat_no}</div>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <div>
          <p>Address</p>
        </div>
        <div>
          <TextInput
            type="text"
            name="address"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            placeholder="Address"
            value={data.address}
            onChange={handleInputChange}
            required
          />
          {errors.address && (
            <div className="text-red-500 mt-1">{errors.address}</div>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <div>
          <p>Email</p>
        </div>
        <div>
          <TextInput
            type="email"
            name="email"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && (
            <div className="text-red-500 mt-1">{errors.email}</div>
          )}
        </div>
      </div>

      {/* Preferred Language */}
      <div>
        <div>
          <p>Preferred Language</p>
        </div>
        <div>
          <select
            name="preferred_language"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.preferred_language}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Russian">Russian</option>
          </select>
          {errors.preferred_language && (
            <div className="text-red-500 mt-1">{errors.preferred_language}</div>
          )}
        </div>
      </div>

      {/* Volume Units */}
      <div>
        <div>
          <p>Volume Units</p>
        </div>
        <div>
          <select
            name="volume_units"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.volume_units}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Unit</option>
            <option value="Liters">Liters</option>
            <option value="Gallons">Gallons</option>
          </select>
          {errors.volume_units && (
            <div className="text-red-500 mt-1">{errors.volume_units}</div>
          )}
        </div>
      </div>

      {/* Weight Units */}
      <div>
        <div>
          <p>Weight Units</p>
        </div>
        <div>
          <select
            name="weight_units"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.weight_units}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Unit</option>
            <option value="Kilograms">Kilograms</option>
            <option value="Pounds">Pounds</option>
          </select>
          {errors.weight_units && (
            <div className="text-red-500 mt-1">{errors.weight_units}</div>
          )}
        </div>
      </div>

      {/* Temperature Unit */}
      <div>
        <div>
          <p>Temperature Unit</p>
        </div>
        <div>
          <select
            name="temperature_unit"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.temperature_unit}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Unit</option>
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
          </select>
          {errors.temperature_unit && (
            <div className="text-red-500 mt-1">{errors.temperature_unit}</div>
          )}
        </div>
      </div>

      {/* Monitoring */}
      <div>
        <div>
          <p>Monitoring</p>
        </div>
        <div>
          <select
            name="monitoring"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.monitoring}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Option</option>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
          {errors.monitoring && (
            <div className="text-red-500 mt-1">{errors.monitoring}</div>
          )}
        </div>
      </div>

      {/* Temperature Prefill Solution */}
      <div>
        <div>
          <p>Temperature Prefill Solution</p>
        </div>
        <div>
          <select
            name="temperature_prefill"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.temperature_prefill}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Solution</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
          {errors.temperature_prefill && (
            <div className="text-red-500 mt-1">
              {errors.temperature_prefill}
            </div>
          )}
        </div>
      </div>

      {/* Date Format */}
      <div>
        <div>
          <p>Date Format</p>
        </div>
        <div>
          <select
            name="date_format"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            value={data.date_format}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Format</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          </select>
          {errors.date_format && (
            <div className="text-red-500 mt-1">{errors.date_format}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCompanyCreate;
