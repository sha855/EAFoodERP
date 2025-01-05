import { useState } from 'react';

interface UseStepperProps {
  steps: number;
  initialStep?: number;
}

export const useStepper = ({ steps, initialStep = 0 }: UseStepperProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const canGoBack = currentStep > 0;
  const canGoNext = currentStep < steps - 1;

  const nextStep = () => {
    if (canGoNext) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    if (canGoBack) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetStep = () => {
    setCurrentStep(initialStep);
  };

  return {
    currentStep,
    canGoBack,
    canGoNext,
    nextStep,
    prevStep,
    resetStep,
  };
};
