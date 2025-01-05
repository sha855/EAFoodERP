import React from 'react';
import Container from '../Container';
import SwitchBtn from './SwitchBtn';

import LitePriceCard from './LitePriceCard';
import ProPriceCard from './ProPriceCard';

const Pricing = () => {
  return (
    <div id="pricing" className="py-16 md:py-36  lg:py-36 bg-light-grey">
      <div className="md:w-full lg:w-3/5 mx-auto">
        <Container>
          <h3 className="font-medium text-[22px] md:text-[28px] lg:text-[28px] text-center tracking-tight mb-8 text-[#0f2137]">
            Meet our exiciting Pricing Plan
          </h3>
          <SwitchBtn />
          <div className="max-w-[920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-8 md:mt-16 lg:mt-16 gap-10 md:gap-6">
              <LitePriceCard />
              <ProPriceCard />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Pricing;
