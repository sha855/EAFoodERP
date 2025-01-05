import { FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FaCheck } from 'react-icons/fa6';
import Checkbox from '@/Components/Checkbox';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  const baseUrl = window.location.origin;

  const logo: any = usePage().props?.settings;
  return (
    <GuestLayout>
      <Head title="Register" />
      <div className="bg-login min-h-screen">
        <div className="flex  items-center justify-center h-screen relative z-50 w-full mx-auto">
          <div className="hidden md:inline-block lg:inline-block md:basis-2/4 lg:basis-2/4">
            <div className="h-screen bg-gradient-org-red  flex justify-center items-center">
              <div>
                <img
                  className="w-2/5 md:w-4/5 lg:w-2/5 mx-auto"
                  src="/assets/img/login-img.png"
                  alt="img"
                />
                <div className="md:max-w-[90%] lg:max-w-[75%] mx-auto">
                  <h3 className="md:text-2xl lg:text-4xl font-extrabold text-white mb-5 text-left">
                    "Your all-in-one solution htmlFor food safety"
                  </h3>
                  <ul>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaCheck />
                      "Develop a HACCP plan in just 2 hours"
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaCheck />
                      "Utilize expert-designed monitoring sheets"
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaCheck />
                      "Securely store all your documents in one place"
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-3/5 lg:basis-2/4 p-4 md:p-6 lg:p-10">
            <img
              className="w-2/5 md:w-2/5 lg:w-1/5 mx-auto mb-8"
              src={`${baseUrl}/storage/${logo?.full_logo_path}`}
              alt="Logo"
            />
            <div className="bg-white max-w-lg mx-auto shadow rounded-lg py-5 px-8">
              <div>
                {/* Step 1 */}
                <div className="mb-6">
                  <h3 className="font-medium text-[30px] leading-[1.6] tracking-[-0.02em] text-[#0f2137] text-left">
                    Start your free trial
                  </h3>
                  <p className="font-regular text-base leading-[1.6] tracking-[-0.02em] text-[#0f2137] mb-2 text-left">
                    No credit card required
                  </p>
                </div>

                <form onSubmit={submit}>
                  <div>
                    <InputLabel
                      htmlFor="name"
                      value="Name"
                      className="block font-medium text-gray-700 text-base mb-2"
                    />
                    <TextInput
                      id="name"
                      name="name"
                      value={data.name}
                      className="mt-1 block w-full shadow-none p-3"
                      autoComplete="name"
                      isFocused={true}
                      onChange={(e) => setData('name', e.target.value)}
                      required
                    />
                    <InputError message={errors.name} className="mt-2" />
                  </div>

                  <div className="mt-4">
                    <InputLabel
                      htmlFor="email"
                      value="Email"
                      className="block font-medium text-gray-700 text-base mb-2"
                    />
                    <TextInput
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      className="mt-1 block w-full shadow-none p-3"
                      autoComplete="username"
                      onChange={(e) => setData('email', e.target.value)}
                      required
                    />
                    <InputError message={errors.email} className="mt-2" />
                  </div>

                  <div className="flex justify-between gap-4">
                    <div className="mt-4 w-full">
                      <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="block font-medium text-gray-700 text-base mb-2"
                      />
                      <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full shadow-none p-3"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                      />
                      <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="mt-4 w-full">
                      <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="block font-medium text-gray-700 text-base mb-2"
                      />
                      <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full shadow-none p-3"
                        autoComplete="new-password"
                        onChange={(e) =>
                          setData('password_confirmation', e.target.value)
                        }
                        required
                      />
                      <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mt-5 flex items-center">
                      <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        By signing up you agree to our{' '}
                        <Link href="#" className="text-[#ff8d6f]">
                          terms of use
                        </Link>{' '}
                        and{' '}
                        <Link href="#" className="text-[#ff8d6f]">
                          Privacy policy.
                        </Link>
                      </span>
                    </div>

                    <div className="mt-5">
                      <PrimaryButton
                        type="submit"
                        className="w-full justify-center p-4 h-12 flex gap-2.5 py-4 px-6 bg-btn-gradient rounded items-center text-white hover:bg-gradient-red-org transition duration-500 !text-base shadow-none mt-8"
                        disabled={processing || !data.remember}
                      >
                        Next
                      </PrimaryButton>
                    </div>

                    <p className="text-center mt-4 text-sm">
                      Already have an account?{' '}
                      <Link href={route('login')} className="text-[#ff8d6f]">
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
