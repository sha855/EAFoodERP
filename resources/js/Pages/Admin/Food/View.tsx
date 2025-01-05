import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import FoodSidebar from '@/Components/FoodManagement/foodSidebar';

export default function FoodBusinessViews({ foodBusinesses }: PageProps) {
  const auth: any = usePage().props.auth;
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          View Food Business Entities
        </h2>
      }
    >
      <Head title="View Food Businesses" />

      <div className="flex ">
        <FoodSidebar />
        <div className="flex-1 p-4 bg-gray-50">
          <div className="flex justify-between items-end py-3 px-4 w-full">
            <h1 className="text-xl font-bold">Food Business Show</h1>
          </div>

          <div className="space-y-6">
            {foodBusinesses.length > 0 ? (
              foodBusinesses.map((business: any) => (
                <div
                  key={business.id}
                  className="p-6 bg-white shadow-md rounded-lg"
                >
                  <h1 className="text-xl font-bold">{business.name}</h1>
                  <p className="text-gray-600">{business.description}</p>

                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                      Food Business Additional Activities:
                    </h2>
                    <ul className="list-disc list-inside ml-5">
                      {business.additional_activities.map((activity: any) => (
                        <li key={activity.id} className="text-gray-700">
                          {activity.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xl font-semibold">
                      Food Business Units:
                    </h2>
                    <ul className="list-disc list-inside ml-5">
                      {business.units.map((unit: any) => (
                        <li key={unit.id} className="text-gray-700">
                          {unit.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h2 className="text-xl font-semibold text-gray-600">
                  No Data Available
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
