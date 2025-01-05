import React from 'react';
import Container from '../Container';

const DashboardTracking = () => {
  return (
    <div
      id="dashboard"
      className="bg-gradient-org-red pt-16 lg:pt-24 lg:pt-36 relative"
    >
      <Container>
        <div className="flex flex-wrap justify-end">
          <div className="basis-full lg:flex-none lg:basis-3/5">
            <img
              className="mx-auto large-scr left-0 bottom-0 rounded-lg	md:rounded-lg lg:rounded-lg"
              src="/assets/img/secure-dashboard.png"
              alt="feature img"
            />
          </div>
          <div className="basis-full lg:flex-none lg:basis-2/5">
            <div className="md:w-4/6 lg:w-full md:mx-auto lg:pl-[70px] pb-[80px]  ">
              <h3 className="font-medium text-2xl leading-[1.1] md:text-[30px] lg:text-[40px] lg:leading-[1.3] lg:tracking-[2px] text-white mb-[20px] mt-5 lg:mt-0 md:text-center lg:text-left">
                Create your Food Safety software system up and running in just
                15 minutes.
              </h3>
              <p className="font-medium text-[16px] leading-[1.625] lg:leading-[2] text-white mb-[30px] md:text-center lg:text-left">
                "Get your Food Safety software system up and running in just 15
                minutes with our easy-to-use solution. Ensure compliance and
                safety with minimal effort."
              </p>

              <div className="flex p-[20px] rounded-[15px] cursor-pointer transition-all duration-500 border-2 border-white mb-[20px]">
                <div className="mr-[20px] flex-shrink-0">
                  <img
                    className="mx-auto"
                    src="/assets/img/secure-2.png"
                    alt="feature img"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[17px] leading-[1.76] tracking[-0.01em] text-white mb-[5px]">
                    Step 1: Create your account.
                  </h4>
                  <p className="m-0 font-normal text-[16px] leading-[1.56] text-white">
                    Set up your HACCP-based monitoring system in just 15
                    minutes. Monitoring checks are automatically configured
                    based on your business profile.
                  </p>
                </div>
              </div>

              <div className="flex p-[20px] rounded-[15px] cursor-pointer transition-all duration-500 border-2 border-white mb-[20px]">
                <div className="mr-[20px] flex-shrink-0">
                  <img
                    className="mx-auto"
                    src="/assets/img/secure-2.png"
                    alt="feature img"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[17px] leading-[1.76] tracking[-0.01em] text-white mb-[5px]">
                    Step 2: Customize if needed.
                  </h4>
                  <p className="m-0 font-normal text-[16px] leading-[1.56] text-white">
                    Customize monitoring checks to fit your company's needs
                    anytime. Assign tasks to team members by role for
                    streamlined compliance management.
                  </p>
                </div>
              </div>

              <div className="flex p-[20px] rounded-[15px] cursor-pointer transition-all duration-500 border-2 border-white">
                <div className="mr-[20px] flex-shrink-0">
                  <img
                    className="mx-auto"
                    src="/assets/img/secure-1.png"
                    alt="feature img"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[17px] leading-[1.76] tracking[-0.01em] text-white mb-[5px]">
                    Step 3: Start using it.
                  </h4>
                  <p className="m-0 font-normal text-[16px] leading-[1.56] text-white">
                    Download our food safety app or access it via desktop.
                    Ensure 100% food safety, product quality control, and full
                    compliance with food regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DashboardTracking;
