import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';
import TwoFactorAuthentication from '@/Pages/Profile/Partials/TwoFactorAuthentication';

export default function Edit({
  mustVerifyEmail,
  status,
  twoFactorData,
}: PageProps<{
  mustVerifyEmail: boolean;
  status?: string;
  twoFactorData: { qr: string; secretKey: string };
}>) {
  const auth: any = usePage().props.auth;
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Profile
        </h2>
      }
    >
      <Head title="Profile" />

      <Container>
        <div>
          <div className=" mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white  sm:rounded-lg">
                <UpdateProfileInformationForm
                  mustVerifyEmail={mustVerifyEmail}
                  status={status}
                />
              </div>

              <div className="bg-white  sm:rounded-lg">
                <UpdatePasswordForm />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="p-4 sm:p-8 bg-white  sm:rounded-lg">
                <DeleteUserForm />
              </div>

              <div className="p-4 sm:p-8 bg-white  sm:rounded-lg">
                <TwoFactorAuthentication />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
