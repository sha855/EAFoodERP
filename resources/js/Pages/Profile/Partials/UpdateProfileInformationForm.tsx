import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = '',
}: {
  mustVerifyEmail: boolean;
  status?: string;
  className?: string;
}) {
  const user = usePage<PageProps>().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: user.name,
      email: user.email,
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'));
  };

  return (
    <section className={className}>
      <div className=" p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
        <h2 className="text-lg font-bold text-gray-900">Profile Information</h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </div>

      <div className="px-8 py-4">
        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <InputLabel htmlFor="name" value="Name" className="mb-2" />

            <TextInput
              id="name"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 block w-full border-gray-300"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
              isFocused
              autoComplete="name"
            />

            <InputError className="mt-2" message={errors.name} />
          </div>

          <div>
            <InputLabel
              htmlFor="email"
              value="Email"
              className="mb-2 text-lg"
            />

            <TextInput
              id="email"
              type="email"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 block w-full border-gray-300"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              autoComplete="username"
            />

            <InputError className="mt-2" message={errors.email} />
          </div>

          {mustVerifyEmail && user.email_verified_at === null && (
            <div>
              <p className="text-sm mt-2 text-gray-800">
                Your email address is unverified.
                <Link
                  href={route('verification.send')}
                  method="post"
                  as="button"
                  className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Click here to re-send the verification email.
                </Link>
              </p>

              {status === 'verification-link-sent' && (
                <div className="mt-2 font-medium text-sm text-custom-green-600">
                  A new verification link has been sent to your email address.
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 pt-16">
            <PrimaryButton
              className="px-5 py-3 bg-gradient-org-red border-0 text-lg"
              disabled={processing}
            >
              Save
            </PrimaryButton>

            <Transition
              show={recentlySuccessful}
              enter="transition ease-in-out"
              enterFrom="opacity-0"
              leave="transition ease-in-out"
              leaveTo="opacity-0"
            >
              <p className="text-sm text-gray-600">Saved.</p>
            </Transition>
          </div>
        </form>
      </div>
    </section>
  );
}
