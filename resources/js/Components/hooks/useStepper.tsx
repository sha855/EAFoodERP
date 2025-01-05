import { useState } from 'react';

type StepperHook = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
};

export const useStepper = (
  initialStep: number = 0,
  totalSteps: number
): StepperHook => {
  const [step, setStep] = useState(initialStep);

  const nextStep = () =>
    setStep((prev) => (prev < totalSteps - 1 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));
  const goToStep = (targetStep: number) => {
    if (targetStep >= 0 && targetStep < totalSteps) {
      setStep(targetStep);
    }
  };
  const reset = () => setStep(initialStep);

  return { step, nextStep, prevStep, goToStep, reset };
};
