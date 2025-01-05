import React, { ReactNode, useState } from 'react';

interface ValidationSchema {
  [key: string]: (value: any) => string | null;
}

interface ValidationErrors {
  [key: string]: string | null;
}

interface TouchedFields {
  [key: string]: boolean;
}

interface UseFormValidation {
  errors: ValidationErrors;
  touched: TouchedFields;
  handleBlur: (field: string, value?: string) => void;
  validateField: (field: string, value: any) => void;
  handleInputChange: (field: string, value: any) => void;
  resetValidation: () => void;
  ShowError: ({ fieldName }: { fieldName: string }) => ReactNode;
}

const useFormValidations = (
  validationSchema: ValidationSchema
): UseFormValidation => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const validateField = (field: string, value: any) => {
    const error = validationSchema[field]?.(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    if (touched[field]) validateField(field, value);
  };

  const handleBlur = (field: string, value: any) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));
    validateField(field, value);
  };

  const resetValidation = () => {
    setErrors({});
    setTouched({});
  };

  const ShowError: React.FC<{ fieldName: string }> = ({ fieldName }) => {
    if (touched[fieldName] && errors[fieldName]) {
      return <p className="text-red-500 text-sm">{errors[fieldName]}</p>;
    }
    return null;
  };

  return {
    errors,
    touched,
    handleBlur,
    validateField,
    handleInputChange,
    resetValidation,
    ShowError,
  };
};

export default useFormValidations;
