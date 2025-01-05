import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import { useForm, usePage } from '@inertiajs/react';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from 'react';

export interface editData {
  id: number;
  monitoring_task_id: number;
  name: string;
  start_date: string;
  end_date: string;
  company_id: string;
}

const CreatePauseTask = ({
  companyId,
  allTasks,
  translations,
  edit,
  setEdit,
}: {
  companyId: number;
  allTasks: any[];
  translations: any;
  edit: editData;
  setEdit: Dispatch<SetStateAction<any>>;
}) => {
  const dispatch = useAppDispatch();

  const routeParams = {
    id: edit?.id,
    ...(companyId ? { company: companyId } : {}),
  };

  const { data, setData, post, put, errors } = useForm({
    id: edit?.id || '',
    monitoring_task_id: edit?.monitoring_task_id || '',
    name: edit?.name || '',
    start_date: edit?.start_date || '',
    end_date: edit?.end_date || '',
    company_id: edit?.company_id || companyId || '',
  });

  const auth: any = usePage().props.auth;
  const loginUser = auth.roles[0];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (loginUser === 'admin') {
      post(route('admin.pause.store', { company: companyId }), {
        onSuccess: () => {
          dispatch(closeDrawer());
        },
      });
    } else {
      post('pause-monitorings', {
        onSuccess: () => {
          dispatch(closeDrawer());
        },
      });
    }
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    put(route('pause-monitorings.update', { id: routeParams.id }), {
      onSuccess: () => {
        setEdit(null);
        dispatch(closeDrawer());
      },
    });
  };

  const cancelDrawer = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translations.columns.startDate}
        </label>
        <TextInput
          type="date"
          name="start_date"
          value={data.start_date}
          placeholder="Start date"
          onChange={(e) => setData('start_date', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
        />
        {errors.start_date && (
          <p className="text-red-500 text-sm">{errors.start_date}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translations.columns.endDate}
        </label>
        <TextInput
          type="date"
          name="end_date"
          value={data.end_date}
          placeholder="End date"
          onChange={(e) => setData('end_date', e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
        />
        {errors.end_date && (
          <p className="text-red-500 text-sm">{errors.end_date}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {translations.columns.taskList}
        </label>
        <select
          id="task_id"
          name="monitoring_task_id"
          value={data.monitoring_task_id}
          onChange={(e) =>
            setData({ ...data, monitoring_task_id: e.target.value })
          }
          className="block w-full border border-gray-300 rounded-md p-2"
        >
          <option key={0} value="">
            {translations.columns.selectTask}
          </option>
          {allTasks.map(
            ({
              monitoring_task_id,
              name,
            }: {
              monitoring_task_id: number;
              name: string;
            }) => (
              <option key={monitoring_task_id} value={monitoring_task_id}>
                {name}
              </option>
            )
          )}
        </select>
        {errors.monitoring_task_id && (
          <p className="text-red-500 text-sm">{errors.monitoring_task_id}</p>
        )}
      </div>
      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations.actions.cancel}
        </CommonButton>
        <CommonButton
          onClick={edit ? handleEditSubmit : handleSubmit}
          style={{
            background:
              'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
          }}
          variant="success"
          type="button"
        >
          {translations.actions.save}
        </CommonButton>
      </div>
    </form>
  );
};

export default CreatePauseTask;
