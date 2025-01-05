import { Head, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler, useState } from 'react';

interface recoveryContentProps {
  heading: string;
  label: string;
  toggleName: string;
}

export default function TwoFactorAuthentication() {
  const { data, setData, post, processing, errors } = useForm({
    code: '',
    recoveryCode: '',
  });

  const [recoveryContent, setRecoveryContent] = useState<boolean>(true);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    const routeName = recoveryContent
      ? 'two.factor.authentication.verify'
      : 'two.factor.authentication.recovery.code';
    post(route(routeName));
  };

  const toggleHsendr = () => {
    setRecoveryContent(!recoveryContent);
  };

  const baseUrl = window.location.origin;

  const logo: any = usePage().props?.settings;

  return (
    <GuestLayout>
      <Head title="Two Factor Authentication" />
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
                <h3 className="font-medium text-[30px] leading-[1.6] tracking-[-0.02em] text-[#0f2137] text-left py-5">
                  Two Factor Authentication
                </h3>
                <p className=" font-regular text-base leading-[1.6] tracking-[-0.02em] text-[#0f2137] mb-5 text-left">
                  Please
                  {recoveryContent
                    ? 'confirm access to your account by entering the authentication code provided by your authenticator application.'
                    : 'Please confirm access to your account by entering one of your emergency recovery codes.'}
                </p>

                <form onSubmit={submit}>
                  {recoveryContent ? (
                    <>
                      <InputLabel
                        htmlFor="Code"
                        value="Code"
                        className="text-base mb-2"
                      />
                      <TextInput
                        id="code"
                        type="number"
                        name="code"
                        value={data.code}
                        className="mt-1 block w-full shadow-none p-3.5"
                        isFocused={true}
                        onChange={(e) => setData('code', e.target.value)}
                      />
                      <InputError message={errors.code} className="mt-2" />
                    </>
                  ) : (
                    <>
                      <InputLabel
                        htmlFor="recoveryCode"
                        value="Recovery Code"
                        className="text-base mb-2"
                      />
                      <TextInput
                        id="recoveryCode"
                        type="text"
                        name="recoveryCode"
                        value={data.recoveryCode}
                        className="mt-1 block w-full shadow-none p-3.5"
                        isFocused={true}
                        onChange={(e) =>
                          setData('recoveryCode', e.target.value)
                        }
                      />
                      <InputError
                        message={errors.recoveryCode}
                        className="mt-2"
                      />
                    </>
                  )}

                  <p className="mt-4 text-sm">
                    <span
                      onClick={toggleHsendr}
                      className="text-[#ff8d6f] underline cursor-pointer"
                    >
                      {recoveryContent
                        ? 'Use a recovery code'
                        : 'Use an authentication code'}
                    </span>
                  </p>

                  <div className="flex items-center justify-end mt-4">
                    <PrimaryButton
                      className="w-full justify-center p-4 h-12 flex gap-2.5 py-4 px-6  bg-btn-gradient rounded-full  items-center text-white hover:bg-gradient-red-org transition duration-500 !text-base shadow-none"
                      disabled={processing}
                    >
                      Verify
                    </PrimaryButton>
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
