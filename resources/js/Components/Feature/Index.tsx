import React from 'react';
import FeatureCard from './Card';
import Container from '../Container';

const Feature = () => {
  return (
    <div id="feature">
      <div className="pt-[90px] pb-[150px]">
        <Container>
          <div className="text-center max-w-[577px] mx-auto mb-[70px]">
            <h2 className="font-bold text-[28px] md:text-3xl lg:text-4xl leading-[1.31] tracking-tight text-[#0f2137] mb-4">
              Food Safety Management Software that saves you time and cuts
              costs.
            </h2>
            {/* <p className='m-0 font-normal  text-sm	 lg:text-base leading-8 text-[#0f2137]'>The rise of mobile devices transforms the way we consume information entirely and the world's most relevant channels such as Facebook and Instagram are almost exclusively used on mobile</p> */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-4 md:gap-x-4 lg:gap-x-24 md:gap-y-12 lg:gap-y-0">
            <FeatureCard
              image="/assets/img/feature-1.svg"
              FeatureHeading="Save 20% on Food Safety Time"
              text="Save 20% more time on food safety tasks. Switch from manual paperwork to digital forms and gain 8 extra hours per week. Monitor all food safety procedures in real-time from anywhere with your remote dashboard."
            />

            <FeatureCard
              image="/assets/img/feature-2.svg"
              FeatureHeading="Setup in 15 Minutes"
              text="Set up in just 15 minutes. We auto-create your workspace based on your business type and profile, allowing you to adjust checklists and logs for full compliance."
            />

            <FeatureCard
              image="/assets/img/feature-3.svg"
              FeatureHeading="2x More Effective Than Paper"
              text="Twice as effective as paper-based systems. Users report 100% increased team effectiveness, fewer food safety record errors, and savings equivalent to one full-time employee."
            />

            {/* <FeatureCard image='/assets/img/feature-4.png' text='Customer Analysis' />
            <FeatureCard image='/assets/img/feature-5.png' text='Instant Support' /> */}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Feature;
