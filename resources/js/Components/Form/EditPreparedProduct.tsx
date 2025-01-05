import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import CommonButton from '../CommonButton';
import TextInput from '../TextInput';

type Ingredient = {
  id: number;
  add_ingredient_id: number;
  ingredient: string;
  batch_no: string;
  amount: string;
  unit: string;
  expiry_date: string;
};

interface Props {
  data: {
    id: number;
    product_id: string;
    amount: string;
    volume: string;
    expiry_date: string;
    expiry_time: string;
    batch_code: string;
    comment: string;
    preparation_ingredients: Ingredient[];
  };
  companyId: string;
  setEditIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: { id: string; product_name: string }[];
}

const EditPreparedProduct: React.FC<Props> = ({
  data,
  companyId,
  setEditIsDrawerOpen,
  product,
}: any) => {
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
    id: 0,
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

  useEffect(() => {
    if (data && data.id !== formData.id) {
      const product = data;
      const transformedIngredients = product?.preparation_ingredients?.reduce(
        (
          acc: Record<string, { name: string; details: Ingredient[] }>,
          ingredient: Ingredient
        ) => {
          const ingredientName = ingredient.ingredient;
          if (!acc[ingredientName]) {
            acc[ingredientName] = {
              name: ingredientName,
              details: [],
            };
          }
          (acc as any)[ingredientName].details.push({
            id: ingredient.id,
            batch_no: ingredient.batch_no,
            add_ingredient_id: ingredient.add_ingredient_id,
            amount: ingredient.amount,
            expiry_date: ingredient.expiry_date,
            unit: ingredient.unit,
          });
          return acc;
        },
        {}
      );
      (setData as any)({
        id: product?.id ?? 0,
        product_id: product?.product_id ?? '',
        amount: product?.amount ?? '',
        volume: product?.volume ?? 'gram',
        expiry_date: product?.expiry_date ?? '',
        expiry_time: product?.expiry_time ?? '',
        batch_code: product?.batch_code ?? '',
        comment: product?.comment ?? '',
        company_id: companyId,
        ingredients: transformedIngredients || {},
      });
    }
  }, [data, setData, companyId]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setData(field, value);
  };

  const toggleAccordion = (id: number) => {
    setAccordionState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const updateIngredientDetail = (
    ingredientName: string,
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updatedIngredients = { ...formData.ingredients };
    (updatedIngredients as any)[ingredientName].details[index][field] = value;
    setData('ingredients', updatedIngredients);
  };

  const removeIngredientDetail = (ingredientName: string, index: number) => {
    const updatedIngredients = { ...formData.ingredients };
    (updatedIngredients as any)[ingredientName].details.splice(index, 1);
    setData('ingredients', updatedIngredients);
  };

  const addIngredientDetail = (ingredientName: string) => {
    const updatedIngredients = { ...formData.ingredients };
    const existingDetails = (updatedIngredients as any)[ingredientName]
      ?.details;
    const latestAddIngredientId =
      existingDetails?.length > 0
        ? existingDetails[existingDetails.length - 1].add_ingredient_id
        : null;
    (updatedIngredients as any)[ingredientName].details.push({
      id: Date.now(),
      batch_no: '',
      amount: '',
      unit: '',
      add_ingredient_id: latestAddIngredientId,
      expiry_date: '',
    });
    setData('ingredients', updatedIngredients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Object.entries(formData.ingredients).forEach(
      ([ingredientName, ingredientData]: any) => {
        ingredientData.details.forEach((detail: any, index: number) => {
          validateField(ingredientName, index, 'batch_no', detail.batch_no);
          validateField(ingredientName, index, 'amount', detail.amount);
          validateField(
            ingredientName,
            index,
            'expiry_date',
            detail.expiry_date
          );
        });
      }
    );

    if (isFormValid()) {
      post(route('preparedata.update', { id: formData.id }), {
        onSuccess: () => {
          setEditIsDrawerOpen(false);
        },
        onError: (errors) => {
          console.error('An error occurred:', errors);
        },
      });
    } else {
      console.error('Validation failed. Please check all fields.');
    }
  };

  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {}
  );

  const validateField = (
    ingredientName: string,
    index: number,
    field: string,
    value: any
  ) => {
    const errors = { ...validationErrors };
    if (!errors[ingredientName]) {
      errors[ingredientName] = [];
    }
    if (!errors[ingredientName][index]) {
      errors[ingredientName][index] = {};
    }
    const safeValue =
      value !== null && value !== undefined ? String(value).trim() : '';

    if (field === 'batch_no' && safeValue === '') {
      errors[ingredientName][index][field] = 'Batch number is required.';
    } else if (field === 'amount') {
      const numericValue = Number(safeValue);
      if (safeValue === '' || isNaN(numericValue) || numericValue <= 0) {
        errors[ingredientName][index][field] =
          'Amount must be a positive number.';
      } else {
        delete errors[ingredientName][index][field];
      }
    } else if (field === 'expiry_date' && safeValue === '') {
      errors[ingredientName][index][field] = 'Expiry date is required.';
    } else {
      delete errors[ingredientName][index][field];
    }

    setValidationErrors(errors);
  };

  const isFormValid = () => {
    return Object.values(validationErrors).every((ingredientErrors: any) =>
      ingredientErrors.every(
        (detailErrors: any) => Object.keys(detailErrors).length === 0
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
            disabled
            value={data.product_id}
            onChange={(e) => handleInputChange('product_id', e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a product</option>
            {product.map((prod: any) => (
              <option key={prod.id} value={prod.id}>
                {prod.product_name}
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
          htmlFor="ingredients"
          className="block text-md font-bold text-gray-700 mb-1"
        >
          Ingredients
        </label>
        {Object.entries(formData.ingredients).map(
          ([ingredientName, ingredientData]) => (
            <div
              key={ingredientName}
              className="border border-gray-300 rounded-md shadow-sm p-4"
            >
              <div
                onClick={() => toggleAccordion(ingredientName as any)}
                className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-200"
              >
                <p className="font-medium text-gray-700">
                  {(ingredientData as any).name}
                </p>
                <span className="text-xl font-bold text-gray-600">
                  {(accordionState as any)[ingredientName] ? '-' : '+'}
                </span>
              </div>

              {(accordionState as any)[ingredientName] && (
                <div className="mt-2 space-y-4">
                  {(ingredientData as any).details.map(
                    (detail: any, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                      >
                        <div>
                          <TextInput
                            type="text"
                            value={detail.batch_no}
                            onChange={(e) => {
                              updateIngredientDetail(
                                ingredientName,
                                index,
                                'batch_no',
                                e.target.value
                              );
                              validateField(
                                ingredientName,
                                index,
                                'batch_no',
                                e.target.value
                              );
                            }}
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Batch No"
                          />
                          {validationErrors[ingredientName]?.[index]
                            ?.batch_no && (
                            <p className="text-red-500 text-sm mt-1">
                              {validationErrors[ingredientName][index].batch_no}
                            </p>
                          )}
                        </div>

                        <div>
                          <TextInput
                            type="number"
                            value={detail.amount}
                            onChange={(e) => {
                              updateIngredientDetail(
                                ingredientName,
                                index,
                                'amount',
                                e.target.value
                              );
                              validateField(
                                ingredientName,
                                index,
                                'amount',
                                e.target.value
                              );
                            }}
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Amount"
                          />
                          {validationErrors[ingredientName]?.[index]
                            ?.amount && (
                            <p className="text-red-500 text-sm mt-1">
                              {validationErrors[ingredientName][index].amount}
                            </p>
                          )}
                        </div>

                        <div>
                          <TextInput
                            type="text"
                            value={detail.unit}
                            onChange={(e) =>
                              updateIngredientDetail(
                                ingredientName,
                                index,
                                'unit',
                                e.target.value
                              )
                            }
                            className="border rounded px-2 py-1 w-full"
                            placeholder="Unit"
                          />
                        </div>
                        <div>
                          <TextInput
                            type="date"
                            value={detail.expiry_date}
                            onChange={(e) => {
                              updateIngredientDetail(
                                ingredientName,
                                index,
                                'expiry_date',
                                e.target.value
                              );
                              validateField(
                                ingredientName,
                                index,
                                'expiry_date',
                                e.target.value
                              );
                            }}
                            className="border rounded px-2 py-1 w-full"
                          />
                          {validationErrors[ingredientName]?.[index]
                            ?.expiry_date && (
                            <p className="text-red-500 text-sm mt-1">
                              {
                                validationErrors[ingredientName][index]
                                  .expiry_date
                              }
                            </p>
                          )}
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              removeIngredientDetail(ingredientName, index)
                            }
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => addIngredientDetail(ingredientName)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      + Add New Detail
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        )}

        <CommonButton
          type="submit"
          disabled={processing}
          variant="success"
          className="btn-submit"
        >
          {processing ? 'Saving...' : 'Save'}
        </CommonButton>
      </div>
    </form>
  );
};

export default EditPreparedProduct;
