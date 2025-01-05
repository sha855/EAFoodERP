import React from 'react';
import CommonButton from '../CommonButton';
import { usePage } from '@inertiajs/react';

export default function IngredientView({
  companyIngredient,
  translations,
  handleEditClick,
  isEditing,
}: any) {
  const groupedIngredients = companyIngredient.reduce((acc: any, item: any) => {
    if (item.company_ingredients && item.company_ingredients.length > 0) {
      const groupName = item.name;
      if (!acc[groupName]) {
        acc[groupName] = [];
      }
      acc[groupName].push(...item.company_ingredients);
    }
    return acc;
  }, {});

  const getTemperatureTypes = (ingredient: any) => {
    const temperatures = [];
    if (ingredient.is_frozen) temperatures.push('Frozen');
    if (ingredient.is_chilled) temperatures.push('Chilled');
    if (ingredient.is_room_temperature) temperatures.push('Room Temperature');
    return temperatures.join(', ');
  };

  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <div className="flex ">
      <div className="w-full bg-white rounded-lg h-fit">
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
        <div className="p-8 bg-white rounded-b-md">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Ingredient Group</th>
                <th className="border border-gray-300 p-2">Food Group</th>
                <th className="border border-gray-300 p-2">
                  Food Temperature in Reception
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedIngredients).length > 0 ? (
                Object.keys(groupedIngredients).map((group) => (
                  <>
                    {groupedIngredients[group].map(
                      (ingredient: any, index: any) => (
                        <tr key={ingredient.id}>
                          {index === 0 ? (
                            <td
                              className="border border-gray-300 p-2"
                              rowSpan={groupedIngredients[group].length}
                            >
                              {group}
                            </td>
                          ) : null}
                          <td className="border border-gray-300 p-2">
                            {
                              ingredient.ingredient_type
                                ?.food_temperature_reception
                            }
                          </td>
                          <td className="border border-gray-300 p-2">
                            {getTemperatureTypes(ingredient)}
                          </td>
                        </tr>
                      )
                    )}
                  </>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="border border-gray-300 p-2 text-center"
                  >
                    No ingredients added. Please add some ingredients.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
