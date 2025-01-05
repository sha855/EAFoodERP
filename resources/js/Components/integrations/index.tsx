import { ArrowRight } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="relative flex items-center w-full justify-center pt-12 pb-16 lg:pt-60 lg:pb-60">
      <div className="flex flex-col items-center gap-5 md:gap-7 w-10/12">
        <h1 className="text-2xl md:text-4xl font-bold text-dark text-center leading-9 space-x-1">
          More than 20+ Integrations
        </h1>
        <p className="text-sm leading-7  md:text-base text-dark md:max-w-2xl md:leading-9 text-center">
          Pick one of our stock themes, or create your custom theme with the
          most advanced theme editor on any online survey building tool. It is
          built to perform and run fast on all of the latest mobile devices.
        </p>

        <button className="py-6 px-7 bg-custom-orange hover:bg-gradient-red-org transition-colors rounded-full flex items-center gap-4 text-white text-sm font-bold">
          View all Integrations <ArrowRight size={14} />
        </button>
      </div>

      {/* Bubbles images  */}

      <img
        src="/assets/img/call-bubble-1.svg"
        alt="Bubble_1"
        className="hidden lg:block absolute top-[90px] left-[90px] animate-bubble delay-150"
      />
      <img
        src="/assets/img/call-bubble-2.svg"
        alt="Bubble_2"
        className="hidden lg:block absolute top-auto bottom-20 left-0 animate-bubble delay-300"
      />
      <img
        src="/assets/img/call-bubble-3.svg"
        alt="Bubble_3"
        className="hidden xl:block absolute top-[80px] right-[315px] animate-bubble delay-100"
      />
      <img
        src="/assets/img/call-bubble-4.svg"
        alt="Bubble_4"
        className="hidden lg:block absolute bottom-[170px] right-[90px] animate-bubble delay-500"
      />
      <img
        src="/assets/img/call-bubble-5.svg"
        alt="Bubble_5"
        className="hidden xl:block absolute bottom-[80px] right-[375px] animate-bubble delay-75 "
      />
      <img
        src="/assets/img/call-bubble-6.svg"
        alt="Bubble_6"
        className="hidden lg:block absolute right-0 top-[115px]  animate-bubble delay-200 origin-right "
      />
      <img
        src="/assets/img/call-bubble-7.svg"
        alt="Bubble_7"
        className="hidden xl:block absolute left-[220px] top-[357px] animate-bubble delay-700 "
      />
    </div>
  );
}
