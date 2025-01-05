import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';
import { CommonIcon } from '@/Components/CommonIcon';
import NavLink from '@/Components/NavLink';
import CommonButton from '@/Components/CommonButton';

export default function verification({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Download FoodDocs App</h2>}
    >
      <Head title="Rooms" />

      <div className="flex">
        <SetupMonitoringSidebar />

        <div className="flex-1 bg-white rounded-lg">
          {/*-----------------*/}
          <div className="p-4">
            <div className="w-full flex justify-start p-10">
              <div className="flex gap-3 items-center">
                <CommonIcon
                  icon="GoShieldCheck"
                  className="fill-primary"
                  size={70}
                />
                <div>
                  <h1 className="text-3xl font-extrabold">Verify Tasks</h1>
                  <h5 className="font-medium">
                    Please review this list of tasks
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center pb-10">
              <img
                src="/assets/img/no-verification-set.svg"
                className="aspect-square max-w-md"
                alt="verify_svg"
              />
              <div className="max-w-lg text-center flex-col flex gap-4">
                <h1 className="text-lg  font-bold">
                  Want to install task Verification ?
                </h1>
                <div className="text-sm font-semibold">
                  <p>
                    Task verification is critical to ensure staff complete their
                    activities according to food safety requirements.
                  </p>
                  <p>
                    Once a log has been verified, it cannot be changed or
                    deleted.{' '}
                  </p>
                </div>

                <NavLink
                  href={'/'}
                  className="text-primary  text-base  font-semibold  hover:underline"
                >
                  Read more about verification and how to set it up.
                </NavLink>
              </div>
              <CommonButton
                href={route('setup.monitor.task')}
                variant="success"
                className="mt-10 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-white"
              >
                Set up Verification
              </CommonButton>
            </div>
          </div>

          {/*-----------------*/}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
