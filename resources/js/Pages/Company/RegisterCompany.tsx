import { FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import { Head, useForm, router } from '@inertiajs/react';
import { FaCheck, FaRegUser } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  TextField,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

export default function RegisterCompany({
  businessTypes,
  countries,
  auth,
  employeeOptions,
  locationOptions,
}: {
  businessTypes: any;
  countries: Record<string, string>;
  auth: { user: any };
  employeeOptions: string[];
  locationOptions: string[];
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [error, setError] = useState<{
    general?: string;
    company_name?: string;
    business_type_id?: string;
    country_name?: string;
    state?: string;
    total_no_of_employees?: string;
    total_no_of_business_locations?: string;
  } | null>(null);
  const [states, setStates] = useState<{ code: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, setData } = useForm({
    user_id: auth.user.id,
    company_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    business_type_id: '',
    country_name: '',
    state: '',
    total_no_of_employees: '',
    total_no_of_business_locations: '',
  });

  const submit: FormEventHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('register-company', data);
      router.get('register-phone');
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors);
      } else {
        setError({ general: error.message });
      }
    }
  };

  const [countryOptions, setCountryOptions] = useState<[string, string][]>([]);
  const fetchStates = async (code: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/country-state/${code}`);
      const result = response.data;
      if (typeof result === 'object' && result !== null) {
        const stateArray = Object.keys(result).map((key) => ({
          code: key,
          name: result[key],
        }));
        setStates(stateArray);
      } else {
        console.error('Unexpected data format:', result);
        setStates([]);
      }
    } catch (error) {
      console.error('Error fetching states:', error);
      setStates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const selectedCountry = event.target.value;
    setData({ ...data, country_name: selectedCountry, state: '' });
    fetchStates(selectedCountry);
  };

  useEffect(() => {
    const countryArray = Object.entries(countries);
    setCountryOptions(countryArray);
  }, [countries]);

  const countryOptionss = Object.entries(countries).map(([code, name]) => ({
    value: code,
    label: name,
  }));

  const selectedOption = countryOptionss.find(
    (option) => option.value === data.country_name
  );

  const formattedStates = states.map(({ code, name }) => ({
    value: code,
    label: name,
  }));

  return (
    <GuestLayout>
      <Head title="Register Company" />
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
                      <FaCheck />
                      Develop a HACCP plan in just 2 hours
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaCheck />
                      Utilize expert-designed monitoring sheets
                    </li>
                    <li className="flex items-center gap-2 mb-3 text-md md:text-lg lg:text-lg text-white">
                      <FaCheck />
                      Securely store all your documents in one place
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-full md:basis-3/5 lg:basis-2/4 p-4 md:p-6 lg:p-10">
            <img
              className="w-2/5 md:w-2/5 lg:w-1/5 mx-auto mb-8"
              src="/assets/img/header-logo-white.svg"
              alt="img"
            />
            <div className="bg-white max-w-lg mx-auto shadow rounded-lg py-5 px-8">
              <div className="flex justify-end">
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  endIcon={
                    <KeyboardArrowDownIcon className="text-custom-orange" />
                  }
                  className="flex items-center gap-1 p-0 text-custom-orange"
                >
                  <FaRegUser className="text-custom-orange" />
                  <p className="text-custom-orange">{auth.user.name}</p>
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
                  About your company
                </h3>
                <p className="font-regular text-base leading-[1.6] tracking-[-0.02em] text-[#0f2137] mb-2 text-left">
                  You can use this information to set up your system and update
                  it whenever necessary.
                </p>
              </div>

              <form onSubmit={submit}>
                {error && typeof error === 'string' && (
                  <p className="text-red-500">{error}</p>
                )}

                <div className="mb-4">
                  <InputLabel
                    htmlFor="name"
                    className="block font-medium text-gray-700 text-base mb-2"
                  >
                    Company Name
                  </InputLabel>
                  <TextField
                    id="name"
                    name="name"
                    value={data.company_name}
                    onChange={(e) =>
                      setData({ ...data, company_name: e.target.value })
                    }
                    className="mt-1 block w-full shadow-none p-3"
                    autoFocus
                  />
                  {error?.company_name && (
                    <p className="text-red-500">{error?.company_name[0]}</p>
                  )}
                </div>

                <div className="mb-4">
                  <InputLabel
                    htmlFor="businessType"
                    className="block font-medium text-gray-700 text-base mb-2"
                  >
                    Business Type
                  </InputLabel>
                  <FormControl fullWidth>
                    <MuiSelect
                      id="businessType"
                      value={data.business_type_id}
                      onChange={(e) =>
                        setData({ ...data, business_type_id: e.target.value })
                      }
                      displayEmpty
                    >
                      <MuiMenuItem value="" disabled>
                        Select Business Type
                      </MuiMenuItem>
                      {businessTypes.map((type: any) => (
                        <MuiMenuItem key={type.id} value={type.id}>
                          {type.name} {/* Display the business type name */}
                        </MuiMenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                  {/* Specific validation error for the business type field */}
                  {error?.business_type_id && (
                    <p className="text-red-500">{error.business_type_id[0]}</p>
                  )}
                </div>

                <div className="flex justify-between gap-4">
                  <div className="mb-4 w-[45%]">
                    <InputLabel
                      htmlFor="country"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Country
                    </InputLabel>
                    <Select<OptionType>
                      id="country"
                      options={countryOptionss}
                      onChange={(selected) => {
                        setData({
                          ...data,
                          country_name: selected?.value || '',
                          state: '',
                        });
                        fetchStates(selected?.value || '');
                      }}
                      value={selectedOption}
                      placeholder="Select Country"
                    />
                    {error?.country_name && (
                      <p className="text-red-500">{error.country_name[0]}</p>
                    )}
                  </div>

                  <div className="mb-4 w-[45%]">
                    <InputLabel
                      htmlFor="state"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      State
                    </InputLabel>
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      <Select
                        id="state"
                        options={formattedStates}
                        onChange={(selected) =>
                          setData({ ...data, state: selected?.value || '' })
                        }
                        value={formattedStates.find(
                          (option) => option.value === data.state
                        )}
                        placeholder="Select State"
                        isDisabled={!formattedStates.length}
                      />
                    )}
                    {error?.state && (
                      <p className="text-red-500">{error.state[0]}</p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <InputLabel
                    htmlFor="totalEmployees"
                    className="block font-medium text-gray-700 text-base mb-2"
                  >
                    Total Employees
                  </InputLabel>
                  <div id="totalEmployees">
                    {employeeOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Radio
                            checked={data.total_no_of_employees === option}
                            onChange={(e) =>
                              setData({
                                ...data,
                                total_no_of_employees: e.target.value,
                              })
                            }
                            value={option}
                            name="totalEmployees"
                            color="primary"
                          />
                        }
                        label={option}
                      />
                    ))}
                  </div>
                  {error?.total_no_of_employees && (
                    <p className="text-red-500">
                      {error.total_no_of_employees[0]}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <InputLabel
                    htmlFor="totalLocations"
                    className="block font-medium text-gray-700 text-base mb-2"
                  >
                    Total Locations
                  </InputLabel>
                  <div id="totalLocations">
                    {locationOptions.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Radio
                            checked={
                              data.total_no_of_business_locations === option
                            }
                            onChange={(e) =>
                              setData({
                                ...data,
                                total_no_of_business_locations: e.target.value,
                              })
                            }
                            value={option}
                            name="totalLocations"
                            color="primary"
                          />
                        }
                        label={option}
                      />
                    ))}
                  </div>
                  {error?.total_no_of_business_locations && (
                    <p className="text-red-500">
                      {error.total_no_of_business_locations[0]}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <Button
                    type="submit"
                    variant="contained"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 false w-full justify-center p-4 h-12 flex gap-2.5 py-4 px-6 bg-btn-gradient rounded items-center text-white hover:bg-gradient-red-org transition duration-500 !text-base shadow-none mt-8"
                  >
                    Register
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}
