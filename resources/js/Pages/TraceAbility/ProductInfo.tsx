import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '@/Components/Traceability/Sidebar';
import { FiPlus } from 'react-icons/fi';
import ProductInfoForm from '@/Components/Traceability/ProductInfoForm';
import ShowInfoForm from '@/Components/Traceability/ShowInfoForm';

interface FormData {
  id: number;
  product_recipe_id: number;
  recipe_total_amount: number;
  one_portion_amount: number;
  preparation_instructionst: string;
  ingredients: Array<{
    ingredient: string;
    amount: number;
    ingredient_units: string;
  }>;
  recipe_total_amount_unit: String;
  one_portion_amount_unit: String;
  company_id: Number;
}

export default function ProductInfo({
  auth,
  productRecipe,
  ingredients,
  customUnit,
  productInfo,
  traceAllergens,
  companyId,
}: any) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const ProductInfo =
    translationData['TraceAbility.ProductInfo'] ||
    translationData['TraceAbility.ProductInfo'] ||
    {};
  const translations = { ...TraceAbility, ...ProductInfo };

  const { data, setData, post, processing, errors } = useForm<FormData>({
    id: productInfo?.id || 0,
    product_recipe_id:
      productRecipe?.id || productInfo?.product_recipes_id || 0,
    recipe_total_amount: productInfo?.recipe_total_amount || 0,
    one_portion_amount: productInfo?.one_portion_amount || 0,
    preparation_instructionst: productInfo?.preparation_instructionst || '',
    ingredients: productInfo?.ingredients || [],
    recipe_total_amount_unit: productInfo?.recipe_total_amount_unit || '',
    one_portion_amount_unit: productInfo?.one_portion_amount_unit || '',
    company_id: companyId,
  });
  const handleAddIngredient = () => {
    setData('ingredients', [
      ...data.ingredients,
      { ingredient: '', amount: 0, ingredient_units: '' },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = data.ingredients.filter((_, i) => i !== index);
    setData('ingredients', updatedIngredients);
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string | number,
    extraField: string,
    extraValue: string
  ) => {
    const updatedIngredients = [...data.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: field === 'amount' ? Number(value) : String(value),
      [extraField]: extraValue,
    };
    setData('ingredients', updatedIngredients);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    post(route('product-info.store' as any));
  };

  const handleBackProductRecipe = () => {
    if (productRecipe?.id || productInfo?.product_recipes_id) {
      router.get(route('product-recipe', { id: productRecipe?.id }));
    } else {
      router.get(route('product-recipe'));
    }
  };

  const handleConsumerInfo = () => {
    router.get(
      route('consumer-info', {
        product_recipe_id: productInfo.product_recipes_id,
      })
    );
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  const [isEditMode, setIsEditMode] = useState(false);

  const handleToggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setIsEditMode(!isEditMode);
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">{'New Product'}</h2>}
    >
      <Head title="Product Info" />
      <div className="flex">
        <Sidebar translations={translations as any} />
        <div className="flex flex-col bg-white rounded-lg shadow-md flex-1 ">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h5 className="text-xl text-start font-bold">
              {translations.newProduct}
            </h5>
            <div className="flex justify-end">
              <CommonButton variant="outlined" className="mx-2 px-4 py-2">
                {translations.delete}
              </CommonButton>

              {productInfo || productRecipe ? (
                !isEditMode && productRecipe?.consumer_info ? (
                  <CommonButton
                    variant="success"
                    onClick={handleToggleMode}
                    className="mx-2 px-4 py-2"
                  >
                    Edit
                  </CommonButton>
                ) : (
                  <CommonButton
                    variant="success"
                    onClick={handleSaveModel}
                    className="mx-2 px-4 py-2"
                  >
                    Save
                  </CommonButton>
                )
              ) : (
                <CommonButton
                  variant="success"
                  onClick={handleSubmit}
                  className="mx-2 px-4 py-2"
                >
                  Next
                </CommonButton>
              )}
            </div>
          </div>
          <div className="p-8">
            <div className="flex justify-start items-center bg-slate-50 p-5 rounded-xl mb-4">
              <CommonButton
                variant="outlined"
                className="mx-2 rounded-full px-4 py-2"
                onClick={handleBackProductRecipe}
              >
                {translations.general}
              </CommonButton>

              <CommonButton
                variant="success"
                className="mx-2 rounded-full px-4 py-2"
              >
                {translations.preparationzInfo}
              </CommonButton>

              <CommonButton
                variant="outlined"
                className="mx-2 rounded-full px-4 py-2"
                onClick={handleConsumerInfo}
              >
                {translations.consumerInfo}
              </CommonButton>
            </div>

            {showInfo && (
              <div className="bg-green-200 p-4 rounded-md mb-4 relative">
                <h2 className="text-sm">
                  <span>
                    <InfoIcon className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  </span>
                  {
                    translations.whenYouUpdateIngredientsMakeSureToUpdateTheConsumerInfoSectionAsWell
                  }
                </h2>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-6">
              <h2 className="text-lg text-start font-bold mb-0">
                <strong>{translations.productRecipe}</strong>
              </h2>
            </div>
            <div className="items-center mt-2">
              <h2 className="text-sm text-start font-bold mb-4">
                {translations.noIngredientsHaveBeenAddedForThisProduct}
              </h2>
            </div>

            {!isEditMode && productRecipe?.consumer_info ? (
              <ShowInfoForm
                translations={translations}
                ingredientEnum={ingredients}
                data={data}
                customUnit={customUnit}
              />
            ) : (
              <ProductInfoForm
                translations={translations}
                ingredientEnum={ingredients}
                data={data}
                setData={setData}
                errors={errors}
                traceAllergens={traceAllergens}
                handleIngredientChange={handleIngredientChange}
                customUnit={customUnit}
                handleRemoveIngredient={handleRemoveIngredient}
                handleAddIngredient={handleAddIngredient}
                companyId={companyId}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
