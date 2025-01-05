import React from 'react';

const CompanyDetail = ({
  companyDetail,
  userEmail,
}: {
  companyDetail: any;
  userEmail: string;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Country</strong>
        <span className="sm:w-2/3">{companyDetail.country_name || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Company name</strong>
        <span className="sm:w-2/3">{companyDetail.company_name || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Company registration number</strong>
        <span className="sm:w-2/3">
          {companyDetail.registration_number || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">VAT No</strong>
        <span className="sm:w-2/3">{companyDetail.vat_no || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Address</strong>
        <span className="sm:w-2/3">{companyDetail.address || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Email</strong>
        <span className="sm:w-2/3">{companyDetail.email || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Preferred language</strong>
        <span className="sm:w-2/3">
          {companyDetail.preferred_language || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">System of volume units</strong>
        <span className="sm:w-2/3">{companyDetail.volume_units || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">System of weight units</strong>
        <span className="sm:w-2/3">{companyDetail.weight_units || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Temperature unit</strong>
        <span className="sm:w-2/3">
          {companyDetail.temperature_unit || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Monitoring</strong>
        <span className="sm:w-2/3">{companyDetail.monitoring || '-'}</span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Temperature pre-filling solution</strong>
        <span className="sm:w-2/3">
          {companyDetail.temperature_prefill || '-'}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
        <strong className="sm:w-2/3">Date format</strong>
        <span className="sm:w-2/3">{companyDetail.date_format || '-'}</span>
      </div>
    </div>
  );
};

export default CompanyDetail;
