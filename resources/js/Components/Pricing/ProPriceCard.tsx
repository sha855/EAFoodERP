import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const ProPriceCard = () => {
  return (
    <div className="bg-procard-gradient pl-10 pr-10 rounded-2xl pb-12">
      <div className="flex justify-between items-center pt-12 mb-16">
        <h3 className="font-bold text-4xl capitalize text-white mb-0 leading-none -mt-2">
          Lite
        </h3>
        <div className="grid grid-cols-1">
          <h4 className="font-medium leading-none text-white  text-3xl text-right">
            Free
          </h4>
          <p className="font-medium text-lg mb-0 text-white mt-1">
            with restrictions
          </p>
        </div>
      </div>

      <h5 className="font-bold text-base mb-8 text-white">Plan includes: </h5>
      <ul className="grid grid-cols-1 gap-3 mb-12">
        <li className="flex gap-2 text-md leading-7 pl-8 relative text-white">
          <FaCheck className="absolute top-1 left-0 text-xl text-white" />
          <span>
            Manage conversations directly from your websites optimization.
          </span>
        </li>
        <li className="flex gap-2 text-md leading-7 pl-8 relative text-white">
          <FaCheck className="absolute top-1 left-0 text-xl text-white" />{' '}
          <span>Unlimited links</span>
        </li>
        <li className="flex gap-2 text-md leading-7 pl-8 relative text-white">
          <FaCheck className="absolute top-1 left-0 text-xl text-white" />{' '}
          <span>Chat promt supported</span>
        </li>
        <li className="flex gap-2 text-md leading-7 pl-8 relative text-white">
          <FaCheck className="absolute top-1 left-0 text-xl text-white" />{' '}
          <span>Optimzed hashtags</span>
        </li>
        <li className="flex gap-2 text-md leading-7 pl-8 relative text-white">
          {' '}
          <FaCheck className="absolute top-1 left-0 text-xl text-white" />{' '}
          <span>Own analytics platform</span>
        </li>
      </ul>

      <Link
        className="flex gap-2.5 w-full justify-center bg-white rounded-full min-h-14 items-center text-custom-orange font-bold transition duration-500 group"
        href="#"
      >
        Start 14 days of free trial{' '}
        <FaArrowRight className="duration-500 transform text-sm	group-hover:translate-x-[5px]" />
      </Link>
    </div>
  );
};

export default ProPriceCard;
