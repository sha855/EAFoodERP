import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({
  className = '',
}: {
  className?: string;
}) {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  const updatePassword: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: (errors) => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <section className={className}>
      <div className="p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
        <h2 className="text-lg font-bold text-gray-900">Update Password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </p>
      </div>

      <div className="px-8 py-4">
        <form onSubmit={updatePassword} className="mt-6 space-y-3">
          <div>
            <InputLabel
              htmlFor="current_password"
              value="Current Password"
              className="block font-medium text-sm text-gray-700 mb-2"
            />

            <TextInput
              id="current_password"
              ref={currentPasswordInput}
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              type="password"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 block w-full border-gray-300"
              autoComplete="current-password"
            />

            <InputError message={errors.current_password} className="mt-2" />
          </div>

          <div>
            <InputLabel
              htmlFor="password"
              value="New Password"
              className="mb-2"
            />

            <TextInput
              id="password"
              ref={passwordInput}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              type="password"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 block w-full border-gray-300"
              autoComplete="new-password"
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div>
            <InputLabel
              htmlFor="password_confirmation"
              value="Confirm Password"
              className="mb-2"
            />

            <TextInput
              id="password_confirmation"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              type="password"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 block w-full border-gray-300"
              autoComplete="new-password"
            />

            <InputError
              message={errors.password_confirmation}
              className="mt-2"
            />
          </div>

          <div className="flex items-center gap-4 pt-8">
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
