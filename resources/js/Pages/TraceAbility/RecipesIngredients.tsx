import { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';
import Table from '@/Components/Table';
import Sidebar from '@/Components/Traceability/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { RiListSettingsLine } from 'react-icons/ri';
import TextInput from '@/Components/TextInput';
import TableButton from '@/Components/TableButton';
import { EyeIcon } from 'lucide-react';
import { DateTime } from 'luxon';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';

interface ProductRecipe {
  id: number;
  product_name: string;
  product_code: string;
  expiration_date: string;
}

export default function Ingredients({ auth, recipes, id }: PageProps) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const RecipesIngredients =
    translationData['TraceAbility.RecipesIngredients'] ||
    translationData['TraceAbility.RecipesIngredients'] ||
    {};
  const translations = { ...TraceAbility, ...RecipesIngredients };

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);

  const columns = [
    { label: 'Product Name', key: 'product_name' },
    { label: 'Product Code', key: 'product_code' },
    {
      label: 'Date Modified',
      key: 'updated_at',
      renderCell: (row: any) => (
        <span>
          {DateTime.fromISO(row.updated_at).toFormat('dd-MM-yyyy, hh:mm a')}
        </span>
      ),
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (row: any) => (
        <TableButton
          variant="view"
          onClick={() => router.get(route('product-recipe', { id: row.id }))}
        >
          <EyeIcon />
        </TableButton>
      ),
    },
  ];

  const handleFormData = () => {
    router.get(route('product-recipe'));
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.recipesAndIngredients}
        </h2>
      }
    >
      <Head title="Ingredients" />
      <div className="flex h-screen">
        <SidebarCommonLayout
          onMobileActive={isMobileActive}
          onClose={setIsMobileActive}
        >
          <Sidebar translations={translations as any} />
        </SidebarCommonLayout>

        <div className="flex-1 p-0">
          <button
            type="button"
            onClick={() => setIsMobileActive(!isMobileActive)}
            className="flex items-center justify-center gap-1 text-white bg-gradient-org-red mb-4 px-2 py-2 rounded-md lg:hidden text-sm"
          >
            <RiListSettingsLine className="w-4 h-4" />
            Menu
          </button>
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h3 className="text-xl font-bold">
                {translations.recipesAndIngredients}
              </h3>
              <div className="flex justify-end">
                <CommonButton variant="success" onClick={handleFormData}>
                  {translations.addNew}
                </CommonButton>
              </div>
            </div>
            <div className="p-8">
              {showInfo && (
                <div className="bg-green-200 p-4 rounded-md mb-4 relative md:flex justify-between items-center">
                  <h2 className="text-sm flex gap-2 justify-between items-center">
                    <span>
                      <InfoIcon className="w-5 h-5 text-green-600" />
                    </span>
                    {
                      translations.manageAllYourRecipesAndIngredientsFromHereCreateNewProductsAddIngredientsGenerateConsumerInfoAndStoreAllYourRecipesInOnePlace
                    }
                  </h2>
                  <button
                    onClick={handleClose}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <CloseIcon />
                  </button>
                </div>
              )}

              <div className="flex items-center mb-4">
                <TextInput
                  type="text"
                  placeholder="Find product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 rounded-md mr-2"
                  aria-label="Search for a product"
                />
                <select
                  className="border p-2 rounded-md mr-2"
                  aria-label="Filter by product type"
                >
                  <option value="All">{translations.all}</option>
                  <option value="1">{translations.purchased}</option>
                  <option value="2">{translations.ourRecipe}</option>
                  <option value="3">{translations.ingredient}</option>
                </select>
              </div>

              {recipes.data.length > 0 ? (
                <Table
                  columns={columns}
                  datas={recipes}
                  route={route('recipes-ingredients')}
                />
              ) : (
                <div className="text-center text-gray-500">
                  {translations.noProductAvailable}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
