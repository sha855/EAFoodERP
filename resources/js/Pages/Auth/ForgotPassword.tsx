import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';

export default function ForgotPassword({ status }: { status?: Boolean }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };
  const baseUrl = window.location.origin;
  const logo: any = usePage().props?.settings;

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

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
              alt="img"
            />
            <div className="bg-white max-w-lg mx-auto shadow rounded-lg p-8">
              <div className="mb-10">
                <h3 className="font-medium text-[30px] leading-[1.6] tracking-[-0.02em] text-[#0f2137] text-left">
                  Forgot Password
                </h3>
                <p className=" font-regular text-base leading-[1.6] tracking-[-0.02em] text-[#0f2137] mb-2 text-left">
                  No problem. Just let us know your email address and we will
                  email you a password reset link that will allow you to choose
                  a new one.
                </p>
              </div>

              {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                  Reset link Sent to Your Email
                </div>
              )}
              <form onSubmit={submit}>
                <InputLabel
                  htmlFor="Email Id"
                  value="Email Id"
                  className="text-base mb-2"
                />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full shadow-none p-3.5"
                  isFocused={true}
                  onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                  <PrimaryButton
                    className="w-full justify-center p-4 h-12 flex gap-2.5 py-4 px-6  bg-btn-gradient rounded-full  items-center text-white hover:bg-gradient-red-org transition duration-500 !text-base shadow-none"
                    disabled={processing}
                  >
                    Submit
                  </PrimaryButton>
                </div>
                <p className="text-center mt-4 text-sm">
                  Already have an account?{' '}
                  <Link href={route('login')} className="text-[#ff8d6f]">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
