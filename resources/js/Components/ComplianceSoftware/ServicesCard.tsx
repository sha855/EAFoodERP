import { ServicesCardProps } from '@/types/feature';
import { FaRegCircleCheck } from 'react-icons/fa6';

import React from 'react';
import clsx from 'clsx';

const ServicesCard = ({
  ServiceImg,
  ServiceName,
  Point,
  className,
}: ServicesCardProps) => {
  return (
    <div
      className={clsx(
        'md:flex lg:flex mb-4 group items-center gap-3 md:gap-4 lg:gap-6 ',
        className
      )}
    >
      <div className="md:w-[50%] lg:w-[50%] group-hover:animate-shake- p-3 md:p-6 lg:p-8 bg-white rounded-2xl	">
        <img src={ServiceImg} alt="img" />
      </div>
      <div className="md:w-[50%] lg:w-[50%] p-3 md:p-2 lg:p-8">
        <h3 className="mb-2.5 font-semibold text-xl md:text-2xl lg:text-3xl leading-tight text-[#0f2137] mb-8">
          {ServiceName}
        </h3>
        {/* <p className='font-normal text-[15px] leading-[1.87] text-[#343D48] m-0 w-[100%]'>{ServiceDescription}</p> */}
        <ul>
          {Point?.map((item, index) => (
            <li key={index} className="flex items-start mb-2">
              <div className="inline-block mr-1 md:mr-1 lg:mr-3 p-1">
                <FaRegCircleCheck className="h-5 w-5 text-custom-orange" />
              </div>
              <p className="text-md md:text-lg lg:text-lg">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServicesCard;
