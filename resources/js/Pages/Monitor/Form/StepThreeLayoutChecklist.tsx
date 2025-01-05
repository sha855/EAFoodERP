import React, { useState } from 'react';
import VerificationCard from '@/Pages/Monitor/Form/VerificationCard';

interface StepThreeProps {
  taskDetails?: {
    frequency: string[];
    assignTask: string[];
    frequencyVerification: string[];
  };
  children?: React.ReactNode;
  assignTaskTo: any;
  setData: any;
  data: any;
}

const StepThreeLayoutChecklist: React.FC<StepThreeProps> = ({
  taskDetails,
  children,
  assignTaskTo,
  setData,
  data,
}) => {
  return (
    <div>
      {children}
      <VerificationCard
        setData={setData}
        data={data}
        assignTaskTo={assignTaskTo as string[]}
        frequencyVerification={taskDetails?.frequencyVerification as {}}
      />
    </div>
  );
};
export default StepThreeLayoutChecklist;
