import { useState } from 'react';
import CommonButton from '@/Components/CommonButton';
import { useForm } from '@inertiajs/react';
import TextInput from '../TextInput';

interface Feature {
  id: number;
  feature_name: string;
  feature_heading_id: number;
}

interface Plan {
  id: string;
  name: string;
}

interface CheckedPlansFeatureComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  features: { data: Feature[] };
  data: Plan[];
}

export default function PlansComparison({
  isOpen,
  onClose,
  data,
  features,
}: CheckedPlansFeatureComparisonProps) {
  const {
    data: formData,
    setData,
    post,
    errors,
    reset,
  } = useForm({
    feature_id: 0,
    feature_heading_id: 0,
    is_active: [] as string[],
    optional_act: {} as { [key: string]: string },
    package_id: data.map((plan) => plan.id),
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    post(route('admin.feature-comparison.store'), {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const togglePlanSelection = (planId: string) => {
    const updatedPlans = formData.is_active.includes(planId)
      ? formData.is_active.filter((id: string) => id !== planId)
      : [...formData.is_active, planId];
    setData('is_active', updatedPlans);
  };

  const handleOptionalActChange = (planId: string, value: string) => {
    setData('optional_act', { ...formData.optional_act, [planId]: value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full mx-auto">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold mb-0">Set Plan Comparison</h2>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Feature</label>
            <select
              value={formData.feature_id}
              onChange={(e) => {
                const selectedFeatureId = Number(e.target.value);
                const selectedFeature = features.data.find(
                  (feature) => feature.id === selectedFeatureId
                );

                if (selectedFeature) {
                  setData({
                    ...formData,
                    feature_id: selectedFeature.id,
                    feature_heading_id: selectedFeature.feature_heading_id,
                  });
                }
              }}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value="">Select a feature heading</option>
              {features.data.map((feature) => (
                <option key={feature.id} value={feature.id}>
                  {feature.feature_name}
                </option>
              ))}
            </select>
            {errors.feature_id && (
              <p className="text-red-500 text-sm mt-1">{errors.feature_id}</p>
            )}
            {errors.feature_heading_id && (
              <p className="text-red-500 text-sm mt-1">
                {errors.feature_heading_id}
              </p>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-300 rounded-md p-2 w-full text-left"
            >
              Select Plans
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-white shadow-lg rounded-md w-full p-4 max-h-60 overflow-y-auto">
                {data.map((plan) => (
                  <div
                    key={plan.id}
                    className="flex justify-between items-center space-x-2 mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.is_active.includes(plan.id)}
                        onChange={() => togglePlanSelection(plan.id)}
                        className="form-checkbox"
                      />
                      <span>{plan.name}</span>
                    </div>

                    <TextInput
                      type="text"
                      value={formData.optional_act[plan.id] || ''}
                      onChange={(e) =>
                        handleOptionalActChange(plan.id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1 w-70"
                      placeholder="Action (optional)"
                    />
                  </div>
                ))}
              </div>
            )}

            {errors.is_active && (
              <p className="text-red-500 text-sm mt-1">{errors.is_active}</p>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex justify-end gap-4">
            <CommonButton
              variant="success"
              onClick={handleSubmit}
              className="!py-2"
            >
              Submit
            </CommonButton>
            <CommonButton
              variant="outlined"
              onClick={onClose}
              className="!py-2"
            >
              Cancel
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
