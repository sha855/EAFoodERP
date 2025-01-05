import React from 'react';
import Container from '../Container';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

const Banner = () => {
  return (
    <section id="#">
      <div className="bg-mobile-gradient md:bg-[url('/assets/img/banner-bg.png')] bg-no-repeat bg-cover bg-left-bottom pt-32 md:pt-32 lg:pt-60 pb-60  md:pb-80 relative">
        <Container>
          {/* for Desktop */}

          <div className="hidden md:flex justify-between items-center">
            <div className="md:w-7/12 lg:w-2/4">
              <strong className="mb-3 inline-block text-white text-black">
                Set up your digital food safety system in 15 minutes
              </strong>
              <h2 className="font-medium text-4xl lg:text-6xl xl:text-6xl leading-tight tracking-[1px] text-white mb-5">
                Simplify compliance effortlessly using our Food Safety software.
              </h2>
              <p className="font-normal text-lg leading-loose tracking-tight text-white mb-0 max-w-lg opacity-80">
                Customize your monitoring and traceability tasks to fit your
                food production or advanced service needs perfectly.
              </p>
              <p className="font-normal text-lg leading-loose tracking-tight text-white mb-0 max-w-lg opacity-80">
                Achieve HACCP, PCP, ISO 22000, and BRC standards quickly with an
                AI-powered food safety app.
              </p>
              <div className="flex items-center gap-6 mt-9">
                <Link
                  href="#"
                  className="inline-flex justify-center items-center rounded-full font-bold text-base text-center leading-none text-white px-7 py-5 bg-dark gap-2.5"
                >
                  Try it for free <FaArrowRight className="text-xs" />
                </Link>
                <Link
                  href="#"
                  className="font-medium text-sm text-white opacity-60 leading-none mb-0"
                >
                  *No Credit card required
                </Link>
              </div>
            </div>
            <div className="md:w-5/12 lg:w-2/4 absolute right-0 top-32 right-menu">
              <div className="relative">
                <img src="/assets/img/banner.png" alt="logo" />
              </div>
            </div>
          </div>

          {/* for Mobile */}
          <div className="md:hidden  flex flex-col">
            <strong className="mb-3 inline-block text-white text-black text-center">
              Set up your digital food safety system in 15 minutes
            </strong>
            <h1 className="text-3xl max-w-full mb-5  text-white font-medium text-center">
              Simplify compliance effortlessly using our Food Safety software.
            </h1>
            <h5 className="text-base mb-2 text-white text-center  opacity-80">
              Customize your monitoring and traceability tasks to fit your food
              production or advanced service needs perfectly.
            </h5>
            <h5 className="text-base mb-6 text-white text-center  opacity-80">
              Achieve HACCP, PCP, ISO 22000, and BRC standards quickly with an
              AI-powered food safety app.
            </h5>
            <button className="flex mb-2 items-center text-white bg-dark rounded-full justify-center py-4 px-6 text-sm font-bold">
              Try it for free <ArrowRight />
            </button>
            <p className="text-sm font-semibold text-white opacity-60 text-center">
              *No Credit card required
            </p>
            <div className="relative my-4">
              <img
                src="/assets/img/banner.png"
                className="absolute -right-6"
                alt="_dash_img"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Banner;
