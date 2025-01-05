import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';
import Sidebar from '@/Components/Traceability/Sidebar';
import Drawer from '@/Components/Drawer';
import PreparedProduct from '@/Components/Form/PreparedProduct';
import { RiListSettingsLine } from 'react-icons/ri';
import Table from '@/Components/Table';
import { formatDate } from '@/src/utils/dateUtils';
import SidebarCommonLayout from '@/Components/SidebarCommonLayout';
import EditPreparedProduct from '@/Components/Form/EditPreparedProduct';
import TableButton from '@/Components/TableButton';

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'TraceAbility.TraceAbility': TranslationStructure;
  };
  locale: string;
}

interface Ingredient {
  id: number;
  ingredient: string;
  amount: string;
  unit: string;
  batch_no: string;
  expiry_date: string;
}

interface PreparationRecord {
  id: number;
  amount: string;
  batch_code: string;
  expiry_date: string;
  expiry_time: string;
  comment: string;
  company_id: number;
  product_id: number;
  product_name: string;
  preparation_ingredients: Ingredient[];
}

export default function Traceability({
  auth,
  product_recipe,
  preparedProduct,
  companyId,
}: PageProps) {
  console.log('the prepared product', preparedProduct);

  const { translation, locale } = usePage<TranslationProps>().props;

  const translations = translation['TraceAbility.TraceAbility'] || {};

  const [isMobileActive, setIsMobileActive] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isEditDrawerOpen, setEditIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handEditleDrawerOpen = () => setEditIsDrawerOpen(true);
  const handleEditDrawerClose = () => setEditIsDrawerOpen(false);

  const { url } = usePage();

  const isActive = (href: string) => url === href;

  const columns = [
    {
      key: 'product_recipe',
      label: translations.table.product,
      renderCell: (params: any) => (
        <span>{params.product_recipe?.product_name}</span>
      ),
    },
    {
      key: 'batch_code',
      label: translations.table.batch,
      sortable: true,
    },
    {
      key: 'amount',
      label: translations.table.amount,
      sortable: true,
    },
    {
      key: 'expiry_date',
      label: translations.table.expiry,
      width: 150,
      sortable: true,
    },
    {
      key: 'created_at',
      label: translations.table.createdBy,
      renderCell: (params: any) => <span>{formatDate(params.created_at)}</span>,
    },
    {
      key: 'actions',
      label: translations.table.actions,
      renderCell: (params: any) => (
        <TableButton onClick={() => handleEditClick(params)} variant="edit">
          Edit
        </TableButton>
      ),
    },
  ];

  const [editDrawerForm, setEditDrawerForm] =
    useState<PreparationRecord | null>(null);

  const handleEditClick = (params: any) => {
    const preparationIngredients = params.preparation_ingredients.map(
      (ingredient: any) => ({
        id: ingredient.id,
        ingredient: ingredient.add_ingredient?.ingredient,
        add_ingredient_id: ingredient.add_ingredient_id,
        amount: ingredient.amount,
        unit: ingredient.unit,
        batch_no: ingredient.batch_no,
        expiry_date: ingredient.expiry_date,
      })
    );

    const formData: PreparationRecord = {
      id: params.id,
      amount: params.amount,
      batch_code: params.batch_code,
      expiry_date: params.expiry_date,
      expiry_time: params.expiry_time,
      comment: params.comment,
      company_id: params.company_id,
      product_id: params.product_id,
      product_name: params.product_recipe?.product_name,
      preparation_ingredients: preparationIngredients,
    };

    setEditDrawerForm(formData);
    setEditIsDrawerOpen(true);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.sidebarMenu.products.menu}
        </h2>
      }
    >
      <Head title="TraceAbility" />

      <div className="flex">
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
                {translations.preparedProducts}
              </h3>
              <div className="flex gap-4">
                {/* <CommonButton variant="outlined" onClick={handleDrawerOpen}>
                  {translations.sidebarMenu.traceability.download}
                </CommonButton> */}
                <CommonButton variant="success" onClick={handleDrawerOpen}>
                  {translations.sidebarMenu.traceability.addNew}
                </CommonButton>
              </div>
            </div>

            <div className="p-4">
              <div className="bg-gray-50 p-4 mb-8 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {translations.selectPeriod}
                    </label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                      <option value="This week">This week</option>
                      <option value="Last week">Last week</option>
                      <option value="This month">This month</option>
                      <option value="Last month">Last month</option>
                    </select>
                  </div>
                  {/* <CommonButton
                    style={{
                      background:
                        'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                    }}
                    variant="success"
                    onClick={handleDrawerOpen}
                  >
                    {translations.sidebarMenu.traceability.advancedSearch}
                  </CommonButton> */}
                </div>
              </div>

              <Table
                columns={columns}
                datas={preparedProduct}
                route={route('audit')}
              />
            </div>
          </div>
        </div>
      </div>

      <Drawer
        isDrawerOpen={isEditDrawerOpen}
        onClose={handleEditDrawerClose}
        title="Edit Product in preparation"
        formContent={
          <EditPreparedProduct
            data={editDrawerForm as any}
            product={product_recipe}
            companyId={companyId}
            setEditIsDrawerOpen={setEditIsDrawerOpen}
          />
        }
      />

      <Drawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        title="Product in preparation"
        formContent={
          <PreparedProduct
            data={product_recipe}
            companyId={companyId}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        }
      />
    </AuthenticatedLayout>
  );
}
