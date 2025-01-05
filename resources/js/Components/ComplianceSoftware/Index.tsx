import React from 'react';
import Container from '../Container';
import ModalVideoComponent from './VideoCard';
import ServicesCard from './ServicesCard';
import Companies from './Companies';

const ComplianceSoftware = () => {
  return (
    <div>
      <div className="bg-[#f7fafa] p-2 pt-12 md:p-0 md:pt-16 lg:p-16 lg:pt-16">
        <Container>
          <div className="max-w-[1000px]  mx-auto md:px-0 lg:px-8">
            <h4 className="font-bold text-[28px] md:text-3xl lg:text-4xl leading-[1.31] tracking-tight text-[#0f2137] mb-[70px] text-center">
              Why go paperless with our Food Safety Compliance software?
            </h4>
            {/* <ModalVideoComponent /> */}
          </div>

          <ServicesCard
            ServiceImg="/assets/img/stp.png"
            ServiceName="Implement your Food Safety Management System in just 15 minutes."
            Point={[
              'Our AI-powered software generates personalized tasks tailored to your needs',
              'Customize tasks for your operations, assign them to team members, and adjust the monitoring system whenever necessary.',
            ]}
          />

          <ServicesCard
            ServiceImg="/assets/img/stp.png"
            className="!flex-row-reverse"
            ServiceName="Create a Food Safety System tailored to your needs."
            Point={[
              'Use customizable checklists from templates or build new tasks with detailed forms.',
              'Activate smart features to save time and ensure accurate records.',
              'Include educational photos and videos, and set corrective actions for incomplete tasks to meet food safety protocols.',
            ]}
          />

          <ServicesCard
            ServiceImg="/assets/img/stp.png"
            ServiceName="Never miss a task with our mobile food safety app."
            Point={[
              'Get smart notifications and alerts from {SOFTNAME}.',
              'Access checklists with detailed instructions to educate your team, and save time with automatic monitoring logs for repetitive tasks.',
            ]}
          />

          <ServicesCard
            ServiceImg="/assets/img/stp.png"
            className="!flex-row-reverse"
            ServiceName="Cut 20% off your supervision time."
            Point={[
              'Oversee your company’s food safety compliance remotely with ease.',
              'Get a detailed snapshot of daily progress to effectively minimize risks and ensure full compliance, anytime and anywhere.',
            ]}
          />

          <ServicesCard
            ServiceImg="/assets/img/stp.png"
            ServiceName="Trace and recall your production effortlessly."
            Point={[
              'Ensure full traceability across the food supply chain, from raw materials to finished products.',
              'Complete traceability logs in just three clicks and monitor details for recalls or potential hazards.',
            ]}
          />

          <div className="py-8 md:py-10 lg:py-20">
            <h4 className="m-0 font-normal text-[16px] leading-[1.75] text-center tracking-[-0.015em] text-[#696871] bg-[#F7FAFA]  px-[14px] md:px-[30px] lg:px-[30px] relative top-[15px] table m-auto">
              Companies who worked with us proudly
            </h4>
            <div className="border-t border-[#E1E0EB]">
              <div className="grid gap-6 md:gap-6 lg:gap-0  grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-14">
                <Companies CompaniesImg="/assets/img/brand-1.png" />
                <Companies CompaniesImg="/assets/img/brand-2.png" />
                <Companies CompaniesImg="/assets/img/brand-3.png" />
                <Companies CompaniesImg="/assets/img/brand-4.png" />
                <Companies CompaniesImg="/assets/img/brand-5.png" />
                <Companies CompaniesImg="/assets/img/brand-6.png" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ComplianceSoftware;
