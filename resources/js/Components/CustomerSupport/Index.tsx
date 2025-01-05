import React from 'react';
import Container from '../Container';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

const CustomerSupport = () => {
  return (
    <div className="bg-[url('/assets/img/customer-support-bg.png')] bg-no-repeat bg-cover bg-left-bottom py-12 md:py-24 lg:py-24 relative">
      <Container>
        <div className="max-w-2xl mx-auto mb-12 md:mb-20 lg:mb-20">
          <h3 className="font-medium text-2xl	 leading-tight md:text-4xl lg:text-4xl text-white text-center md:leading-snug lg:leading-snug">
            "Simplify Food Safety & Quality Management with Smart, Real-Time
            Monitoring & Traceability."
          </h3>
        </div>
        <div className="md:flex lg:flex lg:items-center flex-wrap">
          <div className="relative basis-3/6">
            <img
              className="relative z-10"
              src="/assets/img/customer-support.png"
              alt="customer-support"
            />
            <img
              className="absolute bottom-[-80px] left-[-145px] opacity-10"
              src="/assets/img/customer-support-shape.svg"
              alt="customer-support-shape"
            />
          </div>
          <div className="md:basis-3/6 lg:basis-3/6 md:pl-16 lg:pl-16 mt-6 md:mt-0 lg:mt-0">
            <ul className="grid grid-cols-1 gap-1 mb-12">
              <li className="flex gap-2 text-md relative text-white text-lg pl-10 leading-7 mt-4">
                <IoCheckmarkSharp className="text-custom-green absolute top-1 left-0 text-2xl" />
                <span>
                  The simplest Food Safety and Quality Management Software to
                  handle everything./The simplest solution for managing all your
                  Food Safety and Quality needs.
                </span>
              </li>
              <li className="flex gap-2 text-md relative text-white text-lg pl-10 leading-7 mt-4">
                <IoCheckmarkSharp className="text-custom-green absolute top-1 left-0 text-2xl" />{' '}
                <span>
                  Use Take the first step towards smart Food Quality Management
                  Software.
                </span>
              </li>
              <li className="flex gap-2 text-md relative text-white text-lg pl-10 leading-7 mt-4">
                <IoCheckmarkSharp className="text-custom-green absolute top-1 left-0 text-2xl" />{' '}
                <span>
                  Book a free 30-minute demo to discover how quickly you can set
                  up your real-time Monitoring and Food Traceability System.
                </span>
              </li>
            </ul>
            <Link
              className="flex gap-2.5 py-4 px-6 mt-10 w-40 justify-center bg-btn-gradient rounded-full  items-center text-white font-bold hover:bg-gradient-red-org transition duration-500 group mx-auto md:m-0 lg:m-0"
              href="#"
            >
              Learn More{' '}
              <FaArrowRight className="duration-500 transform text-sm group-hover:translate-x-[5px]" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerSupport;
