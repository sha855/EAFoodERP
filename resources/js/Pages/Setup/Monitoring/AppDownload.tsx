import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupMonitoringSidebar from '@/Pages/Setup/Monitoring/Partials/SetupMonitoringSidebar';
import CommonButton from '@/Components/CommonButton';

export default function AppDownload({ auth }: PageProps) {
  const isShow = route()?.routeParams?.hide;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Download FoodDocs App</h2>}
    >
      <Head title="Rooms" />

      <div className="flex">
        {!isShow && <SetupMonitoringSidebar />}

        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">Download FoodDocs App</h3>
            {isShow && (
              <CommonButton href={route('monitor')} variant="success">
                Done
              </CommonButton>
            )}
          </div>

          <div className="p-4">
            <div className="grid items-center grid-cols-1 md:grid-cols-2">
              <div>
                <p className="text-xl font-light text-black">
                  See how the daily tasks are shown and filled in using our app.
                  Scan this QR code or search “FoodDocs” in your mobile’s app
                  store.
                </p>
              </div>
              <div className="text-center flex justify-center gap-4">
                <img className="w-48 h-48" src="/assets/img/qr-code.png" />
              </div>
            </div>
            <div className="flex justify-center">
              <img className="w-64 h-64" src="/assets/img/app.png" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
