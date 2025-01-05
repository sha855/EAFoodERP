import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { IoIosArrowForward } from 'react-icons/io';
import Container from '@/Components/Container';
import { Link, usePage } from '@inertiajs/react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Overview = ({
  usersCount,
  companiesCount,
  businessesCount,
}: PageProps) => {
  const auth: any = usePage().props.auth;
  interface AuthUser {
    roles?: { name: string }[];
    company_detail?: { company_name: string };
  }
  const isAdmin = (auth.user as AuthUser)?.roles?.some(
    (role) => role.name === 'admin'
  );

  const userChartData = {
    labels: ['Active Users', 'Inactive Users'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const companyChartData = {
    labels: ['Small', 'Medium', 'Large'],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ['#FF9A76', '#FFC785', '#FF6F61'],
      },
    ],
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Analytics Overview
        </h2>
      }
    >
      <Container>
        <div>
          <h1 className="pb-6 text-gray-900 text-xl md:text-2xl lg:text-3xl font-bold">
            Overview
          </h1>
          <div className="p-4 bg-orange-50 rounded-md text-center mb-5 border border-amber-200">
            {isAdmin ? (
              <h4 className="font-bold text-orange-400 text-md sm:text-xl">
                Welcome to the Super Admin Panel!
              </h4>
            ) : (
              <h4 className="font-bold text-orange-400 text-md sm:text-xl">
                Welcome to Your Panel
              </h4>
            )}
            <p className="text-gray-700 ">
              We're glad to have you here. Explore the analytics!
            </p>
          </div>
        </div>
      </Container>

      <Container>
        {isAdmin && (
          <div className="grid grid-cols-1 gap-6">
            <div className="p-0">
              <div className="text-left  px-0 sm:px-3 py-2 rounded-md mb-4 flex justify-between">
                <h3 className="text-lg font-bold mb-1">
                  {isAdmin
                    ? 'Super Admin'
                    : (auth?.selectedCompany?.company_name ?? 'No Company')}
                </h3>
                <p className="text-gray-600 bg-dusk text-white mb-0 px-4 py-2 rounded-md text-sm">
                  Last visit: 05.09.2024
                </p>
              </div>

              {/* Analytics Section */}
              {isAdmin && (
                <div className="grid grid-cols-3 gap-1 md:gap-4 lg:gap-4 mb-8 ">
                  <div className="p-2 md:p-4 lg:p-4 bg-white rounded-md text-center">
                    <h4 className="font-bold text-base sm:text-md">Users</h4>
                    <p className="text-xl">{usersCount}</p>
                  </div>
                  <div className="p-2 md:p-4 lg:p-4 bg-white rounded-md text-center">
                    <h4 className="font-bold text-base sm:text-md">
                      Companies
                    </h4>
                    <p className="text-xl">{companiesCount}</p>
                  </div>
                  <div className="p-2 md:p-4 lg:p-4 bg-white rounded-md text-center">
                    <h4 className="font-bold text-base sm:text-md">
                      Businesses
                    </h4>
                    <p className="text-xl">{businessesCount}</p>
                  </div>
                </div>
              )}

              {isAdmin && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div className="bg-white rounded-lg shadow overflow-y-auto">
                    <div className="flex justify-between items-center p-4 bg-zinc-200 rounded-t-md border-b border-slate-300">
                      <h3 className="text-lg font-semibold">User Analytics</h3>
                    </div>
                    <div className="px-4  py-12 md:px-6 md:py-16 lg:px-28 lg:py-16">
                      <Bar
                        className="!w-full !h-full sm!w-[155px] sm!h-[310px]"
                        data={userChartData}
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow overflow-y-auto">
                    <div className="flex justify-between items-center p-4 bg-zinc-200 rounded-t-md border-b border-slate-300">
                      <h3 className="text-lg font-semibold">
                        Company Size Distribution
                      </h3>
                    </div>
                    <div className="px-8  py-12 md:px-10 md:py-16 lg:px-40 lg:py-16">
                      <Pie
                        className="!w-full !h-full sm!w-[155px] sm!h-[310px]"
                        data={companyChartData}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 shadow mt-4 bg-white rounded-md">
              <div className="text-center mb-8">
                <h3 className="text-lg font-bold mb-1">
                  {isAdmin
                    ? 'Super Admin'
                    : (auth?.selectedCompany?.company_name ?? 'No Company')}
                </h3>
                <p className="text-gray-600">Last visit: 05.09.2024</p>
              </div>

              {!isAdmin && (
                <ul className="mt-4 space-y-2">
                  {[
                    { text: 'HACCP plan', active: true, path: route('haccp') },
                    {
                      text: 'Monitoring',
                      active: true,
                      path: route('monitor'),
                    },
                    {
                      text: 'Traceability',
                      active: false,
                      path: route('traceability'),
                    },
                    { text: 'Audits', active: false, path: route('audit') },
                    { text: 'Team', active: false, path: route('team') },
                  ].map((item, index) => (
                    <Link href={item.path} key={index}>
                      <li
                        key={index}
                        className="flex items-center justify-between p-4 !mt-0 cursor-pointer hover:bg-gray-100  border-t rounded-none border-gray-100	"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2 h-2 rounded-full ${item.active ? 'bg-red-500' : 'bg-gray-400'}`}
                          ></span>
                          <span
                            className={`font-medium ${item.active ? 'text-red-500' : 'text-gray-500'}`}
                          >
                            {item.text}
                          </span>
                        </div>
                        <span className="text-white w-6 h-6 bg-gradient-org-red rounded-full flex justify-center items-center">
                          <IoIosArrowForward />
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Container>
    </AuthenticatedLayout>
  );
};

export default Overview;
