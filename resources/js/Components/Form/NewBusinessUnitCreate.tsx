import React, { useState } from 'react';
import TextInput from '../TextInput';

interface NewBusinessUnitCreateProps {
  data: {
    company_name: string;
    address: string;
    countries?: string;
    timeZones?: string;
    phone: string;
    email: string;
    work_email_for_notification: string;
    representative_person: string;
    business_type_id: string;
    total_no_of_business_locations: string;
    total_no_of_employees: string;
    preferred_language: string;
    time_zone: string;
  };

  errors: Partial<
    Record<keyof NewBusinessUnitCreateProps['data'], string | undefined>
  >;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCountryChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  countries: { [code: string]: string };
  businessType?: Array<{ id: number; name: string }>;
  timeZones: Array<{ value: string; label: string }>;
  typeOfLocation?: Array<{ value: string; label: string }>;
  numberOfEmployee?: Array<{ value: string; label: string }>;
  companies: any;
  selectLanguage?: Array<{ value: string; label: string }>;
  translations: any;
}

const NewBusinessUnitCreate: React.FC<NewBusinessUnitCreateProps> = ({
  data,
  errors,
  handleInputChange,
  handleCountryChange,
  countries,
  timeZones,
  businessType = [],
  typeOfLocation = [],
  numberOfEmployee = [],
  selectLanguage = [],
  translations,
  companies,
}) => {
  const [copyHaccpPlan, setCopyHaccpPlan] = useState(false);
  const [copyMonitoringTasks, setCopyMonitoringTasks] = useState(false);
  const searchVisible = copyHaccpPlan && copyMonitoringTasks;
  const [searchQuery, setSearchQuery] = useState('');
  const [companyName, setCompany] = useState<any[]>([companies]);

  const handleCopyHaccpPlanChange = () => {
    setCopyHaccpPlan((prev) => !prev);
  };

  const handleCopyMonitoringTasksChange = () => {
    setCopyMonitoringTasks((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCompanies = companies.filter((comp: any) => {
    const companyName = comp.company_name || '';
    return companyName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="px-0 py-3 grid grid-cols-2 gap-5">
      <label
        htmlFor="company_name"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.businessUnitName}</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="company_name"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.businessUnitName}
            required
          />
        </div>
        {errors.company_name && (
          <span className="text-red-500 text-sm">{errors.company_name}</span>
        )}
      </div>

      <label
        htmlFor="address"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.address}</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="address"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.addressName}
            required
          />
        </div>
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address}</span>
        )}
      </div>

      <label
        htmlFor="country_name"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.country}</strong>
      </label>
      <div>
        <div>
          <select
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleCountryChange}
            required
          >
            <option value="">
              {translations.NewBusinessUnit.selectCountry}
            </option>
            {Object.entries(countries).map(([code, name]) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {errors.countries && (
          <span className="text-red-500 text-sm">{errors.countries}</span>
        )}
      </div>

      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.phone}:</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="phone"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.phoneName}
          />
        </div>
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>

      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.email}</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="email"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.emailName}
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>

      <label
        htmlFor="work_email_for_notification"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.workEmailForNotification}</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="work_email_for_notification"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.emailName}
          />
        </div>
        {errors.work_email_for_notification && (
          <span className="text-red-500 text-sm">
            {errors.work_email_for_notification}
          </span>
        )}
      </div>

      <label
        htmlFor="representative_person"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.representivePerson}</strong>
      </label>
      <div>
        <div>
          <TextInput
            name="representative_person"
            onChange={handleInputChange}
            placeholder={translations.NewBusinessUnit.representativePersonName}
          />
        </div>
        {errors.representative_person && (
          <span className="text-red-500 text-sm">
            {errors.representative_person}
          </span>
        )}
      </div>

      <label
        htmlFor="business_type"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.businessType}</strong>
      </label>
      <div>
        <div>
          <select
            name="business_type_id"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleInputChange}
            required
          >
            <option value="">{translations.NewBusinessUnit.choose}</option>
            {businessType.map((type) => (
              <option key={type.name} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        {errors.business_type_id && (
          <span className="text-red-500 text-sm">
            {errors.business_type_id}
          </span>
        )}
      </div>

      <label
        htmlFor="total_no_of_business_locations"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.typeOfLocation}</strong>
      </label>
      <div>
        <div>
          <select
            name="total_no_of_business_locations"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleInputChange}
            required
          >
            <option value="">{translations.NewBusinessUnit.choose}</option>
            {typeOfLocation.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        {errors.total_no_of_business_locations && (
          <span className="text-red-500 text-sm">
            {errors.total_no_of_business_locations}
          </span>
        )}
      </div>

      <label
        htmlFor="total_no_of_employees"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.numberOfEmployees}:</strong>
      </label>
      <div>
        <div>
          <select
            name="total_no_of_employees"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleInputChange}
            required
          >
            <option value="">{translations.NewBusinessUnit.choose}</option>
            {numberOfEmployee.map((emp) => (
              <option key={emp.value} value={emp.value}>
                {emp.label}
              </option>
            ))}
          </select>
        </div>
        {errors.total_no_of_employees && (
          <span className="text-red-500 text-sm">
            {errors.total_no_of_employees}
          </span>
        )}
      </div>

      <label
        htmlFor="preferred_language"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.preferredLanguage}:</strong>
      </label>
      <div>
        <div>
          <select
            name="preferred_language"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleInputChange}
            required
          >
            <option value="">
              {translations.NewBusinessUnit.selectLanguage}
            </option>
            {selectLanguage.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        {errors.preferred_language && (
          <span className="text-red-500 text-sm">
            {errors.preferred_language}
          </span>
        )}
      </div>

      <label
        htmlFor="time_zone"
        className="block text-sm font-medium text-gray-700"
      >
        <strong>{translations.NewBusinessUnit.timeZone}</strong>
      </label>
      <div>
        <div>
          <select
            name="time_zone"
            className="w-full border rounded p-2 bg-slate-100 focus:ring-0 !border-gray-200 focus:border-gray-200"
            onChange={handleInputChange}
            required
          >
            <option value="">
              {translations.NewBusinessUnit.selectTimeZone}
            </option>
            {timeZones?.map((zone: { value: string; label: string }) => (
              <option key={zone.label} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end flex-col space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={copyHaccpPlan}
            onChange={handleCopyHaccpPlanChange}
            className="h-4 w-4 text-orange-400 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700 ml-2">
            {translations.NewBusinessUnit.copyHACCPPlanFromAnotherUnit}
          </span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={copyMonitoringTasks}
            onChange={handleCopyMonitoringTasksChange}
            className="h-4 w-4 text-orange-400 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700 ml-2">
            {translations.NewBusinessUnit.copyMonitoringTasksFromAnotherUnit}
          </span>
        </label>

        {searchVisible && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded w-full mb-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <select className="border p-2 rounded w-full">
              <option value="">
                {translations.NewBusinessUnit.selectAnOption}
              </option>
              {filteredCompanies.length > 0 ? (
                companies.map((comp: any) => (
                  <option key={comp.company_name} value={comp.id}>
                    {comp.company_name}
                  </option>
                ))
              ) : (
                <option value="">
                  {translations.NewBusinessUnit.noMatchingCompaniesFound}
                </option>
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBusinessUnitCreate;
