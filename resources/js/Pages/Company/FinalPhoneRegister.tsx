import React, { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';

interface CountryCode {
  id: number;
  country: string;
  stdcode: string;
}

interface FormData {
  country: string;
  stdcode: string;
  phone: string;
  remember: boolean;
}

export default function FinalPhoneRegister({
  countryCodes,
  auth,
}: {
  countryCodes: CountryCode[];
  auth: { user: { name: string } };
}) {

    console.log(countryCodes);

  const [open, setOpen] = useState(false);
  const { data, setData, post, processing } = useForm<FormData>({
    country: countryCodes[0]?.country || '',
    stdcode: countryCodes[0]?.stdcode || '',
    phone: '',
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('phone.update'));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCountry = (selectedCountry: string) => {
    const selectedCountryData = countryCodes.find(
      (country) => country.country === selectedCountry
    );
    setData({
      ...data,
      country: selectedCountry,
      stdcode: selectedCountryData ? selectedCountryData.stdcode : '',
    });
    setIsOpen(false);
  };

  const filteredCountries = countryCodes.filter(
    (countryData) =>
      countryData.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      countryData.stdcode.includes(searchQuery)
  );

  return (
    <GuestLayout>
      <Head title="Register Company" />
      <div className="bg-login min-h-screen">
        <div className="flex items-center justify-center h-screen relative z-50 w-full mx-auto">
          <div className="hidden md:block lg:block md:basis-2/4 lg:basis-2/4">
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
            <div className="bg-white max-w-lg mx-auto shadow rounded-lg py-5 px-8">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2">
                  <div className="relative w-1/4">
                    <label
                      htmlFor="country"
                      className="block font-medium text-gray-700 text-base mb-2"
                    >
                      Country
                    </label>

                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center cursor-pointer text-xs px-2 py-3 border border-gray-300 rounded-md"
                    >
                      <img
                        src={`https://flagsapi.com/${data.country}/flat/64.png`}
                        alt={data.country}
                        className="inline-block h-6 w-6 mr-1"
                        onError={(e) =>
                          ((e as any).target.src = '/path/to/placeholder.png')
                        }
                      />
                      {data.stdcode}
                    </div>

                    {isOpen && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full p-2 border-b border-gray-300"
                        />

                        {filteredCountries.map((countryData) => (
                          <div
                            key={countryData.id}
                            onClick={() =>
                              handleSelectCountry(countryData.country)
                            }
                            className="flex items-center p-2 text-xs cursor-pointer hover:bg-gray-100"
                          >
                            <img
                              src={`https://flagsapi.com/${countryData.country}/flat/64.png`}
                              alt={countryData.country}
                              className="inline-block h-6 w-6 mr-1"
                              onError={(e) =>
                                ((e as any).target.src =
                                  '/path/to/placeholder.png')
                              }
                            />
                            {countryData.stdcode}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-3/4">
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block font-medium text-gray-700 text-base mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="number"
                        name="phone"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md p-3"
                        autoFocus
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                    id="remember"
                    className="h-4 w-4 text-custom-orange border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Get useful tips, news, and inspiration via email and SMS.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center p-4 h-12 bg-btn-gradient rounded text-white hover:bg-gradient-red-org transition duration-500 mt-8"
                  disabled={processing}
                >
                  {processing ? 'Processing...' : 'Finish'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
