import TextInput from '../TextInput';
import { useState } from 'react';
import CommonButton from '../CommonButton';
import { FaPlus, FaMinus } from 'react-icons/fa';

const CreatePackageFeature = ({
  handleSubmit,
  processing,
  featureHeading,
  errors,
  data,
  setData,
  isEditMode,
}: any) => {
  const addFeature = () => {
    setData((prevData: any) => ({
      ...prevData,
      features: [
        ...prevData.features,
        { feature_name: '', feature_description: '' },
      ],
    }));
  };

  const removeFeature = (index: number) => {
    setData((prevData: any) => ({
      ...prevData,
      features: prevData.features.filter((_: any, i: any) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, key: string, value: string) => {
    const updatedFeatures = [...data.features];
    updatedFeatures[index][key] = value;
    setData((prevData: any) => ({
      ...prevData,
      features: updatedFeatures,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Feature Heading</label>
          <select
            name="feature_heading"
            value={data.feature_heading}
            onChange={(e) => setData('feature_heading', e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="">Select a Feature Heading</option>
            {featureHeading.map((heading: any) => (
              <option key={heading.id} value={heading.id}>
                {heading.feature_heading}
              </option>
            ))}
          </select>
          {errors.feature_heading && (
            <p className="text-red-500">{errors.feature_heading}</p>
          )}
        </div>

        {data.features.map((feature: any, index: number) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">Package Feature</label>
            <TextInput
              type="text"
              name={`features.${index}.feature_name`}
              value={feature.feature_name}
              onChange={(e) =>
                handleFeatureChange(index, 'feature_name', e.target.value)
              }
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors[`features.${index}.feature_name`] && (
              <p className="text-red-500">feature name is required</p>
            )}

            <label className="block text-gray-700 mt-2">Description</label>
            <textarea
              name={`features.${index}.feature_description`}
              value={feature.feature_description}
              onChange={(e) =>
                handleFeatureChange(
                  index,
                  'feature_description',
                  e.target.value
                )
              }
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
            {errors[`features.${index}.feature_description`] && (
              <p className="text-red-500">feature description is required</p>
            )}

            <div className="flex justify-between mt-2">
              <CommonButton
                variant="outlined"
                type="button"
                onClick={() => removeFeature(index)}
                className="flex items-center"
              >
                <FaMinus className="mr-1" />
              </CommonButton>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <CommonButton variant="outlined" type="button" onClick={addFeature}>
            <FaPlus />
          </CommonButton>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <CommonButton
          variant="outlined"
          className="mt-4 p-2 rounded"
          href={route('admin.features.index')}
        >
          Back
        </CommonButton>
        <CommonButton
          variant="success"
          type="submit"
          className={`mt-4 p-2 text-white rounded ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
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

export default CreatePackageFeature;
