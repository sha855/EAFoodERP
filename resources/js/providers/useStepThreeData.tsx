import React, { createContext, useContext, useState, ReactNode } from 'react';
import { selectedFieldData } from '@/types/monitoringForm';

interface StepThreeContextProps {
  stepThreeData: selectedFieldData[];
  removeTaskFields: (id: number) => void;
  UpdateTaskFieldData: (args: {
    id: number;
    field: string;
    value: string | any;
    nestedData?: string;
  }) => void;
  GetFieldValue: (args: {
    id: number;
    field: keyof selectedFieldData;
    nestedField?: string;
  }) => any;
  removeOptions: (args: {
    componentId: number;
    nestedField: string;
    optionId: number;
  }) => void;
  setStepThreeData: (
    updater: (prevFields: selectedFieldData[]) => selectedFieldData[]
  ) => void;
}

const StepThreeContext = createContext<StepThreeContextProps | undefined>(
  undefined
);

export const StepThreeProvider = ({ children }: { children: ReactNode }) => {
  const [stepThreeData, setStepThreeData] = useState<selectedFieldData[]>([]);

  const removeTaskFields = (id: number) => {
    setStepThreeData((prevData) => prevData.filter((data) => data.id !== id));
  };

  const UpdateTaskFieldData = ({
    id,
    field,
    value,
    nestedData,
  }: {
    id: number;
    field: string;
    value: string | any;
    nestedData?: string;
  }) => {
    setStepThreeData((prevData) => {
      const indexOfId = prevData.findIndex((item) => item.id === id);

      if (indexOfId === -1) return prevData;

      const updatedData = [...prevData];
      const fieldDatas =
        typeof updatedData[indexOfId].details === 'object'
          ? updatedData[indexOfId].details
          : null;

      if (nestedData) {
        updatedData[indexOfId] = {
          ...updatedData[indexOfId],
          [field]: {
            ...fieldDatas,
            [nestedData]: value,
          },
        };
      } else {
        updatedData[indexOfId] = {
          ...updatedData[indexOfId],
          [field]: value,
        };
      }

      return updatedData;
    });
  };

  const GetFieldValue = ({
    id,
    field,
    nestedField,
  }: {
    id: number;
    field: keyof selectedFieldData;
    nestedField?: string;
  }) => {
    const value = stepThreeData.find((item) => item.id === id);
    if (!value) return undefined;

    if (
      nestedField &&
      typeof value[field] === 'object' &&
      value[field] !== null
    ) {
      return (value[field] as { [key: string]: any })[nestedField];
    } else {
      return value[field];
    }
  };

  const removeOptions = ({
    componentId,
    nestedField,
    optionId,
  }: {
    componentId: number;
    nestedField: string;
    optionId: number;
  }) => {
    setStepThreeData((prevData) =>
      prevData.map((data) => {
        if (data.id === componentId && data.details) {
          if (
            typeof data.details === 'object' &&
            !Array.isArray(data.details) &&
            data.details !== null &&
            nestedField in data.details
          ) {
            const detailsField = (data.details as { [key: string]: any })[
              nestedField
            ];
            if (Array.isArray(detailsField)) {
              return {
                ...data,
                details: {
                  ...data.details,
                  [nestedField]: detailsField.filter(
                    (option: { id: number }) => option.id !== optionId
                  ),
                },
              };
            }
          }
        }
        return data;
      })
    );
  };

  return (
    <StepThreeContext.Provider
      value={{
        stepThreeData,
        setStepThreeData,
        removeTaskFields,
        UpdateTaskFieldData,
        GetFieldValue,
        removeOptions,
      }}
    >
      {children}
    </StepThreeContext.Provider>
  );
};

export const useStepThree = () => {
  const context = useContext(StepThreeContext);
  if (context === undefined) {
    throw new Error('useStepThree must be used within a StepThreeProvider');
  }
  return context;
};
