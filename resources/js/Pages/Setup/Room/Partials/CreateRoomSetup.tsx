import CommonSelectSearch from '@/Components/CommonSelectSearch';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import { closeDrawer } from '@/store/slice/stateSlice';
import { useAppDispatch } from '@/_hooks/useStore';
import { IoMdClose, IoMdInformationCircleOutline } from 'react-icons/io';
import CommonToolTip from '@/Components/CommonTooltip';

interface CreateRoomSetupProps {
  types: string[];
  edit: any;
  setEdit: Dispatch<SetStateAction<any>>;
  routePrefix?: string;
}

interface OptionType {
  label: string;
  value: string;
}

export default function CreateRoomSetup({
  types,
  edit,
  setEdit,
  routePrefix,
}: CreateRoomSetupProps) {
  const dispatch = useAppDispatch();
  const [selectBox, setSelectBox] = useState<OptionType | null>();
  const [openAlert, setAlertOpen] = React.useState(true);

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);
  const translations = translationData['Setup.Rooms'] || {};

  const filterType = (name: string) => {
    const item = types.find((item) => item === name);
    return { label: item, value: item };
  };

  const routeParams = route().routeParams;
  const companyId = routeParams?.company;

  const adminRouteParams = {
    room: edit?.id,
    ...(companyId ? { company: companyId } : {}),
  };

  const { data, setData, transform, post, put, processing, errors } = useForm({
    name: edit?.name ?? '',
    type: edit?.type ?? '',
    area: edit?.area ?? null,
    sensor_id: edit?.sensor_id ?? '',
    below: edit?.below ?? '',
    above: edit?.above ?? '',
    allowed: edit?.allowed ?? '',
    company_id: edit?.company_id ?? companyId,
  });

  const selectOptions = useMemo(() => {
    return types.map((item) => ({ label: item, value: item }));
  }, [types]);

  const cancelDrawer = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route(routePrefix + 'rooms.store', adminRouteParams), {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
    });
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();

    transform((data: any) => ({
      ...data,
      id: edit?.id,
    }));

    put(route(routePrefix + 'rooms.update', adminRouteParams), {
      onSuccess: () => {
        setEdit(null);
        dispatch(closeDrawer());
      },
    });
  };

  const redirectMonitoring = () => {
    router.get(route('setup.monitor.task', 'show'));
  };

  return (
    <form>
      <div className="mb-1">
        <InputLabel
          htmlFor="name"
          value={translations?.createModal?.form?.name}
          className="text-base mb-2"
        />
        <TextInput
          type="text"
          name="name"
          placeholder="Name"
          className="border rounded px-4 py-2 w-full mb-3"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-3">
        <InputLabel
          htmlFor="type"
          value={translations?.createModal?.form?.type}
          className="text-base mb-2"
        />
        <CommonSelectSearch
          options={selectOptions}
          onChange={(value) => {
            setData('type', (value as any)?.value);
          }}
          defaultValue={filterType(edit?.type) as OptionType}
        />
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      <div className="mb-1">
        <InputLabel
          htmlFor="area"
          value={translations?.createModal?.form?.area}
          className="text-base mb-2"
        />
        <TextInput
          type="number"
          name="area"
          className="border rounded px-4 py-2 w-full mb-3"
          value={data.area}
          onChange={(e) => setData('area', +e.target.value)}
        />
        {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
      </div>

      <div className="mb-1">
        <InputLabel
          htmlFor="sensor_id"
          className="text-base mb-2 flex items-center"
        >
          {translations?.createModal?.form?.sensor_id}
          <CommonToolTip
            className="ml-1"
            classTooltip={'w-5 h-5'}
            title="Add only in case you would like to set up integration"
          />
        </InputLabel>
        <TextInput
          type="text"
          name="sensor_id"
          className="border rounded px-4 py-2 w-full mb-3"
          value={data.sensor_id}
          onChange={(e) => setData('sensor_id', e.target.value)}
        />
        {errors.sensor_id && (
          <p className="text-red-500 text-sm">{errors.sensor_id}</p>
        )}
      </div>

      {data.sensor_id && (
        <div className="shadow-xl bg-white p-5 rounded-lg mb-4">
          <h3 className="font-bold text-base">
            Sensor Measurement Error Tolerance
          </h3>

          <div className="grid grid-cols-10 gap-3">
            <div className="mt-5 col-span-2">
              <InputLabel
                htmlFor="below"
                value="Below"
                className="text-base mb-2"
              />
              <TextInput
                type="number"
                name="below"
                className="border rounded px-4 py-2 w-full mb-3 	"
                value={data.below}
                onChange={(e) => setData('below', e.target.value)}
              />
            </div>
            <div className="mt-5 col-span-2">
              <InputLabel
                htmlFor="above"
                value="Above"
                className="text-base mb-2"
              />
              <TextInput
                type="number"
                name="above"
                className="border rounded px-4 py-2 w-full mb-3"
                value={data.above}
                onChange={(e) => setData('above', e.target.value)}
              />
            </div>

            <div className="mt-5 col-span-6">
              <label className="block text-gray-700 text-sm font-medium mb-2 pt-[26px]">
                Degrees Outside The Range Defined In Monitoring Task.
              </label>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-3">
            <div className="mt-5 col-span-4">
              <span className="block text-gray-700 text-sm font-medium mb-2">
                Error Tolerance is Allowed Up To
              </span>
            </div>
            <div className="mt-5 col-span-2">
              <TextInput
                type="number"
                name="allowed"
                className="border rounded px-4 py-2 w-full mb-3"
                value={data.allowed}
                onChange={(e) => setData('allowed', e.target.value)}
              />
              {errors.allowed && (
                <p className="text-red-500 text-sm">{errors.allowed}</p>
              )}
            </div>
            <div className="mt-5 col-span-4">
              <span className="block text-gray-700 text-sm font-medium mb-2">
                Consecutive Measurements
              </span>
            </div>
          </div>
        </div>
      )}

      {openAlert && (
        <div className="flex  items-center bg-green-100 p-2.5 rounded-lg">
          <div className="w-1/12 text-center">
            <IoMdInformationCircleOutline className="h-6 w-6" />
          </div>
          <div className="w-10/12 pr-3">
            <p className="mb-0 text-sm	">
              {translations?.createModal?.alert?.message}
            </p>
          </div>
          <div className="w-1/12 text-center flex justify-center">
            <IoMdClose
              onClick={() => setAlertOpen(false)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
        </div>
      )}

      <CommonButton
        onClick={redirectMonitoring}
        className="w-58 mt-5 focus:ring-0 font-bold bg-transparent !text-orange-400 hover:no-underline hover:bg-gray-200 hover:rounded-full rounded-md text-sm p-2 uppercase"
      >
        Add monitoring task
      </CommonButton>

      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations?.button?.cancel}
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
          {translations?.button?.save}
        </CommonButton>
      </div>
    </form>
  );
}
