import Container from '../Container';
import { Link } from '@inertiajs/react';
import { FaArrowRight } from 'react-icons/fa';
import CounterCard from './CounterCard';

const CounterArea = () => {
  return (
    <Container>
      <div className="pt-24 pb-28  lg:pt-36 lg:pb-40">
        <div className="flex flex-wrap justify-between flex-col-reverse lg:flex-row">
          <div className="basis-1/2 pt-12 flex flex-col items-center lg:items-start lg:flex-col ">
            <h2 className="font-bold text-center lg:text-left text-3xl leading-snug  text-dark m-0 max-w-sm">
              Take your user monitoring experience to new ultimate level with
              file tracking
            </h2>
            <p className="my-8 text-center lg:text-left font-normal text-base leading-8 text-dark max-w-[553px]">
              Pick one of our stock themes, or create your custom theme with the
              most advanced theme editor on any online survey building tool. It
              is built to perform and run fast on all of the latest mobile
              devices. Build out-of the box blazing fast apps with a small
              footprint and built-in best practices like hardware accelerated
              transitions, touch-optimized gestures, pre rendering, and AOT
              compiling.
            </p>
            <Link
              href="#"
              className="inline-flex justify-center items-center rounded-full font-bold text-base text-center leading-none text-white px-7 py-5 bg-gradient-red-org gap-2.5"
            >
              Discover more <FaArrowRight />
            </Link>
          </div>

          <div className="basis-1/2	 md:max-w-xl md:mx-auto lg:mx-0 w-full grid grid-cols-2  gap-x-5">
            <CounterCard
              UpTo="Up to"
              NumberCounter="80"
              Sign="%"
              CounetrName="Customer Response"
            />
            <CounterCard
              className="relative lg:top-10"
              UpTo="Consistent"
              NumberCounter="99"
              Sign="%"
              CounetrName="Performance Score"
            />
            <CounterCard
              UpTo="Down to"
              NumberCounter="3.5"
              Sign="s"
              CounetrName="Response Time"
            />
            <CounterCard
              className="relative lg:top-10"
              UpTo="Up to"
              NumberCounter="5x"
              CounetrName="Faster then others"
            />
          </div>
        </div>
      </div>
    </Container>
    // <div className="p-36 pb-40">
    //     <Container>
    //         <div className="flex flex-wrap">
    //             <div className="basis-1/2">
    //                 <h2 className="font-medium text-[40px] leading-[1.37] tracking[-0.02em] text-[#0f2137] m-0 max-w-[505px]">
    //                     Take your user monitoring experience to new ultimate
    //                     level with file tracking
    //                 </h2>
    //                 <p className="my-8 max-w-lg font-normal text-base leading-8 text-[#0f2137]">
    //                     Pick one of our stock themes, or create your custom
    //                     theme with the most advanced theme editor on any
    //                     online survey building tool. It is built to perform
    //                     and run fast on all of the latest mobile devices.
    //                     Build out-of the box blazing fast apps with a small
    //                     footprint and built-in best practices like hardware
    //                     accelerated transitions, touch-optimized gestures,
    //                     pre rendering, and AOT compiling.
    //                 </p>
    //                 <Link
    //                     href="#"
    //                     className="inline-flex justify-center items-center rounded-[30px] font-bold text-[16px] text-center leading-[1] text-white px-[29px] py-[21px] bg-gradient-red-org gap-2.5"
    //                 >
    //                     Discover more <FaArrowRight />
    //                 </Link>
    //             </div>

    //             <div className="flex flex-wrap justify-between basis-1/2">
    //                 <CounterCard
    //                     UpTo="Up to"
    //                     NumberCounter="80"
    //                     Sign="%"
    //                     CounetrName="Customer Response"
    //                 />
    //                 <CounterCard
    //                     className="relative top-10"
    //                     UpTo="Consistent"
    //                     NumberCounter="99"
    //                     Sign="%"
    //                     CounetrName="Performance Score"
    //                 />
    //                 <CounterCard
    //                     UpTo="Down to"
    //                     NumberCounter="3.5"
    //                     Sign="s"
    //                     CounetrName="Response Time"
    //                 />
    //                 <CounterCard
    //                     className="relative top-10"
    //                     UpTo="Up to"
    //                     NumberCounter="5x"
    //                     CounetrName="Faster then others"
    //                 />
    //             </div>
    //         </div>
    //     </Container>
    // </div>
  );
};

export default CounterArea;
