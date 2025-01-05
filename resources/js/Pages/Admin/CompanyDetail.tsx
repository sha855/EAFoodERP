import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import CommonButton from '@/Components/CommonButton';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PencilIcon } from 'lucide-react';
import UserManagementSidebar from '@/Components/Admin/UserManagementSidebar';
import Table from '@/Components/Table';
import TableViewIcon from '@mui/icons-material/TableView';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';

export default function CompanyDetail({ auth, companies, userId }: PageProps) {
  const [showTable, setShowTable] = useState(false);
  countries.registerLocale(enLocale);

  const getCountryName = (countryCode: string) => {
    return countries.getName(countryCode, 'en') || countryCode;
  };
  const columns = [
    { label: 'Company Name', key: 'company_name' },
    {
      label: 'Business Type',
      key: 'business_type',
      renderCell: (row: any) => row.business_type?.name || 'N/A',
    },
    {
      label: 'Country',
      key: 'country_name',
      renderCell: (row: any) => getCountryName(row.country_name),
    },
    {
      label: 'Total Employees',
      key: 'total_no_of_employees',
      renderCell: (row: any) => row.total_no_of_employees || 'N/A',
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (row: any) => (
        <div className="flex gap-1 relative right-[34px]">
          <CommonButton
            className="text-orange-500"
            variant="text"
            href={route('admin.company.edit', { company: row.id })}
          >
            <PencilIcon />
          </CommonButton>
          <CommonButton
            className="text-orange-500"
            variant="text"
            href={route('admin.company.detail', { company: row.id })}
          >
            <VisibilityIcon />
          </CommonButton>
        </div>
      ),
    },
  ];

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Details
        </h2>
      }
    >
      <Head title="User Details" />

      <div className="flex ">
        <UserManagementSidebar />

        <div className="flex-1">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold">Company Details</h1>
            <CommonButton
              className="text-orange-500"
              variant="outlined"
              onClick={() => setShowTable(!showTable)}
            >
              {showTable ? <ViewComfyIcon /> : <TableViewIcon />}
            </CommonButton>
          </div>
          <div className="p-8 bg-white rounded-b-md">
            {showTable ? (
              <Table
                columns={columns}
                datas={companies}
                route={route('admin.companies', { user: userId })}
              />
            ) : (
              <div className="bg-white rounded-b-md  !mt-0">
                {companies.data && companies.data.length > 0 ? (
                  companies.data.map((company: any, index: number) => (
                    <div key={company.id} className="mb-8">
                      <h2 className="text-xl font-semibold mb-6">
                        Company {index + 1}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                          <strong className="sm:w-2/3">Company Name:</strong>{' '}
                          <span className="sm:w-1/3">
                            {company.company_name}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                          <strong className="sm:w-2/3">Business Type:</strong>{' '}
                          <span className="sm:w-1/3">
                            {company.business_type?.business_type || 'N/A'}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                          <strong className="sm:w-2/3">Country:</strong>{' '}
                          <span className="sm:w-1/3">
                            {getCountryName(company.country_name)}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-2 bg-stone-100 p-3	rounded-md border-l-2 border-orange-400">
                          <strong className="sm:w-2/3">Total Employees:</strong>{' '}
                          <span className="sm:w-1/3">
                            {company.total_no_of_employees || 'N/A'}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-4">
                        <CommonButton
                          className="flex items-center gap-1 bg-gradient-org-red !border-0"
                          variant="outlined"
                          href={route('admin.company.edit', {
                            company: company.id,
                          })}
                        >
                          <PencilIcon className="w-4 h-4" /> Edit Company
                        </CommonButton>

                        <CommonButton
                          className="flex items-center gap-1 !bg-black text-white !border-0"
                          variant="outlined"
                          href={route('admin.company.detail', {
                            company: company.id,
                          })}
                        >
                          <VisibilityIcon className="w-4 h-4" /> View Detail
                        </CommonButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No company details available.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
