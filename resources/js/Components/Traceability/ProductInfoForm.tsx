import { router, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from '../CommonButton';
import { FiPlus } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import Modal from '../Modal/Modal';
import TextInput from '../TextInput';

type Ingredient = {
  name: string;
  allergens: string[];
};

export default function ProductInfoForm({
  translations,
  ingredientEnum,
  data,
  setData,
  errors,
  handleIngredientChange,
  customUnit,
  handleRemoveIngredient,
  handleAddIngredient,
  traceAllergens,
  companyId,
}: any) {
  const initialOptions = ingredientEnum.map((option: any) => ({
    value: option.name,
    label: option.name,
  }));

  const [selectOptions, setSelectOptions] = useState(initialOptions);
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const customOptions = customIngredients.map((ingredient) => ({
      value: ingredient.name,
      label: ingredient.name,
      allergens: ingredient.allergens || [],
    }));

    setSelectOptions((prevOptions: any) => {
      const combinedOptions = [...prevOptions, ...customOptions];

      return combinedOptions.filter(
        (option, index, self) =>
          index === self.findIndex((o) => o.value === option.value)
      );
    });
  }, [customIngredients]);

  const handleAddCustomIngredient = () => {
    if (!newIngredient.trim()) return;

    const isDuplicate = customIngredients.some(
      (ingredient) => ingredient.name === newIngredient.trim()
    );

    if (isDuplicate) {
      return;
    }

    setProcessing(true);
    setCustomIngredients((prev) => [
      ...prev,
      { name: newIngredient.trim(), allergens: selectedAllergens },
    ]);

    setNewIngredient('');
    setSelectedAllergens([]);
    setProcessing(false);
    setShowModal(false);
  };

  const handleAllergenChange = (allergen: string) => {
    setSelectedAllergens((prev) =>
      prev.includes(allergen)
        ? prev.filter((a) => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewIngredient('');
    setSelectedAllergens([]);
  };

  return (
    <div>
      <div className="mt-4">
        {data.ingredients.map((ingredient: any, index: any) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <Select
              value={
                selectOptions.find(
                  (opt: any) => opt.value === ingredient.ingredient
                ) || null
              }
              onChange={(selectedOption) =>
                handleIngredientChange(
                  index,
                  'ingredient',
                  selectedOption.value,
                  'allergens',
                  selectedOption.allergens
                )
              }
              options={selectOptions}
              placeholder={translations.choose_ingredient}
              className="flex-1"
              isClearable
            />
            <select
              value={ingredient.ingredient_units || (ingredient as any).unit}
              onChange={(e) =>
                handleIngredientChange(
                  index,
                  'ingredient_units',
                  e.target.value
                )
              }
              className="border p-2 rounded-md w-56"
              aria-label="Filter by ingredient unit"
            >
              <option value="">{translations.choose}</option>
              {customUnit.map((unit: any) => (
                <option key={unit.name} value={unit.name}>
                  {unit.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={ingredient.amount || 0}
              onChange={(e) =>
                handleIngredientChange(index, 'amount', Number(e.target.value))
              }
              className="border p-2 rounded-md w-24"
              placeholder="Amount"
            />

            <button
              onClick={() => handleRemoveIngredient(index)}
              className="text-red-500"
            >
              <CloseIcon />
            </button>
          </div>
        ))}

        {errors.ingredients && (
          <span className="text-red-600 text-sm mt-1">
            {errors.ingredients}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <CommonButton
          onClick={handleAddIngredient}
          variant="success"
          className="flex items-center gap-2 px-4 py-2"
        >
          <FiPlus className="text-white" />
          {translations.addIngredient}
        </CommonButton>

        <CommonButton
          onClick={() => setShowModal(true)}
          variant="outlined"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300"
        >
          <FiPlus className="text-gray-600" />
          Custom Ingredient
        </CommonButton>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4 p-2 mt-5">
          <div className="flex flex-col items-start">
            <label className="font-medium" htmlFor="recipe-total-amount">
              {translations.recipeTotalAmount}
            </label>
            <div className="flex items-center gap-2 w-full mb-4">
              <input
                type="number"
                id="recipe-total-amount"
                name="recipe_total_amount"
                value={data.recipe_total_amount || 0}
                onChange={(e) =>
                  setData('recipe_total_amount', Number(e.target.value))
                }
                className={`border p-2 rounded-md w-1/2 ${
                  errors.recipe_total_amount
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                required
              />
              <select
                value={data.recipe_total_amount_unit || ''}
                onChange={(e) =>
                  setData('recipe_total_amount_unit', e.target.value)
                }
                className={`border p-2 rounded-md w-1/2 ${
                  errors.recipe_total_amount_unit
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value="">{translations.choose}</option>
                {customUnit.map((unit: any) => (
                  <option key={unit.name} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.recipe_total_amount && (
              <span className="text-red-600 text-sm mt-1">
                {errors.recipe_total_amount}
              </span>
            )}
            {errors.recipe_total_amount_unit && (
              <span className="text-red-600 text-sm mt-1">
                {errors.recipe_total_amount_unit}
              </span>
            )}
          </div>

          {/* One Portion Amount */}
          <div className="flex flex-col items-start">
            <label className="font-medium" htmlFor="one-portion-amount">
              {translations.onePortionAmount}
            </label>
            <div className="flex items-center gap-2 mb-4 w-full">
              <input
                type="number"
                id="one-portion-amount"
                name="one_portion_amount"
                value={data.one_portion_amount || 0}
                onChange={(e) =>
                  setData('one_portion_amount', Number(e.target.value))
                }
                className={`border p-2 rounded-md w-1/2 ${
                  errors.one_portion_amount
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                required
              />
              <select
                value={data.one_portion_amount_unit || ''}
                onChange={(e) =>
                  setData('one_portion_amount_unit', e.target.value)
                }
                className={`border p-2 rounded-md w-1/2 ${
                  errors.one_portion_amount_unit
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value="">{translations.choose}</option>
                {customUnit.map((unit: any) => (
                  <option key={unit.id} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.one_portion_amount && (
              <span className="text-red-600 text-sm mt-1">
                {errors.one_portion_amount}
              </span>
            )}
            {errors.one_portion_amount_unit && (
              <span className="text-red-600 text-sm mt-1">
                {errors.one_portion_amount_unit}
              </span>
            )}
          </div>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-[100] flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">
              Create a Custom Ingredient
            </h2>
            <TextInput
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Ingredient Name"
              className="border p-2 rounded-md w-full mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              Does this product contain any allergens?
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {traceAllergens.map((allergen: any, index: any) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAllergens.includes(allergen)}
                    onChange={() => handleAllergenChange(allergen)}
                    className="w-4 h-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{allergen}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <CommonButton onClick={handleCloseModal} variant="outlined">
                Cancel
              </CommonButton>
              <CommonButton
                onClick={handleAddCustomIngredient}
                variant="success"
                disabled={processing}
              >
                {processing ? 'Adding...' : 'Add Ingredient'}
              </CommonButton>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold">Custom Ingredients</h3>
        {customIngredients.length === 0 ? (
          <p className="text-gray-500">No custom ingredients added.</p>
        ) : (
          customIngredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <span>{ingredient.name}</span>
              {ingredient.allergens.length > 0 && (
                <span className="text-sm text-gray-500">
                  (Allergens: {ingredient.allergens.join(', ')})
                </span>
              )}
            </div>
          ))
        )}

        <div className="flex flex-col mt-4">
          <label className="font-bold mb-2">
            {translations.preparationInstructions}
          </label>
          <div>
            <ReactQuill
              value={data.preparation_instructionst}
              onChange={(value) => setData('preparation_instructionst', value)}
            />

            {errors.preparation_instructionst && (
              <span className="text-red-600 text-sm mt-1">
                {errors.preparation_instructionst}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
