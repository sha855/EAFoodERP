import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PageProps } from '@/types';

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({});
  const { props } = usePage<PageProps>(); // Specify the PageProps type here
  const user = props.auth?.user;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <GuestLayout>
      <Head title="Email Verification" />
      <div className="bg-login min-h-screen">
        <div className="flex items-center justify-center h-screen relative z-50 w-full mx-auto">
          <div className="hidden md:inline-block lg:inline-block md:basis-2/4 lg:basis-2/4">
            <div className="h-screen bg-gradient-org-red flex justify-center items-center">
              <div>
                <img
                  className="w-2/5 md:w-4/5 lg:w-2/5 mx-auto"
                  src="/assets/img/login-img.png"
                  alt="img"
                />
                <div className="md:max-w-[90%] lg:max-w-[75%] mx-auto">
                  <h3 className="md:text-2xl lg:text-4xl font-extrabold text-white mb-5 text-left">
                    Your all-in-one solution for food safety
                  </h3>
                  <ul>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaRegUser /> Develop a HACCP plan in just 2 hours
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaRegUser /> Utilize expert-designed monitoring sheets
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaRegUser /> Securely store all your documents in one
                      place
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-3/5 lg:basis-2/4 p-4 md:p-6 lg:p-10">
            <div className="flex justify-end">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon className="text-orange" />}
                className="flex items-center gap-1 p-0 text-orange"
              >
                <FaRegUser className="text-orange" />
                <p className="text-orange">{user?.name}</p>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('logout'));
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
            <div className="mb-6">
              <h3 className="font-medium text-[30px] leading-[1.6] tracking-[-0.02em] text-[#0f2137] text-left">
                Verify your email...
              </h3>
            </div>

            <div className="mb-4 text-sm text-gray-600">
              Thanks for signing up! Before getting started, could you verify
              your email address by clicking on the link we just emailed to you?
              If you didn't receive the email, we will gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
              <div className="mb-4 font-medium text-sm text-green-600">
                A new verification link has been sent to the email address you
                provided during registration.
              </div>
            )}

            <form onSubmit={submit}>
              <div className="mt-4 flex items-center justify-between">
                <PrimaryButton disabled={processing}>
                  Resend Verification Email
                </PrimaryButton>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.get(route('logout'));
                  }}
                >
                  Logout
                </MenuItem>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
