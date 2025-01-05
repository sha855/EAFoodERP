import Container from '@/Components/Container';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import React from 'react';

const FoodSafety = () => {
  return (
    <div className="p-0 lg:p-8 lg:p-16">
      <Container>
        <h4 className="font-bold text-[28px] text-2xl md:text-3xl lg:text-4xl leading-[1.31] tracking-tight text-[#0f2137] mb-[10px] md:mb-[25px] lg:mb-[50px] text-center mt-8 md:mt-2 lg:mt-0">
          Food Safety Compliance Software for Quality Managers
        </h4>

        <div className="flex flex-wrap items-center flex-grow justify-center">
          <div className="basis-full md:basis-full lg:basis-3/6">
            <img src="/assets/img/Food-Safety.png" alt="img" />
          </div>
          <div className="basis-full md:basis-full lg:basis-3/6">
            <ul className="pl-0 md:pl-6 lg:pl-16 ">
              <li className="w-full p-2 md:p-4 lg:p-4 md:pl-14 pl-14 lg:pl-14 bg-white shadow-counter-card rounded-lg flex items-center gap-2 mb-4 relative">
                <span className="absolute text-2xl top-0 bottom-0 left-0 bg-gradient-org-red rounded-l-lg flex items-center px-3 text-white">
                  <AiOutlineCheckCircle />
                </span>
                <p className="text-md md:text-lg lg:text-lg">
                  Monitoring, traceability, and recall procedures
                </p>
              </li>
              <li className="w-full p-2 md:p-4 lg:p-4 md:pl-14 pl-14 lg:pl-14 bg-white shadow-counter-card rounded-lg flex items-center gap-2 mb-4 relative">
                <span className="absolute text-2xl top-0 bottom-0 left-0 bg-gradient-org-red rounded-l-lg flex items-center px-3 text-white">
                  <AiOutlineCheckCircle />
                </span>
                <p className="text-md md:text-lg lg:text-lg">
                  Intelligent notifications for food safety
                </p>
              </li>
              <li className="w-full p-2 md:p-4 lg:p-4 md:pl-14 pl-14 lg:pl-14 bg-white shadow-counter-card rounded-lg flex items-center gap-2 mb-4 relative">
                <span className="absolute text-2xl top-0 bottom-0 left-0 bg-gradient-org-red rounded-l-lg flex items-center px-3 text-white">
                  <AiOutlineCheckCircle />
                </span>
                <p className="text-md md:text-lg lg:text-lg">
                  Instant control and verification overview
                </p>
              </li>
              <li className="w-full p-2 md:p-4 lg:p-4 md:pl-14 pl-14 lg:pl-14 bg-white shadow-counter-card rounded-lg flex items-center gap-2 mb-4 relative">
                <span className="absolute text-2xl top-0 bottom-0 left-0 bg-gradient-org-red rounded-l-lg flex items-center px-3 text-white">
                  <AiOutlineCheckCircle />
                </span>
                <p className="text-md md:text-lg lg:text-lg">
                  Internal audits and detailed instructions
                </p>
              </li>
              <li className="w-full p-2 md:p-4 lg:p-4 md:pl-14 pl-14 lg:pl-14 bg-white shadow-counter-card rounded-lg flex items-center gap-2 mb-4 relative">
                <span className="absolute text-2xl top-0 bottom-0 left-0 bg-gradient-org-red rounded-l-lg flex items-center px-3 text-white">
                  <AiOutlineCheckCircle />
                </span>
                <p className="text-md md:text-lg lg:text-lg">
                  Effortless file storage and Food Safety Plan creation
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FoodSafety;
