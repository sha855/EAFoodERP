import React, { useState, useRef, FormEvent } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { FaRegCopy } from 'react-icons/fa6';
import { IoMdDownload } from 'react-icons/io';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import NotificationMessage from '@/Components/NotificationMessage';

interface TwoFactorData {
  qr: string | null;
  secretKey: string | null;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

export default function TwoFactorAuthentication() {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isConfirming2FA, setIsConfirming2FA] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [areRecoveryCodesVisible, setAreRecoveryCodesVisible] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState<TwoFactorData>({
    qr: null,
    secretKey: null,
  });
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [is2FAHidden, setIs2FAHidden] = useState(false);

  const passwordInput = useRef<HTMLInputElement>(null);
  const auth: any = usePage().props.auth;

  const { data, setData, post, processing, reset, errors } = useForm({
    secretKey: '',
    code: '',
  });

  const enable2FA = () => setIsConfirming2FA(true);

  const handle2FASubmit = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(route('two.factor.authentication.enable'), { password })
      .then((response) => {
        if (response.data) {
          closeModal();
          setIs2FAHidden(true);
          setTwoFactorData({
            qr: response.data.qr,
            secretKey: response.data.secretKey,
          });
          setData('secretKey', response.data.secretKey);
        }
      })
      .catch((error) => setPasswordError(error.response.data.message));
  };

  const closeModal = () => {
    setIsConfirming2FA(false);
    reset();
  };

  const cancel2FA = () => setIs2FAHidden(false);

  const confirm2FA = (e: FormEvent) => {
    e.preventDefault();
    post(route('two.factor.authentication.confirm'), {
      onSuccess: () => setIs2FAHidden(false),
    });
  };

  const disable2FA = (e: FormEvent) => {
    post(route('two.factor.authentication.disable'), {
      onSuccess: () => setIs2FAHidden(false),
    });
  };

  const showRecoveryCodes = () => setIsPasswordModalOpen(true);

  const verifyPassword = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(route('profile.confirmable.password'), { password })
      .then((response) => {
        if (response.data.success) {
          setIsPasswordModalOpen(false);
          setAreRecoveryCodesVisible(true);
        }
      })
      .catch((error) => setPasswordError(error.response.data.message));
  };

  const copyRecoveryCodes = (e: React.MouseEvent) => {
    e.preventDefault();
    const codes = auth?.user?.two_factor_recovery_codes?.join('\n') || '';
    navigator.clipboard
      .writeText(codes)
      .then(() => setNotification({ message: 'Copied!', type: 'success' }))
      .catch((error) => console.error('Failed to copy: ', error));
  };

  const downloadRecoveryCodes = (e: React.MouseEvent) => {
    e.preventDefault();
    const codes = auth?.user?.two_factor_recovery_codes?.join('\n') || '';
    if (codes) {
      const blob = new Blob([codes], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'recovery-codes.txt';
      link.click();
      URL.revokeObjectURL(link.href);
    } else {
      console.error('No recovery codes available to download.');
    }
  };

  const regenerateRecoveryCode = () => {
    post(route('regenerate.recovery'), {
      onSuccess: () => {},
    });
  };

  return (
    <section className="space-y-6">
      {!is2FAHidden && (
        <>
          <header>
            <h2 className="text-lg font-medium text-gray-900 py-3">
              Two Factor Authentication
            </h2>
            <p>
              Add additional security to your account using two-factor
              authentication.
            </p>
            <h4 className="py-3">
              You have not enabled two-factor authentication.
            </h4>
            <p className="mt-1 text-sm text-gray-600">
              When two-factor authentication is enabled, you will be prompted
              for a secure, random token during authentication. You may retrieve
              this token from your phone's Google Authenticator application.
            </p>
          </header>

          {areRecoveryCodesVisible &&
            auth?.user?.is_two_factor_enabled === 1 && (
              <div className="bg-black grid grid-cols-1 gap-0 text-white p-4 rounded-lg w-full">
                {auth?.user?.two_factor_recovery_codes?.map(
                  (item: string, index: number) => <div key={index}>{item}</div>
                )}
                <div className="flex gap-3 justify-end">
                  <FaRegCopy
                    onClick={copyRecoveryCodes}
                    className="cursor-pointer"
                  />
                  <IoMdDownload
                    onClick={downloadRecoveryCodes}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}

          {auth?.user?.is_two_factor_enabled ? (
            <>
              {areRecoveryCodesVisible ? (
                <PrimaryButton
                  onClick={regenerateRecoveryCode}
                  className="mr-5"
                >
                  Regenerate Recovery
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={showRecoveryCodes} className="mr-5">
                  Show Recovery Codes
                </PrimaryButton>
              )}
              <DangerButton onClick={disable2FA}>Disable</DangerButton>
            </>
          ) : (
            <PrimaryButton onClick={enable2FA}>Enable</PrimaryButton>
          )}
        </>
      )}

      {is2FAHidden && (
        <header>
          <form onSubmit={confirm2FA} className="p-6">
            <h2 className="text-lg py-3">Two Factor Authentication Enabled</h2>
            <span>
              Add additional security to your account using two factor
              authentication.
            </span>

            <h3 className="text-lg py-4">
              Finish enabling two factor authentication.
            </h3>
            <span>
              When two factor authentication is enabled, you will be prompted
              for a secure, random token during authentication. You may retrieve
              this token from your phone's Google Authenticator application.
            </span>

            <div className="py-3">
              To finish enabling two factor authentication, scan the following
              QR code using your phone's authenticator application or enter the
              setup key and provide the generated OTP code.
            </div>

            <img src={twoFactorData?.qr || ''} alt="qr" />

            <span>Setup Key: {twoFactorData?.secretKey}</span>
            <input
              type="hidden"
              name="secretKey"
              value={twoFactorData?.secretKey || ''}
            />
            <div className="mt-6">
              <InputLabel htmlFor="code" value="Code" className="sr-only" />
              <TextInput
                id="code"
                type="number"
                name="code"
                className="mt-1 block w-[280px]"
                placeholder="Code"
                value={data.code}
                onChange={(e) => setData('code', e.target.value)}
              />
              <InputError message={errors.code} className="mt-2" />
            </div>

            <div className="mt-6 flex justify-start">
              <SecondaryButton onClick={cancel2FA}>Cancel</SecondaryButton>
              <PrimaryButton className="ms-3" disabled={processing}>
                Confirm
              </PrimaryButton>
            </div>
          </form>
        </header>
      )}

      <Modal show={isPasswordModalOpen} onClose={closeModal}>
        <form onSubmit={verifyPassword} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            This is a secure area of the application. Please confirm your
            password before continuing.
          </h2>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />
            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-3/4"
              placeholder="Password"
            />
            <InputError message={passwordError} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            <PrimaryButton className="ms-3" disabled={processing}>
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      <Modal show={isConfirming2FA} onClose={closeModal}>
        <form onSubmit={handle2FASubmit} className="p-6">
          <h2 className="text-lg font-medium text-gray-900">
            This is a secure area of the application. Please confirm your
            password before continuing.
          </h2>

          <div className="mt-6">
            <InputLabel
              htmlFor="password"
              value="Password"
              className="sr-only"
            />
            <TextInput
              id="password"
              type="password"
              name="password"
              ref={passwordInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-3/4"
              placeholder="Password"
            />
            <InputError message={passwordError} className="mt-2" />
          </div>

          <div className="mt-6 flex justify-end">
            <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
            <PrimaryButton className="ms-3" disabled={processing}>
              Confirm
            </PrimaryButton>
          </div>
        </form>
      </Modal>

      {notification && (
        <NotificationMessage
          message={notification.message}
          onClose={() => setNotification(null)}
          type={notification.type}
        />
      )}
    </section>
  );
}
