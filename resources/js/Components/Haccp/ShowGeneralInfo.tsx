import { router } from '@inertiajs/react';
import CommonButton from '../CommonButton';

const ShowGeneralInfo = ({ company, translations }: any) => {
  return (
    <div>
      <div className="space-y-6 showDetail">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-2 bg-gray-50 p-3 border-l-4 border-orange-400">
            1.1.1 Company
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 md:p-5">
            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.companyName}
              </strong>
              <div className="flex-grow">
                <span>{company.company_name}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.companyRegister}
              </strong>
              <div className="flex-grow">
                <span>{company.company_registration_number}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.address}
              </strong>
              <div className="flex-grow">
                <span>{company.address}</span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2 bg-gray-50 p-3 border-l-4 border-orange-400">
            1.1.2 Business Unit
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 md:p-5">
            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.businessUnitName}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.unit_name || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.address}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.address || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.phone}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.phone || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.email}
              </strong>
              <div className="flex-grow">
                <span>{company.email}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.generalmanager}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.manager || 'N/A'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.businessType}
              </strong>
              <div className="flex-grow">
                <span>{company.business_type?.name || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 bg-gray-50 p-3 border-l-4 border-orange-400">
              {translations.additionalBusiness}
            </h3>
            <div className="flex-grow">
              {company.business_unit &&
                company.business_unit.additional_business_activity_id &&
                JSON.parse(
                  company.business_unit.additional_business_activity_id
                ).map((activity: any, index: any) => (
                  <div key={index}>{activity.name}</div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:p-5">
            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.organic}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.is_organic ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.businessIs}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.unit_name || 'Other'}</span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">Custom Unit Name</strong>
              <div className="flex-grow">
                <span>
                  {company.business_unit?.custom_business_unit || 'Other'}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.mainGroup}
              </strong>
              <div className="flex-grow">
                <span>
                  {company.business_unit?.customer_group?.name || 'Other'}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                Custom Customer Group
              </strong>
              <div className="flex-grow">
                <span>
                  {company.business_unit?.custom_customer_group || 'Other'}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <strong className="mb-1 inline-block">
                {translations.noSeats}
              </strong>
              <div className="flex-grow">
                <span>{company.business_unit?.number_of_seats || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <CommonButton
          variant="outlined"
          onClick={() => router.get(route('haccp.index'))}
        >
          Back
        </CommonButton>
      </div>
    </div>
  );
};

export default ShowGeneralInfo;
