import { useEffect } from 'react';
import CommonButton from '../CommonButton';
import { usePage } from '@inertiajs/react';

export default function ProcessView({
  translations,
  activeProcessData,
  isEditing,
  toggleEdit,
}: any) {

  const url = usePage().props.auth;

  const role = (url as any).roles[0];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="w-full bg-white mt-2 rounded shadow-sm">
        <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
          <h5 className="text-xl font-bold text-gray-800">
            {translations.processStep}
          </h5>
          <div className="flex justify-end gap-2">
            {role !== 'admin' && (
              <CommonButton
                className=" !border-orange-400 hover:text-white hover:!bg-gradient-org-red"
                variant="outlined"
                href={route('haccp')}
              >
                Back
              </CommonButton>
            )}
            {isEditing ? (
              <CommonButton onClick={toggleEdit} variant="outlined">
                Cancel
              </CommonButton>
            ) : (
              <CommonButton onClick={toggleEdit} variant="outlined">
                Edit
              </CommonButton>
            )}
          </div>
        </div>

        <div className="p-4">
        {activeProcessData.processes.length > 0 ? (
  activeProcessData.processes
    .filter((proc: any) =>  proc.is_active === true)
    .map((proc: any) => (
      <div
        key={proc.id}
        className="grid grid-cols-12 gap-4 items-start mb-4 bg-slate-50 p-5 rounded-md"
      >
        <div className="col-span-4">
          <p className="text-base">{proc.custom_name || proc.name}</p>
        </div>
        <div className="col-span-4 flex flex-col space-y-2">
          {proc.activities.map((activity: any) => (
            <div key={activity.id} className="inline-flex items-center">
              <span className="ml-2">
                {activity.name} -{' '}
                <strong>{activity.is_active === true ? 'Active' : 'Inactive'}</strong>
              </span>
            </div>
          ))}
        </div>
        <div className="col-span-4 flex justify-center">
          <div>
            <strong>{proc.is_active === true || proc.is_active === 1 ? 'Active' : 'Inactive'}</strong>
          </div>
        </div>
      </div>
    ))
) : (
  <p className="text-gray-500">
    Please Add food Process Step to View Here by Editing
  </p>
)}

        </div>
      </div>
    </div>
  );
}
