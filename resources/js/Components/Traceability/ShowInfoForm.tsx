import React from 'react';
import ReactQuill from 'react-quill';
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from '../CommonButton';
import { FiPlus } from 'react-icons/fi';

export default function ShowInfoForm({
  translations,
  ingredientEnum,
  data,
  customUnit,
}: any) {
  const EditorComponent = ({ value }: any) => {
    return (
      <div>
        <ReactQuill value={value} readOnly={true} theme="bubble" />
      </div>
    );
  };

  return (
    <div>
      <div className="mt-4">
        {data.ingredients.map((ingredient: any, index: any) => (
          <div
            key={index}
            className="flex items-center mb-2 text-sm text-gray-800 gap-4"
          >
            <div className="w-12 text-right font-bold">
              {ingredient.amount || 0}
            </div>
            <div className="w-12 text-left font-bold">
              {ingredient.ingredient_units || ingredient.unit || '-'}
            </div>
            <div className="flex-1  text-left font-bold">
              {ingredient.ingredient || '-'}
            </div>
          </div>
        ))}
      </div>
      <hr></hr>
      <div className="space-y-6 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
          <div className="flex flex-col">
            <label className="font-medium text-gray-900 mb-1">
              {translations.recipeTotalAmount}
            </label>
            <div className="flex flex-col">
              <label className="font-medium text-gray-900 mb-1">
                {translations.onePortionAmount}
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-900 mb-1">
              {data.recipe_total_amount || 0}{' '}
              {data.recipe_total_amount_unit || '-'}
            </label>
            <div className="flex flex-col">
              <div className="text-gray-800">
                {data.one_portion_amount || 0}{' '}
                {data.one_portion_amount_unit || '-'}
              </div>
              <div className="text-gray-600 text-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <hr></hr>
      <div className="flex flex-col mt-4">
        <label className="font-bold mb-2">
          {translations.preparationInstructions}
        </label>
        <EditorComponent value={data.preparation_instructionst || ''} />
      </div>
    </div>
  );
}
