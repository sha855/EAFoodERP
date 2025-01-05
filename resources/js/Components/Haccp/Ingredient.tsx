import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import CommonButton from '@/Components/CommonButton';
import { usePage } from '@inertiajs/react';

export default function IngredientIndex({
  translations,
  isEditing,
  handleEditClick,
  ingredients,
  selectedIngredients,
  onCheckboxChange,
  onSubmit,
  processing,
}: any) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h2 className="text-xl font-bold">{translations.ingredient}</h2>
        <div className="flex justify-end gap-2">
          {role !== 'admin' && (
            <CommonButton
              className="border-orange-400 hover:text-white	hover:!bg-gradient-org-red"
              variant="outlined"
              href={route('haccp')}
            >
              Back
            </CommonButton>
          )}
          <CommonButton
            variant="outlined"
            onClick={handleEditClick}
            className="flex"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </CommonButton>
        </div>
      </div>

      <div className="p-6">
        {Array.isArray(ingredients) ? (
          ingredients.map((ingredient: any, index: number) => (
            <div className="border rounded-md mb-2" key={index}>
              <div
                className={`flex justify-between items-center p-4 bg-gray-100 font-semibold cursor-pointer border-b border-gray-100 ${
                  expanded === ingredient.name ? 'rounded-t-md' : 'rounded-md'
                }`}
                onClick={(event) =>
                  handleChange(ingredient.name)(
                    event,
                    expanded !== ingredient.name
                  )
                }
              >
                <span>{ingredient.name}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 ${expanded === ingredient.name ? 'transform rotate-180' : ''}`}
                />
              </div>

              {expanded === ingredient.name && (
                <div className="p-4 md:p-8">
                  <div className="md:grid md:grid-cols-4 gap-4 mb-0 p-5 bg-gray-100 rounded-t-md">
                    <span className="font-bold">
                      {translations.foodTemperature}
                    </span>
                    <span className="font-bold">{translations.frozen}</span>
                    <span className="font-bold">{translations.chilled}</span>
                    <span className="font-bold">{translations.roomTemp}</span>
                  </div>

                  {Array.isArray(ingredient.ingredient_types) ? (
                    ingredient.ingredient_types.map(
                      (ingredientType: any, idx: any) => (
                        <div
                          key={idx}
                          className="grid md:grid-cols-4 gap-4 items-center mb-2 bg-slate-50 p-3 rounded-md shadow"
                        >
                          <span>
                            {ingredientType.food_temperature_reception}
                          </span>
                          <input
                            type="checkbox"
                            className="form-checkbox focus:ring-transparent focus:border-gray-300 border-gray-200 mr-2 w-5 h-5 rounded-sm text-orange-400 cursor-pointer"
                            checked={
                              !!selectedIngredients[ingredient.id]?.[
                                ingredientType.id
                              ]?.is_frozen
                            }
                            onChange={() =>
                              onCheckboxChange(
                                ingredient.id,
                                ingredientType.id,
                                'is_frozen'
                              )
                            }
                          />
                          <input
                            type="checkbox"
                            className="form-checkbox focus:ring-transparent focus:border-gray-300 border-gray-200 mr-2 w-5 h-5 rounded-sm text-orange-400 cursor-pointer"
                            checked={
                              !!selectedIngredients[ingredient.id]?.[
                                ingredientType.id
                              ]?.is_chilled
                            }
                            onChange={() =>
                              onCheckboxChange(
                                ingredient.id,
                                ingredientType.id,
                                'is_chilled'
                              )
                            }
                          />
                          <input
                            type="checkbox"
                            className="form-checkbox focus:ring-transparent focus:border-gray-300 border-gray-200 mr-2 w-5 h-5 rounded-sm text-orange-400 cursor-pointer"
                            checked={
                              !!selectedIngredients[ingredient.id]?.[
                                ingredientType.id
                              ]?.is_room_temperature
                            }
                            onChange={() =>
                              onCheckboxChange(
                                ingredient.id,
                                ingredientType.id,
                                'is_room_temperature'
                              )
                            }
                          />
                        </div>
                      )
                    )
                  ) : (
                    <p>{translations.noIngredientsFound}</p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>{translations.noIngredientsFound}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-4 p-6 border-t border-slate-300">
        <CommonButton variant="outlined" href={route('haccp')}>
          Cancel
        </CommonButton>

        <CommonButton
          variant="success"
          onClick={onSubmit}
          disabled={processing}
        >
          {processing ? 'Saving...' : 'Save'}
        </CommonButton>
      </div>
    </div>
  );
}
