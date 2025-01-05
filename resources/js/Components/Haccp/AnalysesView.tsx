import { usePage } from '@inertiajs/react';
import CommonButton from '../CommonButton';
import Table from '../Table';

export default function AnalysesView({
  translations,
  analysesData,
  setIsEditing,
  isEditing,
}: any) {
  const formatFrequency = (frequency: string) => {
    return frequency
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const url = usePage().props.auth;
  const role = (url as any).roles[0];

  const columns = [
    {
      label: translations.task,
      key: 'task_name',
    },
    {
      label: translations.frequency,
      key: 'frequency',
      renderCell: (params: any) => (
        <span>{formatFrequency(params.frequency)}</span>
      ),
    },
    {
      label: translations.comment,
      key: 'comment',
    },
    {
      label: translations.customFreq,
      key: 'custom_frequency',
      renderCell: (params: any) =>
        params.frequency === 'other' && <span>{params.custom_frequency}</span>,
    },
  ];

  return (
    <div className="w-full bg-white p-0 shadow rounded-md">
      <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
        <h5 className="text-xl font-semibold">{translations.analyses}</h5>

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
              className="!border-orange-400 hover:text-white hover:!bg-gradient-org-red"
              variant="outlined"
              href={route('haccp')}
            >
              Back
            </CommonButton>
          )}
        </div>
      </div>
      <div className="p-4">
        <Table columns={columns} datas={analysesData} route={route('')} />
      </div>
    </div>
  );
}
