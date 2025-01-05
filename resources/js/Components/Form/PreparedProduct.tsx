import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import TextInput from '../TextInput';
import CommonButton from '../CommonButton';

type Product = {
  id: number;
  product_name: string;
  trace_product_info: {
    recipe_total_amount: string;
    recipe_total_amount_unit: string;
    ingredients: Ingredient[];
  };
};

type Props = {
  data: Product[];
  companyId: string;
  setIsDrawerOpen: (isOpen: boolean) => void;
};

interface Ingredient {
  id: number;
  ingredient: string;
  ingredient_id: number;
  batch: string;
  expiryDate: string;
  amount: string;
  unit: string;
  additionalFields?: Array<{
    batch: string;
    expiryDate: string;
    amount: string;
    unit: string;
  }>;
}

type ValidationErrors = {
  [parentId: string]: {
    [index: number]: {
      [field: string]: string;
    };
  };
};

type FieldName = 'batch' | 'expiryDate' | 'amount';

const PreparedProduct: React.FC<Props> = ({
  data,
  companyId,
  setIsDrawerOpen,
}) => {
  const [accordionState, setAccordionState] = useState<Record<number, boolean>>(
    {}
  );
  const {
    data: formData,
    setData,
    post,
    processing,
    errors,
  } = useForm({
    product_id: '',
    amount: '',
    volume: 'gram',
    expiry_date: '',
    expiry_time: '',
    batch_code: '',
    comment: '',
    company_id: companyId,
    ingredients: {} as Record<number, Ingredient[]>,
  });

  const toggleAccordion = (id: number) => {
    setAccordionState((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => {
      const updatedData = { ...prevData, [field]: value };

      if (field === 'product_id') {
        const selectedProduct = data.find(
          (product) => product.id.toString() === value
        );

        if (selectedProduct) {
          const { trace_product_info } = selectedProduct;

          updatedData.amount = trace_product_info?.recipe_total_amount || '';
          updatedData.volume =
            trace_product_info?.recipe_total_amount_unit || '';

          updatedData.ingredients = trace_product_info?.ingredients.reduce(
            (acc, ingredient) => {
              const defaultIngredient = {
                id: ingredient.id,
                ingredient_id: ingredient.id,
                ingredient: ingredient.ingredient,
                batch: '',
                expiryDate: '',
                amount: '',
                unit: ingredient.unit || 'gram',
              };

              acc[ingredient.id] = acc[ingredient.id] || [defaultIngredient];
              return acc;
            },
            {} as Record<number, Ingredient[]>
          );
        }
      }

      return updatedData;
    });
  };

  const handleAddMoreFields = (parentId: number) => {
    setData((prevState: any) => {
      const updatedIngredients = {
        ...prevState.ingredients,
        [parentId]: [
          ...(prevState.ingredients[parentId] || []),
          {
            ingredient_id: parentId,
            batch: '',
            expiryDate: '',
            amount: '',
            unit: 'gram',
          },
        ],
      };
      return { ...prevState, ingredients: updatedIngredients };
    });
  };

  const handleRemoveField = (parentId: number, index: number) => {
    setData((prevState) => {
      const updatedIngredients = {
        ...prevState.ingredients,
        [parentId]: prevState.ingredients[parentId].filter(
          (_, i) => i !== index
        ),
      };
      return { ...prevState, ingredients: updatedIngredients };
    });
  };

  const handleIngredientChange = (
    parentId: number,
    index: number,
    field: string,
    value: string
  ) => {
    setData((prevState) => {
      const updatedIngredients = {
        ...prevState.ingredients,
        [parentId]: prevState.ingredients[parentId].map((ingredient, i) =>
          i === index ? { ...ingredient, [field]: value } : ingredient
        ),
      };
      return { ...prevState, ingredients: updatedIngredients };
    });
  };

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.keys(formData.ingredients).forEach((parentId) => {
      (formData as any).ingredients[parentId].forEach(
        (ingredient: any, index: any) => {
          Object.keys(ingredient).forEach((field) => {
            validateField(Number(parentId), index, field, ingredient[field]);
          });
        }
      );
    });

    if (isFormValid()) {
      post(route('preparedata.store'), {
        preserveScroll: true,
        onSuccess: () => setIsDrawerOpen(false),
      });
    }
  };

  const selectedProduct = data.find(
    (product) => product.id.toString() === formData.product_id
  );

  const validateField = (
    parentId: number,
    index: number,
    field: string,
    value: string
  ) => {
    const errors: ValidationErrors = { ...validationErrors };

    if (!errors[parentId]) {
      errors[parentId] = [];
    }

    if (!errors[parentId][index]) {
      errors[parentId][index] = {};
    }

    if (field === 'batch' && value.trim() === '') {
      errors[parentId][index][field] = 'Batch is required.';
    } else if (field === 'expiryDate' && value.trim() === '') {
      errors[parentId][index][field] = 'Expiry Date is required.';
    } else if (field === 'amount') {
      const numericValue = Number(value);
      if (value === '' || isNaN(numericValue) || numericValue <= 0) {
        (errors[parentId] as any)[field] = 'Amount must be a positive number.';
      } else {
        delete (errors[parentId] as any)[field];
      }
    } else {
      delete errors[parentId][index][field];
    }

    setValidationErrors(errors);
  };

  const isFormValid = (): boolean => {
    return Object.keys(validationErrors).every((parentId) =>
      Object.values(validationErrors[parentId]).every(
        (fields) => Object.keys(fields).length === 0
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="product_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product
          </label>
          <select
            id="product_id"
            value={formData.product_id}
            onChange={(e) => handleInputChange('product_id', e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a product</option>
            {data.map((product) => (
              <option key={product.id} value={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
          {errors.product_id && (
            <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="volume"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Unit
            </label>
            <select
              id="volume"
              value={formData.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="gram">gram</option>
              <option value="kg">kg</option>
              <option value="liter">liter</option>
            </select>
            {errors.volume && (
              <p className="text-red-500 text-sm mt-1">{errors.volume}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="batch_code"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Batch Code
          </label>
          <TextInput
            id="batch_code"
            type="text"
            placeholder="Enter batch code"
            value={formData.batch_code}
            onChange={(e) => handleInputChange('batch_code', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.batch_code && (
            <p className="text-red-500 text-sm mt-1">{errors.batch_code}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="expiry_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Date
            </label>
            <TextInput
              id="expiry_date"
              type="date"
              value={formData.expiry_date}
              onChange={(e) => handleInputChange('expiry_date', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expiry_date && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry_date}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="expiry_time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Expiry Time
            </label>
            <TextInput
              id="expiry_time"
              type="time"
              value={formData.expiry_time}
              onChange={(e) => handleInputChange('expiry_time', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {errors.expiry_time && (
              <p className="text-red-500 text-sm mt-1">{errors.expiry_time}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Enter comment"
            value={formData.comment}
            onChange={(e) => handleInputChange('comment', e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
          )}
        </div>

        <label
          htmlFor="comment"
          className="block text-m text-black-700 mb-1 font-bold"
        >
          Ingredient
        </label>

        {selectedProduct?.trace_product_info?.ingredients.map(
          (parentIngredient) => (
            <div key={parentIngredient.id} className="mt-4">
              <div
                onClick={() => toggleAccordion(parentIngredient.id)}
                className="flex justify-between items-center cursor-pointer p-2 border border-gray-300 rounded-md"
              >
                <p className="font-medium">{parentIngredient.ingredient}</p>
                <span className="text-lg font-bold">
                  {accordionState[parentIngredient.id] ? '-' : '+'}
                </span>
              </div>
              {accordionState[parentIngredient.id] && (
                <div className="mt-2 p-2 border border-gray-200 rounded-md">
                  {(formData.ingredients[parentIngredient.id] || []).map(
                    (ingredient, index) => (
                      <div key={index} className="mt-4">
                        <div className="grid grid-cols-4 gap-4 items-center">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Batch
                            </label>
                            <TextInput
                              type="text"
                              value={ingredient.batch || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                handleIngredientChange(
                                  parentIngredient.id,
                                  index,
                                  'batch',
                                  value
                                );
                                validateField(
                                  parentIngredient.id,
                                  index,
                                  'batch',
                                  value
                                );
                              }}
                              className={`w-full p-2 border ${
                                validationErrors[parentIngredient.id]?.[index]
                                  ?.batch
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              } rounded-md shadow-sm`}
                            />
                            {validationErrors[parentIngredient.id]?.[index]
                              ?.batch && (
                              <p className="text-red-500 text-sm">
                                {
                                  validationErrors[parentIngredient.id][index]
                                    .batch
                                }
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date
                            </label>
                            <TextInput
                              type="date"
                              value={ingredient.expiryDate || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                handleIngredientChange(
                                  parentIngredient.id,
                                  index,
                                  'expiryDate',
                                  value
                                );
                                validateField(
                                  parentIngredient.id,
                                  index,
                                  'expiryDate',
                                  value
                                );
                              }}
                              className={`w-full p-2 border ${
                                validationErrors[parentIngredient.id]?.[index]
                                  ?.expiryDate
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              } rounded-md shadow-sm`}
                            />
                            {validationErrors[parentIngredient.id]?.[index]
                              ?.expiryDate && (
                              <p className="text-red-500 text-sm">
                                {
                                  validationErrors[parentIngredient.id][index]
                                    .expiryDate
                                }
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amount
                            </label>
                            <TextInput
                              type="number"
                              value={ingredient.amount || ''}
                              onChange={(e) => {
                                const value = e.target.value;
                                handleIngredientChange(
                                  parentIngredient.id,
                                  index,
                                  'amount',
                                  value
                                );
                                validateField(
                                  parentIngredient.id,
                                  index,
                                  'amount',
                                  value
                                );
                              }}
                              className={`w-full p-2 border ${
                                validationErrors[parentIngredient.id]?.[index]
                                  ?.amount
                                  ? 'border-red-500'
                                  : 'border-gray-300'
                              } rounded-md shadow-sm`}
                            />
                            {validationErrors[parentIngredient.id]?.[index]
                              ?.amount && (
                              <p className="text-red-500 text-sm">
                                {
                                  validationErrors[parentIngredient.id][index]
                                    .amount
                                }
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Unit
                            </label>
                            <p className="p-2 border border-gray-300 rounded-md text-gray-900">
                              {ingredient.unit || 'gram'}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveField(parentIngredient.id, index)
                            }
                            className="text-red-500 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  )}
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handleAddMoreFields(parentIngredient.id)}
                      className="text-blue-500 font-medium"
                    >
                      Add More
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )}
        <div className="mt-6">
          <CommonButton type="submit" variant="success" disabled={processing}>
            Submit
          </CommonButton>
        </div>
      </div>
    </form>
  );
};

export default PreparedProduct;
