import { FormEventHandler } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import Container from '@/Components/Container';

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };
  const baseUrl = window.location.origin;

  const logo: any = usePage().props?.settings;

  return (
    <GuestLayout>
      <Head title="Log in" />

      <div className="bg-login min-h-screen">
        <div className="flex  items-center h-screen	 relative z-50 w-full mx-auto">
          <div className="hidden md:inline-block lg:inline-block md:basis-2/4 lg:basis-2/4">
            <div className=" h-screen bg-gradient-org-red  flex justify-center items-center">
              <div>
                <img
                  className="w-2/5 md:w-4/5 lg:w-2/5 mx-auto"
                  src="/assets/img/login-img.png"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-3/5 lg:basis-2/4 p-4 md:p-6 lg:p-10">
            <img
              className="w-2/5 md:w-2/5 lg:w-1/5 mx-auto mb-8"
              src={`${baseUrl}/storage/${logo?.full_logo_path}`}
              alt="Logo"
            />

            <div className="bg-white max-w-lg mx-auto shadow rounded-lg p-8">
              <div className="mb-10">
                <h3 className="font-medium text-[30px] leading-[1.6] tracking-[-0.02em] text-[#0f2137] text-left">
                  {' '}
                  Sign In
                </h3>
                <p className=" font-regular text-base leading-[1.6] tracking-[-0.02em] text-[#0f2137] mb-2 text-left">
                  Enter your email and password to sign in
                </p>
              </div>

              {status && (
                <div className="mb-4 font-medium text-sm text-custom-green-600">
                  {status}
                </div>
              )}

              <form onSubmit={submit}>
                <div>
                  <InputLabel
                    htmlFor="email"
                    value="Email"
                    className="text-base mb-2"
                  />

                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full shadow-none p-3.5"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                  />

                  <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="password"
                    value="Password"
                    className="text-base mb-2"
                  />

                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full shadow-none p-3.5"
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <Checkbox
                      name="remember"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ms-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </div>

                  <div>
                    {canResetPassword && (
                      <Link
                        href={route('password.request')}
                        className="  text-gray-600 hover:text-[#ff8d6f] text-sm"
                      >
                        Forgot your password?
                      </Link>
                    )}
                  </div>
                </div>

                <div className=" mt-6">
                  <PrimaryButton
                    className="w-full justify-center p-4 h-12 flex gap-2.5 py-4 px-6  bg-btn-gradient rounded-full  items-center text-white hover:bg-gradient-red-org transition duration-500 !text-base shadow-none"
                    disabled={processing}
                  >
                    Log in
                  </PrimaryButton>
                  <p className="text-center mt-4 text-sm	">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-[#ff8d6f]">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
