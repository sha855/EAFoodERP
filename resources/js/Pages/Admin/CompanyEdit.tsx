import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import CommonButton from '@/Components/CommonButton';
import TextInput from '@/Components/TextInput';
import Container from '@/Components/Container';
import Select from 'react-select';

interface CountryOption {
  value: string;
  label: string;
}

export default function CompanyEdit({
  auth,
  company,
  countries,
  foodBusinessType,
}: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const { data, setData, post, errors, processing } = useForm({
    id: company.id || '',
    user_id: company.user_id || '',
    country_name: company.country_name || '',
    company_name: company.company_name || '',
    registration_number: company.registration_number || '',
    vat_no: company.vat_no || '',
    address: company.address || '',
    email: company.email || '',
    preferred_language: company.preferred_language || '',
    volume_units: company.volume_units || '',
    weight_units: company.weight_units || '',
    temperature_unit: company.temperature_unit || '',
    monitoring: company.monitoring || '',
    temperature_prefill: company.temperature_prefill || '',
    date_format: company.date_format || '',
    business_type_id: company.business_type_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('setup.companies.update', { company: company.id }));
  };

  const countryOptions: CountryOption[] = Object.entries(countries).map(
    ([code, name]) => ({
      value: code,
      label: name as string,
    })
  );

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Company Details
        </h2>
      }
    >
      <Head title="Company Edit" />

      <Container>
        <div className="h-fit flex flex-col bg-white rounded-md  max-w-screen-lg  mx-auto">
          <div className="flex-1 p-0">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h1 className="text-xl font-bold">Edit Company Information</h1>
            </div>

            <form onSubmit={handleSubmit} className=" p-0 ">
              <div className="p-4">
                <div className="grid grid-cols-12 gap-x-8 gap-y-4">
                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="country_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country Name
                      </label>

                      <Select
                        className="w-full rounded-md shadow-sm bg-slate-100 text-slate-400 focus:ring-transparent focus:border-gray-300 border-gray-200 mt-1"
                        name="country_name"
                        value={
                          countryOptions.find(
                            (option) => option.value === data.country_name
                          ) || null
                        }
                        onChange={(selectedOption: any) =>
                          setData('country_name', selectedOption?.value)
                        }
                        options={countryOptions}
                        placeholder="Select Country"
                        isSearchable
                      />
                      {errors.country_name && (
                        <div className="text-red-500 mt-1">
                          {errors.country_name}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="company_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Company Name
                      </label>
                      <TextInput
                        id="company_name"
                        type="text"
                        value={data.company_name}
                        onChange={(e) =>
                          setData('company_name', e.target.value)
                        }
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                      />
                      {errors.company_name && (
                        <span className="text-red-600 text-sm">
                          {errors.company_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="registration_number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Registration Number
                      </label>
                      <TextInput
                        id="registration_number"
                        type="text"
                        value={data.registration_number}
                        onChange={(e) =>
                          setData('registration_number', e.target.value)
                        }
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                      />
                      {errors.registration_number && (
                        <span className="text-red-600 text-sm">
                          {errors.registration_number}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="vat_no"
                        className="block text-sm font-medium text-gray-700"
                      >
                        VAT Number
                      </label>
                      <TextInput
                        id="vat_no"
                        type="text"
                        value={data.vat_no}
                        onChange={(e) => setData('vat_no', e.target.value)}
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                      />
                      {errors.vat_no && (
                        <span className="text-red-600 text-sm">
                          {errors.vat_no}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <TextInput
                        id="address"
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                      />
                      {errors.address && (
                        <span className="text-red-600 text-sm">
                          {errors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                      />
                      {errors.email && (
                        <span className="text-red-600 text-sm">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="preferred_language"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Preferred Language
                      </label>
                      <select
                        name="preferred_language"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.preferred_language}
                        onChange={(e) =>
                          setData('preferred_language', e.target.value)
                        }
                      >
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="Russian">Russian</option>
                      </select>
                      {errors.preferred_language && (
                        <span className="text-red-600 text-sm">
                          {errors.preferred_language}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="volume_units"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Volume Units
                      </label>
                      <select
                        name="volume_units"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.volume_units}
                        onChange={(e) =>
                          setData('volume_units', e.target.value)
                        }
                      >
                        <option value="">Select Unit</option>
                        <option value="Liters">Liters</option>
                        <option value="Gallons">Gallons</option>
                      </select>
                      {errors.volume_units && (
                        <span className="text-red-600 text-sm">
                          {errors.volume_units}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="weight_units"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Weight Units
                      </label>
                      <select
                        name="weight_units"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.weight_units}
                        onChange={(e) =>
                          setData('weight_units', e.target.value)
                        }
                      >
                        <option value="">Select Unit</option>
                        <option value="Kilograms">Kilograms</option>
                        <option value="Pounds">Pounds</option>
                      </select>
                      {errors.weight_units && (
                        <span className="text-red-600 text-sm">
                          {errors.weight_units}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="temperature_unit"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Temperature Unit
                      </label>
                      <select
                        name="temperature_unit"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.temperature_unit}
                        onChange={(e) =>
                          setData('temperature_unit', e.target.value)
                        }
                      >
                        <option value="">Select Unit</option>
                        <option value="Celsius">Celsius</option>
                        <option value="Fahrenheit">Fahrenheit</option>
                      </select>
                      {errors.temperature_unit && (
                        <span className="text-red-600 text-sm">
                          {errors.temperature_unit}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="monitoring"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Monitoring
                      </label>
                      <select
                        name="monitoring"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.monitoring}
                        onChange={(e) => setData('monitoring', e.target.value)}
                      >
                        <option value="">Select Option</option>
                        <option value="Enabled">Enabled</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                      {errors.monitoring && (
                        <span className="text-red-600 text-sm">
                          {errors.monitoring}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="temperature_prefill"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Temperature Prefill
                      </label>
                      <select
                        name="temperature_prefill"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.temperature_prefill}
                        onChange={(e) =>
                          setData('temperature_prefill', e.target.value)
                        }
                      >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      {errors.temperature_prefill && (
                        <span className="text-red-600 text-sm">
                          {errors.temperature_prefill}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="date_format"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date Format
                      </label>
                      <select
                        name="date_format"
                        className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 mt-1 block  px-3 py-2 border "
                        value={data.date_format}
                        onChange={(e) => setData('date_format', e.target.value)}
                      >
                        <option value="">Select Format</option>
                        <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                      {errors.date_format && (
                        <span className="text-red-600 text-sm">
                          {errors.date_format}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-6">
                    <div>
                      <label
                        htmlFor="business_type_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Business Type
                      </label>

                      <select
                        name="business_type_id"
                        value={data.business_type_id}
                        onChange={(e) =>
                          setData('business_type_id', e.target.value)
                        }
                        className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
                      >
                        <option value="">Select a business type</option>
                        {foodBusinessType.map((type: any) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>

                      {errors.business_type_id && (
                        <span className="text-red-600 text-sm">
                          {errors.business_type_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end p-6 rounded-t-md border-t border-neutral-200">
                <CommonButton
                  variant="outlined"
                  className=" p-2 rounded"
                  href={route('admin.users.index')}
                >
                  Back
                </CommonButton>
                <CommonButton
                  type="submit"
                  className=" p-2 rounded"
                  variant="success"
                  disabled={processing}
                >
                  Update Company
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </Container>
      {notification && (
        <NotificationMessage
          message={notification.message}
          onClose={() => setNotification(null)}
          type={notification.type}
        />
      )}
    </AuthenticatedLayout>
  );
}
