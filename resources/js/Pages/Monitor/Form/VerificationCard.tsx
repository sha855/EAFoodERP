import React, { ChangeEvent, useState } from 'react';
import { useStepThree } from '@/providers/useStepThreeData';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { ComponentType } from '@/types/monitoringForm';

interface VerificationCard {
  assignTaskTo: string[];
  frequencyVerification: Record<string, string>;
  setData: any;
  data: any;
}

export default function VerificationCard({
  frequencyVerification,
  assignTaskTo,
  setData,
  data,
}: VerificationCard) {
  return (
    <div className="!shadow-cardShadow bg-white p-5 rounded-lg mt-5">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-xl">Verification</h3>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={data?.is_verification}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setData('is_verification', e.target.checked);
            }}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gradient-org-red"></div>
        </label>
      </div>

      <div className="flex items-center gap-1 mb-4 mt-5 bg-green-300 p-3 rounded-md">
        <div className="w-10">
          <IoIosInformationCircleOutline className="text-lg w-6 h-6" />
        </div>
        <p>
          Assigned members can verify a completed task. Our system will
          automatically notify you about unverified tasks of the previous{' '}
          {data?.frequency} via email.
        </p>
      </div>

      {data?.is_verification && (
        <div className="flex justify-between items-center gap-5 mt-5 border-b pb-5">
          <div className="w-1/2">
            <div>
              <label
                htmlFor="assign"
                className="block mb-2 text-sm font-medium !text-black dark:text-white"
              >
                Select verifier
              </label>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setData('verifier', e.target.value);
                }}
                value={data?.verifier}
                className="bg-gray-50 border !border-gray-300 !text-black text-base font-medium rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
              >
                {assignTaskTo &&
                  assignTaskTo?.map((item: any, index: number) => (
                    <option key={index} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <label
                htmlFor="Frequency"
                className="block mb-2 text-sm font-medium !text-black dark:text-white"
              >
                Select frequency
              </label>
              <select
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setData('frequency', e.target.value);
                }}
                value={data?.frequency}
                className="bg-gray-100 border !text-black text-base font-medium !border-gray-300  rounded-lg  block w-full p-2.5 !ring-0 !ring-offset-0"
              >
                {Object.entries(frequencyVerification || {}).map(
                  ([key, value]: [string, string], index: number) => (
                    <option selected={index === 0} key={index} value={key}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
