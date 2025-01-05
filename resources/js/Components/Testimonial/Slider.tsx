import React, { useState } from 'react';
import QuoteCard from './QuoteCard';

const TestimonialSlider = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full lg:w-[727px] mx-auto overflow-hidden">
      <div
        id="default-styled-tab-content"
        className="relative relative h-52 overflow-x-hidden"
      >
        <div
          className={`absolute w-full transition-transform duration-500 ease-in-out ${
            activeTab === 'profile'
              ? 'transform translate-x-0'
              : 'transform translate-x-full'
          } `}
          id="styled-profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <QuoteCard QuoteMsg="OMG! I cannot believe that I have got a brand new landing page after getting this template we are able to use our most used e-commerce template with modern and trending design." />

          <div className="my-4 md:hidden lg:hidden">
            <p className="text-base font-medium">Mariana Dickey</p>
            <p className="text-[14px] leading-none text-[#696879] opacity-70 mb-5">
              UI Designer
            </p>
          </div>
        </div>

        <div
          className={`absolute w-full transition-transform duration-500 ease-in-out ${
            activeTab === 'dashboard'
              ? 'transform translate-x-0'
              : 'transform translate-x-full'
          } `}
          id="styled-dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <QuoteCard QuoteMsg="OMG! I cannot believe that I have got a brand new landing page after getting this template we are able to use our most used e-commerce template with modern and trending design." />

          <div className="my-4 md:hidden lg:hidden">
            <p className="text-base font-medium">Mariana Dickey</p>
            <p className="text-[14px] leading-none text-[#696879] opacity-70 mb-5">
              UI Designer
            </p>
          </div>
        </div>

        <div
          className={`absolute w-full transition-transform duration-500 ease-in-out ${
            activeTab === 'settings'
              ? 'transform translate-x-0'
              : 'transform translate-x-full'
          } `}
          id="styled-settings"
          role="tabpanel"
          aria-labelledby="settings-tab"
        >
          <QuoteCard QuoteMsg="OMG! I cannot believe that I have got a brand new landing page after getting this template we are able to use our most used e-commerce template with modern and trending design." />

          <div className="my-4 md:hidden lg:hidden">
            <p className="text-base font-medium">Mariana Dickey</p>
            <p className="text-[14px] leading-none text-[#696879] opacity-70 mb-5">
              UI Designer
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[40px] md:mt-12 lg:mt-12">
        <ul
          className="flex justify-center p-2"
          id="default-styled-tab"
          role="tablist"
        >
          <li className="me-3 md:me-4 lg:me-2" role="presentation">
            <button
              className={`cursor-pointer border-none outline-none bg-transparent appearance-none w-auto md:w-[231px] lg:w-[231px] shadow-md shadow-[rgba(132,159,184,0.15)] rounded-[40px] p-[15px] flex items-center text-left transition-shadow duration-400 gap-1 hover:shadow-[rgba(132, 159, 184, 0.12) 0px 14px 40px;]  ${
                activeTab === 'profile' ? 'dd' : ''
              }`}
              onClick={() => handleTabClick('profile')}
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected={activeTab === 'profile'}
            >
              <div>
                <img src="/assets/img/testimonials-1.png" alt="qoute" />
              </div>

              <div className="hidden md:inline-block lg:inline-block">
                <h4 className="font-medium text-[17px] leading-[22px] text-[#19191b] mb-1">
                  Mariana Dickey
                </h4>
                <p className="text-[15px] leading-none text-[#696879] opacity-70">
                  UI Designer
                </p>
              </div>
            </button>
          </li>
          <li className="me-3 md:me-5 lg:me-7" role="presentation">
            <button
              className={`cursor-pointer border-none outline-none bg-transparent appearance-none w-auto md:w-[231px] lg:w-[231px] shadow-md shadow-[rgba(132,159,184,0.15)] rounded-[40px] p-[15px] flex items-center text-left transition-shadow duration-400 gap-1 ${
                activeTab === 'dashboard' ? 'd' : ''
              }`}
              onClick={() => handleTabClick('dashboard')}
              type="button"
              role="tab"
              aria-controls="dashboard"
              aria-selected={activeTab === 'dashboard'}
            >
              <div>
                <img src="/assets/img/testimonials-1-2.png" alt="qoute" />
              </div>

              <div className="hidden md:inline-block lg:inline-block">
                <h4 className="font-medium text-[17px] leading-[22px] text-[#19191b] mb-1">
                  Jonathan Taylor
                </h4>
                <p className="text-[15px] leading-none text-[#696879] opacity-70">
                  CEO at Creativex
                </p>
              </div>
            </button>
          </li>
          <li className="me-3 md:me-5 lg:me-7" role="presentation">
            <button
              className={`cursor-pointer border-none outline-none bg-transparent appearance-none w-auto md:w-[231px] lg:w-[231px] shadow-md shadow-[rgba(132,159,184,0.15)] rounded-[40px] p-[15px] flex items-center text-left transition-shadow duration-400 gap-1 ${
                activeTab === 'settings' ? 's' : ''
              }`}
              onClick={() => handleTabClick('settings')}
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected={activeTab === 'settings'}
            >
              <div>
                <img src="/assets/img/testimonials-1-3.png" alt="qoute" />
              </div>

              <div className="hidden md:inline-block lg:inline-block">
                <h4 className="font-medium text-[17px] leading-[22px] text-[#19191b] mb-1">
                  Krish Kendall
                </h4>
                <p className="text-[15px] leading-none text-[#696879] opacity-70">
                  Creative Director
                </p>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialSlider;
