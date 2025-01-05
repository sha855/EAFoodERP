import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import Sidebar from '@/Components/Traceability/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { FiPlus } from 'react-icons/fi';

interface Unit {
  name: string;
  symbol: string;
  value: number | string;
  isPredefined?: boolean;
}

interface Props {
  auth: any;
  units: Unit[];
}

export default function CustomMeasuringUnits({ auth, units }: Props) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const CustomMeasuringUnitEdit =
    translationData['TraceAbility.CustomMeasuringUnitEdit'] ||
    translationData['TraceAbility.CustomMeasuringUnitEdit'] ||
    {};
  const translations = { ...TraceAbility, ...CustomMeasuringUnitEdit };

  const predefinedUnits: Unit[] = [
    { name: 'kilogram', symbol: 'kg', value: 1000, isPredefined: true },
    { name: 'gram', symbol: 'g', value: 1, isPredefined: true },
  ];

  const {
    data,
    setData,
    post,
    processing,
    errors,
  }: {
    data: any;
    setData: any;
    post: any;
    processing: boolean;
    errors: Record<string, any>;
  } = useForm({
    units: units || [],
  });

  const [showInfo, setShowInfo] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleClose = () => {
    setShowInfo(false);
  };

  const addUnit = (e: React.MouseEvent) => {
    e.preventDefault();
    setData('units', [
      ...data.units,
      { name: '', symbol: '', value: '', isPredefined: false },
    ]);
  };

  const removeUnit = (index: number) => {
    if (!data.units[index].isPredefined) {
      const updatedUnits = data.units.filter((_: any, i: any) => i !== index);
      setData('units', updatedUnits);
    }
  };

  const handleInputChange = (
    index: number,
    field: keyof Unit,
    value: string | number
  ) => {
    const updatedUnits = data.units.map((unit: any, i: any) =>
      i === index ? { ...unit, [field]: value } : unit
    );
    setData('units', updatedUnits);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('custom-units.store'));
  };

  const dataUnits = data.units.slice(2);

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.customMeasuringUnits}
        </h2>
      }
    >
      <Head title={translations.customMeasuringUnits} />
      {notification && (
        <NotificationMessage
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="flex">
        <Sidebar translations={translations as any} />

        <div className="flex-1 bg-white rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h3 className="text-xl font-bold">
                {translations.customMeasuringUnits}
              </h3>
              <div className="space-x-2">
                <CommonButton
                  className="bg-white border-gray-400 hover:bg-gray-200"
                  variant="outlined"
                  onClick={() => (window.location.href = route('custom-units'))}
                >
                  {translations.cancel}
                </CommonButton>
                <CommonButton
                  type="submit"
                  variant="success"
                  className="bg-green-500 text-white hover:bg-green-600"
                  disabled={processing}
                >
                  {translations.save}
                </CommonButton>
              </div>
            </div>

            <div className="p-4">
              {showInfo && (
                <div className="bg-green-200 p-4 rounded-md mb-4 relative flex justify-between items-center">
                  <h2 className="text-sm md:flex items-center">
                    <span>
                      <InfoIcon className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    </span>
                    {
                      translations.thisSettingShowsTheUnitsUsedForAllYourRecipesYouCanChangeYourDefaultMeasurementSystemUnderSetup
                    }
                  </h2>
                  <button
                    onClick={handleClose}
                    className="absolute top-6 md:static md:top-0 right-2 text-gray-600 hover:text-gray-900"
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}

              <table className="w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="border-b">
                    <th className="p-2 text-left">{translations.unitName}</th>
                    <th className="p-2 text-left">{translations.unitSymbol}</th>
                    <th className="p-2 text-left">
                      {translations.valueInGrams}
                    </th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {predefinedUnits.map((unit, index) => (
                    <tr key={`predefined-${index}`} className="border-b">
                      <td className="p-2">{unit.name}</td>
                      <td className="p-2">{unit.symbol}</td>
                      <td className="p-2">{unit.value}</td>
                      <td className="p-2">
                        <h2 className="text-sm"></h2>
                        <button
                          className="text-gray-600 cursor-not-allowed"
                          disabled
                        >
                          <InfoIcon className="w-5 h-5 text-green-400 mr-3 mt-1" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {data.units.map((unit: any, index: any) => {
                    if (index === 0 || index === 1) {
                      return null;
                    }

                    const unitErrors = {
                      name: errors[`units.${index}.name`] || null,
                      symbol: errors[`units.${index}.symbol`] || null,
                      value: errors[`units.${index}.value`] || null,
                    };

                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2">
                          <input
                            type="text"
                            value={unit.name}
                            onChange={(e) =>
                              handleInputChange(index, 'name', e.target.value)
                            }
                            className={`border p-2 rounded ${unitErrors.name ? 'border-red-500' : ''}`}
                          />
                          {unitErrors.name && (
                            <p className="text-red-500 text-sm mt-1">
                              {unitErrors.name}
                            </p>
                          )}
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={unit.symbol}
                            onChange={(e) =>
                              handleInputChange(index, 'symbol', e.target.value)
                            }
                            className={`border p-2 rounded ${unitErrors.symbol ? 'border-red-500' : ''}`}
                          />
                          {unitErrors.symbol && (
                            <p className="text-red-500 text-sm mt-1">
                              {unitErrors.symbol}
                            </p>
                          )}
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={unit.value}
                            onChange={(e) =>
                              handleInputChange(index, 'value', e.target.value)
                            }
                            className={`border p-2 rounded ${unitErrors.value ? 'border-red-500' : ''}`}
                          />
                          {unitErrors.value && (
                            <p className="text-red-500 text-sm mt-1">
                              {unitErrors.value}
                            </p>
                          )}
                        </td>
                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => removeUnit(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <CloseIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <button
                className="mt-4 px-6 py-2.5 rounded-full text-green-600 hover:text-green-800 font-semibold flex items-center justify-center gap-2 hover:bg-slate-100"
                onClick={addUnit}
                type="button"
              >
                <FiPlus />
                {translations.add}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
