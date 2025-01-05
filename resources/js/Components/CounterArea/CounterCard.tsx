import { CounterCardProps } from '@/types/feature';
import clsx from 'clsx';
import React from 'react';

const CounterCard = ({
  UpTo,
  NumberCounter,
  Sign,
  CounetrName,
  className,
}: CounterCardProps) => {
  return (
    <div
      className={clsx(
        'w-full flex-1 p-7 xl:py-12 xl:px-10 bg-white shadow-counter-card rounded-lg mb-6 transition-transform duration-300 hover:-translate-y-1',
        className
      )}
    >
      <p className="m-0 text-lg text-dark ">{UpTo}</p>
      <div className="flex items-start mt-1 mb-1">
        <h3 className="m-0 text-6xl lg:text-7xl leading-none tracking[-0.02em] text-light-orange font-normal">
          {NumberCounter}
        </h3>
        <span className="mr-1 font-medium text-4xl leading-none text-light-orange relative top-1">
          {Sign}
        </span>
      </div>
      <p className="m-0 text-base leading-4 lg:text-lg text-dark ">
        {CounetrName}
      </p>
    </div>
  );
};

export default CounterCard;
