import React from 'react';
import CommonButton from '../CommonButton';
import TextInput from '../TextInput';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import { useForm, usePage } from '@inertiajs/react';
const DocumentShare = ({
  companyId,
  translations,
}: {
  companyId: Number;
  translations: any;
}) => {
  const auth: any = usePage().props.auth;
  const loginUser = auth.roles[0];

  const { data, setData, post, processing, errors } = useForm<any>({
    name: '',
    email: '',
    access_valid_until: '',
    haccp_plan: true,
    companyId: companyId,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const routeName =
      loginUser === 'admin'
        ? 'admin.documents.share.accesses'
        : 'documents.share.accesses';

    post(route(routeName), {
      onSuccess: () => dispatch(closeDrawer()),
    });
  };

  const cancelDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <TextInput
              type="text"
              placeholder={translations?.table?.name}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <TextInput
              type="email"
              placeholder={translations.table.email}
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <TextInput
            type="date"
            placeholder={translations.drawer.accessValidUntil}
            value={data.access_valid_until}
            onChange={(e) => setData('access_valid_until', e.target.value)}
            className="p-2 col-span-2"
          />
          {errors.access_valid_until && (
            <p className="text-red-500 text-sm">{errors.access_valid_until}</p>
          )}
        </div>
        <h5 className="text-lg font-bold mt-4 mb-2">
          {translations.drawer.sharedDocument}
        </h5>
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={data.haccp_plan}
            onChange={(e) => setData('haccp_plan', e.target.checked)}
            className="h-4 w-4"
          />
          <span>{translations.drawer.plan}</span>
        </label>
      </div>
      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations.drawer.cancel}
        </CommonButton>
        <CommonButton
          style={{
            background:
              'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
          }}
          variant="success"
          type="submit"
          disabled={processing}
        >
          {translations.drawer.save}
        </CommonButton>
      </div>
    </form>
  );
};

export default DocumentShare;
