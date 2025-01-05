import { FutureCardProps } from '@/types/feature';
import React from 'react';

const FeatureCard = ({ image, text, FeatureHeading }: FutureCardProps) => {
  return (
    <div className="text-center feature-wrap cursor-pointer w-full">
      <div className="img-hover-effect mb-3">
        <img className="mx-auto" src={image} alt="feature img" />
      </div>
      <h3 className="font-bold text-2xl text-center tracking-[-0.5px] text-[rgb(15,33,55)] my-1">
        {FeatureHeading}
      </h3>
      <h5 className="font-medium text-base  text-center text-[#696871] mt-7 mb-0 leading-6	">
        {text}
      </h5>
    </div>
  );
};

export default FeatureCard;
