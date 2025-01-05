import CommonButton from '@/Components/CommonButton';
import { TrashIcon } from '@heroicons/react/20/solid';
import TextInput from '../TextInput';
import { FaPlus } from 'react-icons/fa';
import { usePage } from '@inertiajs/react';

export default function AnalysesIndex({
  translations,
  frequency,
  analysesData,
  handleChange,
  handleSubmit,
  addNewAnalysis,
  removeAnalysis,
  isEditing,
  setIsEditing,
  errors,
  waterSystemAnalyses
}: any) {
  const url = usePage().props.auth;
  const role = (url as any).roles[0];
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h5 className="text-xl font-bold text-gray-800">
          {translations.analyses}
        </h5>
        <div className="flex justify-end gap-2">
          <CommonButton
            variant="outlined"
            onClick={() => setIsEditing(!isEditing)}
            className="flex"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </CommonButton>
          {role !== 'admin' && (
            <CommonButton
              className="!border-orange-400 hover:text-white  hover:!bg-gradient-org-red"
              variant="outlined"
              href={route('haccp')}
            >
              Back
            </CommonButton>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 mt-1 mb-8">
          <div>
            <p className="font-bold">{translations.task}</p>
          </div>
          <div>
            <p className="font-bold">{translations.frequency}</p>
          </div>
          <div>
            <p className="font-bold">{translations.comment}</p>
          </div>
          <div>
            <p className="font-bold">{translations.customFreq}</p>
          </div>
        </div>

        {analysesData.map((analysis: any, index: any) => (
        <div className="grid grid-cols-4 gap-4 mt-1" key={analysis.id}>
          <div>
            <TextInput
              type="text"
              placeholder="Task Name"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border"
              value={analysis.task_name}
              onChange={(e) => handleChange(index, 'task_name', e.target.value)}
            />
            {errors[`analyses.${index}.task_name`] && (
              <p className="text-red-500 text-sm mt-1">Task name is required</p>
            )}
          </div>
          <div>
            {analysis.task_name === 'Water system type' ? (
              <select
                className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border"
                value={analysis.frequency}
                onChange={(e) => handleChange(index, 'frequency', e.target.value)}
              >
                <option value="">Select Water System Type</option>
                {waterSystemAnalyses.map((type: string, i: number) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            ) : (
              <select
                className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border"
                value={analysis.frequency}
                onChange={(e) => handleChange(index, 'frequency', e.target.value)}
              >
                <option value="">Select Frequency</option>
                {Object.entries(frequency).map(([value, label]: any) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}
            {errors[`analyses.${index}.frequency`] && (
              <p className="text-red-500 text-sm mt-1">{errors[`analyses.${index}.frequency`]}</p>
            )}
          </div>
          <div>
            <textarea
              rows={2}
              placeholder="Add a comment"
              className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border"
              value={analysis.comment}
              onChange={(e) => handleChange(index, 'comment', e.target.value)}
            />
            {errors[`analyses.${index}.comment`] && (
              <p className="text-red-500 text-sm mt-1">Comment field is required</p>
            )}
          </div>
          <div>
            {analysis.frequency === 'other' && (
              <>
                <textarea
                  rows={2}
                  placeholder="Custom frequency details"
                  className="rounded-md shadow-sm bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-300 w-full border"
                  value={analysis.custom_frequency}
                  onChange={(e) => handleChange(index, 'custom_frequency', e.target.value)}
                />
                {errors[`analyses.${index}.custom_frequency`] && (
                  <p className="text-red-500 text-sm mt-1">Custom frequency is required</p>
                )}
              </>
            )}
            <div className="flex justify-end">
              {analysis.isNew && (
                <button
                  type="button"
                  onClick={() => removeAnalysis(analysis.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
        <div className="flex justify-start gap-2 mt-3">
          <CommonButton
            variant="text"
            onClick={addNewAnalysis}
            className="bg-gradient-org-red !text-white flex justify-center items-center gap-2"
          >
            <FaPlus />
            Add New
          </CommonButton>
        </div>
      </div>

      <div className="p-6 border-t border-slate-300">
        <div className="flex justify-end gap-2 mt-0">
          <CommonButton
            variant="success"
            className="bg-green-500 text-white hover:bg-darkgreen"
            type="submit"
          >
            Save
          </CommonButton>
        </div>
      </div>
    </form>
  );
}
