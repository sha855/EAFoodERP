interface CompanyDetail {
  id: number;
  user_id: number;
  company_name: string;
  country_name: string;
  business_type_id: number | null;
  total_no_of_employees: string | null;
  total_no_of_business_locations: string | null;
  company_registration_number: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  preferred_language: string | null;
  volume_units: string | null;
  weight_units: string | null;
  email: string | null;
  temperature_unit: string | null;
  monitoring: string | null;
  temperature_prefill: string | null;
  date_format: string | null;
  registration_number: string | null;
  vat_no: string | null;
}

interface RolePivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string;
  updated_at: string;
  pivot: RolePivot;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  phone_no: string | null;
  std_code: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  company_detail: CompanyDetail[];
  roles?: Role[];
}

interface SelectedCompany {
  id: number;
  user_id: number;
  company_name: string;
  country_name: string;
  business_type_id: number | null;
  total_no_of_employees: string | null;
  total_no_of_business_locations: string | null;
  company_registration_number: string | null;
  address: string | null;
  created_at: string;
  updated_at: string;
  preferred_language: string;
  volume_units: string;
  weight_units: string;
  email: string;
  temperature_unit: string;
  monitoring: string;
  temperature_prefill: string;
  date_format: string;
  registration_number: string;
  vat_no: string;
}

export interface UserSetupAuthDataTypes {
  user: User;
  roles: string[];
  selectedCompany: SelectedCompany;
}
