import TextInput from '../TextInput';
import { useState } from 'react';
import CommonButton from '../CommonButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreatePackage = ({
  handleSubmit,
  handleCKEditorChange,
  processing,
  errors,
  data,
  setData,
  isEditMode,
  setIsEditMode,
}: any) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-0">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <TextInput
            type="text"
            name="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Annual Price</label>
            <TextInput
              type="number"
              name="annually_price"
              value={data.annually_price}
              onChange={(e) => setData('annually_price', e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.annually_price && (
              <p className="text-red-500">{errors.annually_price}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Monthly Price</label>
            <TextInput
              type="number"
              name="monthly_price"
              value={data.monthly_price}
              onChange={(e) => setData('monthly_price', e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.monthly_price && (
              <p className="text-red-500">{errors.monthly_price}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">
              Annual Discounted Price
            </label>
            <TextInput
              type="number"
              name="annually_discounted_price"
              value={data.annually_discounted_price}
              onChange={(e) =>
                setData('annually_discounted_price', e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.annually_discounted_price && (
              <p className="text-red-500">{errors.annually_discounted_price}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">
              Monthly Discounted Price
            </label>
            <TextInput
              type="number"
              name="monthly_discounted_price"
              value={data.monthly_discounted_price}
              onChange={(e) =>
                setData('monthly_discounted_price', e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.monthly_discounted_price && (
              <p className="text-red-500">{errors.monthly_discounted_price}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Member Limit</label>
          <TextInput
            type="number"
            name="member_limit"
            value={data.member_limit}
            onChange={(e) => setData('member_limit', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.member_limit && (
            <p className="text-red-500">{errors.member_limit}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Is Trial</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_trial"
                checked={data.is_trial}
                onChange={(e) => setData('is_trial', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 text-sm">
                Enable trial for this package
              </span>
            </div>
            {errors.is_trial && (
              <p className="text-red-500">{errors.is_trial}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Is Monthly</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="monthly"
                checked={data.monthly}
                onChange={(e) => setData('monthly', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 text-sm">
                Enable For Monthly Plans
              </span>
            </div>
            {errors.monthly && <p className="text-red-500">{errors.monthly}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Is Yearly</label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="yearly"
                checked={data.yearly}
                onChange={(e) => setData('yearly', e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-gray-700 text-sm">
                Enable For yearly Plans
              </span>
            </div>
            {errors.yearly && <p className="text-red-500">{errors.yearly}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Yearly Saving</label>
            <TextInput
              type="text"
              name="yearly_saving"
              value={data.yearly_saving}
              onChange={(e) => setData('yearly_saving', e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors.yearly_saving && (
              <p className="text-red-500">{errors.yearly_saving}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Details</label>
          <CKEditor
            editor={ClassicEditor as any}
            data={data.details}
            onChange={handleCKEditorChange}
          />
          {errors.details && <p className="text-red-500">{errors.details}</p>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <CommonButton
          variant="outlined"
          className="mt-4 p-2 rounded"
          href={route('admin.membership.index')}
        >
          Back
        </CommonButton>
        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${
            processing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={processing}
        >
          {processing
            ? isEditMode
              ? 'Updating...'
              : 'Creating...'
            : isEditMode
              ? 'Update Package'
              : 'Create Package'}
        </CommonButton>
      </div>
    </form>
  );
};
export default CreatePackage;
