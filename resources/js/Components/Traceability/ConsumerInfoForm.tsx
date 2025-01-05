import React from 'react';
import ReactQuill from 'react-quill';
import CloseIcon from '@mui/icons-material/Close';
import CommonButton from '../CommonButton';
import { FiPlus } from 'react-icons/fi';

export default function ConsumerInfoForm({
  translations,
  handleCheckboxChange,
  data,
  setData,
  allergens,
  EditorComponent,
  errors,
}: any) {
  console.log('the error is here', errors);

  return (
    <div>
      <div className="mb-6">
        <label className="text-sm font-bold mb-3 inline-block">
          {translations.ingredients}
        </label>
        <EditorComponent
          value={data.ingredients}
          onChange={(value: any) => setData('ingredients', value)}
        />

        {errors.ingredients && (
          <span className="text-red-600 text-sm mt-1 block">
            {errors.ingredients}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{translations.allergens}</h3>
      <div className="grid grid-cols-6 gap-5 mb-8">
        {allergens.map((allergen: any, index: any) => (
          <label key={index} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-orange-400 border-gray-300 rounded !ring-offset-0 focus:ring-transparent"
              name="allergen"
              checked={data.allergen.includes(allergen)}
              onChange={() => handleCheckboxChange(allergen)}
            />
            {allergen}
          </label>
        ))}

        {errors.allergen && (
          <span className="text-red-600 text-sm mt-1 block">
            {errors.allergen}
          </span>
        )}
      </div>

      <div className="mb-6">
        <label className="text-sm font-bold mb-3 inline-block">
          {translations.consumingGuide}
        </label>
        <EditorComponent
          value={data.consuming_guide}
          onChange={(value: any) => setData('consuming_guide', value)}
        />
      </div>

      <div className="mb-6">
        <label className="text-sm font-bold mb-3 inline-block">
          {translations.storingConditions}
        </label>
        <EditorComponent
          value={data.storing_conditions}
          onChange={(value: any) => setData('storing_conditions', value)}
        />
      </div>
    </div>
  );
}
