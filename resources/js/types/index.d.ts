export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

export type PageProps<T extends Record<string, any> = Record<string, any>> =
  T & {
    auth: {
      user: User;
      selectedCompany: {
        company_registration_number: any;
        id: number;
        company_name: string;
      };
    };
  };
