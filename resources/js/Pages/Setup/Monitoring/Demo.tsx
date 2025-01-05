import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';

export default function Demo({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Download FoodDocs App</h2>}
    >
      <Head title="Demo" />

      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center p-3 max-w-7xl w-full">
          <h1 className="text-3xl font-bold">
            Get to know FoodDocs - book a free demo
          </h1>
          <CommonButton href={route('monitor')} variant="success">
            Done
          </CommonButton>
        </div>
        <iframe
          className="max-w-7xl !w-full"
          height={1200}
          src="https://frontend.wpstk.com/demo"
          frameBorder="0"
        ></iframe>
      </div>
    </AuthenticatedLayout>
  );
}
