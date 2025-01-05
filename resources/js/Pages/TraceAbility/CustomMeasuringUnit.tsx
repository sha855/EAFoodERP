import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import Sidebar from '@/Components/Traceability/Sidebar';
import Table from '@/Components/Table';
import CloseIcon from '@mui/icons-material/Close';
import { InfoIcon } from 'lucide-react';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import { RiListSettingsLine } from 'react-icons/ri';

interface Unit {
  id: number;
  name: string;
  symbol: string;
  value: number;
}

interface PageProps {
  auth: any;
  units: Unit[];
}

export default function Traceability({ auth, units }: PageProps) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const CustomMeasuringUnit =
    translationData['TraceAbility.CustomMeasuringUnit'] ||
    translationData['TraceAbility.CustomMeasuringUnit'] ||
    {};
  const translations = { ...TraceAbility, ...CustomMeasuringUnit };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const handleRowClick = (userId: number) => {
    router.get(route('custom-units', { user: userId }));
  };
  const columns = [
    { label: 'Name', key: 'name' },
    { label: 'Unit Symbol', key: 'symbol' },
    { label: 'Value in grams', key: 'value' },
  ];

  const data = units.map((unit) => ({
    id: unit.id,
    name: unit.name,
    symbol: unit.symbol,
    value: unit.value,
  }));

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">{translations.traceability}</h2>
      }
    >
      <Head title={translations.traceability} />

      <div className="flex">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <Sidebar translations={translations as any} />
        </SidebarCommonLayout>

        <div className="flex-1">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red 
          mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>
          <div className=" bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
              <h3 className="text-xl font-bold text-gray-1000">
                {translations.customMeasuringUnits}
              </h3>
              <CommonButton
                className="bg-white !border-orange-400 hover:text-white items-end justify-end hover:!bg-gradient-org-red"
                variant="success"
                href={route('custom-units-edit')}
              >
                {translations.edit}
              </CommonButton>
            </div>
            <div className="p-4">
              {showInfo && (
                <div className="bg-green-200 p-4 rounded-md mb-4 relative flex justify-between items-center">
                  <h2 className="text-sm md:flex items-center">
                    <span>
                      {' '}
                      <InfoIcon className="w-5 h-5 text-green-600 mr-2" />
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

              {data.length > 0 ? (
                <Table
                  columns={columns}
                  datas={data as any}
                  route={route('custom-units')}
                />
              ) : (
                <div className="text-center text-gray-500">
                  {translations.noProductUnit}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
