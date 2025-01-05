export interface FutureCardProps {
  image: string;
  FeatureHeading: string;
  text: string;
}

export interface ServicesCardProps {
  ServiceImg: string;
  ServiceName: string;
  Point: string[];
  className?: string;
}

export interface CompaniesProps {
  CompaniesImg: string;
}

export interface CounterCardProps {
  UpTo: string;
  NumberCounter: string;
  Sign?: string;
  CounetrName: string;
  className?: string;
}

export interface QuoteCardProps {
  QuoteMsg: string;
}

export interface DrawerProps {
  isDrawerOpen: boolean;
  onClose: () => void;
  formContent: React.ReactNode | null;
  title: string;
}

export interface StatusCardProps {
  title: string;
  link: string;
  description: string;
  status: string;
}
