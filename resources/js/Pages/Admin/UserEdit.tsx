import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState } from 'react';
import NotificationMessage from '@/Components/NotificationMessage';
import CommonButton from '@/Components/CommonButton';
import TextInput from '@/Components/TextInput';

export default function UserEdit({ auth, user }: PageProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { data, setData, patch, processing, errors } = useForm({
    name: user.name || '',
    email: user.email || '',
    std_code: user.std_code || '',
    phone_no: user.phone_no || '',
    email_verified_at: user.email_verified_at || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('admin.users.update', { user: user.id }), {
      onSuccess: () =>
        setNotification({
          message: 'User updated successfully!',
          type: 'success',
        }),
      onError: () =>
        setNotification({ message: 'Error updating user.', type: 'error' }),
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Edit
        </h2>
      }
    >
      <Head title="User Edit" />

      <div className="h-fit flex flex-col bg-gray-50 rounded shadow-md m-4 mt-20 max-w-7xl mx-auto">
        <div className="flex-1  space-y-6">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold ">Edit User Information</h1>
          </div>

          <form onSubmit={handleSubmit} className="!mt-0">
            <div className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <TextInput
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.name && (
                  <span className="text-red-600 text-sm">{errors.name}</span>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <TextInput
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                {errors.email && (
                  <span className="text-red-600 text-sm">{errors.email}</span>
                )}
              </div>

              <div>
                <div className="grid grid-cols-6 gap-8">
                  <div className="col-span-1">
                    <label
                      htmlFor="std_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country Code
                    </label>
                    <div className="flex space-x-4">
                      <TextInput
                        id="std_code"
                        type="text"
                        placeholder="Country Code"
                        value={data.std_code}
                        onChange={(e) => setData('std_code', e.target.value)}
                        className="mt-1 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                      />
                    </div>

                    {errors.std_code && (
                      <span className="text-red-600 text-sm">
                        {errors.std_code}
                      </span>
                    )}
                  </div>

                  <div className="col-span-5">
                    <label
                      htmlFor="phone_no"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <TextInput
                      id="phone_no"
                      type="text"
                      placeholder="Phone Number"
                      value={data.phone_no}
                      onChange={(e) => setData('phone_no', e.target.value)}
                      className="mt-1 block  px-3 py-2 border border-gray-300 rounded-md shadow-sm w-full"
                    />
                  </div>
                </div>
                {errors.phone_no && (
                  <span className="text-red-600 text-sm">
                    {errors.phone_no}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email_verified_at"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Verified
                </label>
                <TextInput
                  type="checkbox"
                  id="email_verified_at"
                  checked={data.email_verified_at}
                  onChange={(e) =>
                    setData(
                      'email_verified_at',
                      e.target.checked ? new Date().toISOString() : null
                    )
                  }
                  className="mt-1"
                />
                {errors.email_verified_at && (
                  <span className="text-red-600 text-sm">
                    {errors.email_verified_at}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 justify-end p-6 border-t border-slate-300">
              <CommonButton
                variant="outlined"
                className=" p-2 rounded"
                href={route('admin.users.index')}
              >
                Back
              </CommonButton>
              <CommonButton
                className=" p-2 rounded"
                type="submit"
                variant="success"
              >
                Update User
              </CommonButton>
            </div>
          </form>
        </div>
      </div>

      {/* Optional Notification Message */}
      {notification && (
        <NotificationMessage
          message={notification.message}
          onClose={() => setNotification(null)}
          type={notification.type}
        />
      )}
    </AuthenticatedLayout>
  );
}
