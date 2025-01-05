import { InfoIcon } from 'lucide-react';
import React from 'react';

interface BusinessUnitDetailProps {
  businessUnitDetail: any;
  userEmail: string;
  translations: any;
}

const BusinessUnitDetail: React.FC<BusinessUnitDetailProps> = ({
  businessUnitDetail,
  userEmail,
  translations,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 mt-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.businessUnitName}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.company_name || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.address}
        </strong>
        <span className="sm:w-2/3">{businessUnitDetail.address || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.country}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.country_name || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.phone}
        </strong>
        <span className="sm:w-2/3">{businessUnitDetail.phone || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.email}
        </strong>
        <span className="sm:w-2/3">{businessUnitDetail.email || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3 in">
          {translations.BusinessUnitDetail.workEmailForNotifications}
          <span>
            {' '}
            <InfoIcon className="w-5 h-4 text-orange-400 mr-3 mt-3" />
          </span>
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.work_email_for_notification || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.representativePerson}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.representative_person || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.businessType}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.business_type_id || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.typeOfLocation}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.total_no_of_business_locations || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.numberOfEmployees}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.total_no_of_employees || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.preferredLanguage}
        </strong>
        <span className="sm:w-2/3">
          {businessUnitDetail.preferred_language || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">
          {translations.BusinessUnitDetail.timeZone}
        </strong>
        <span className="sm:w-2/3">{businessUnitDetail.time_zone || '-'}</span>
      </div>
    </div>
  );
};

export default BusinessUnitDetail;
