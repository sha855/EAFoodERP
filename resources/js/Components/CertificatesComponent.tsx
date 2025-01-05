import React from 'react';
import TextInput from '../Components/TextInput';
import CommonButton from '../Components/CommonButton';
import { Add as AddIcon } from '@mui/icons-material';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useRef } from 'react';

interface Certificate {
  training_id: number;
  certificate_file: string;
  certificate_issue_on: string;
  certificate_valid_until: string;
}

interface CertificatesProps {
  certificates: Certificate[];
}

const fileInputRefHealthCertificate = useRef<HTMLInputElement | null>(null);

const CertificatesComponent: React.FC<CertificatesProps> = ({
  certificates,
}) => {
  return (
    <div className="border p-4 rounded border-gray-300 mt-4 ">
      <h3 className="text-lg font-semibold text-red-500 mb-2">
        Health certificate
      </h3>
      <p className="text-sm text-gray-500 mb-2">After every two years</p>
      <input
        ref={fileInputRefHealthCertificate}
        type="file"
        name="health_certificate_file"
        style={{ display: 'none' }}
      />
      <p>
        <span id="health_certificate"></span>
      </p>
      <CommonButton
        variant="text"
        onClick={() => fileInputRefHealthCertificate.current?.click()}
      >
        Upload Document
      </CommonButton>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Issued on
        </label>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Valid until
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <TextInput
          type="date"
          name="health_certificate_issue_on"
          placeholder="Issued on"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />

        <TextInput
          type="date"
          name="health_certificate_valid_until"
          placeholder="Valid until"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default CertificatesComponent;
