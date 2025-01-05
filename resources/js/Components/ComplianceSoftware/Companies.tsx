import { CompaniesProps } from '@/types/feature';
import React from 'react';

const Companies = ({ CompaniesImg }: CompaniesProps) => {
  return (
    <div className="text-center">
      <img className="opacity-60 mx-auto" src={CompaniesImg} alt="img" />
    </div>
  );
};

export default Companies;
