import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '@/Components/Traceability/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ConsumerInfoForm from '@/Components/Traceability/ConsumerInfoForm';
import ShowConsumerInfo from '@/Components/Traceability/ShowConsumerInfo';

interface FormData {
  id: number;
  product_recipe_id: number;
  ingredients: string;
  consuming_guide: string;
  storing_conditions: string;
  allergen: string[];
  company_id: number;
}

interface EditorComponentProps {
  value: string;
  onChange: (value: string) => void;
}

interface Props {
  auth: any;
  traceAllergens: any;
}

const EditorComponent: React.FC<EditorComponentProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <ReactQuill value={value} onChange={onChange} />
    </div>
  );
};

export default function ConsumerInfo({
  auth,
  product_recipe_id,
  traceAllergens,
  productRecipe,
  companyId,
}: any) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const ConsumerInfo =
    translationData['TraceAbility.ConsumerInfo'] ||
    translationData['TraceAbility.ConsumerInfo'] ||
    {};
  const translations = { ...TraceAbility, ...ConsumerInfo };

  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { data, setData, post, processing, errors } = useForm<FormData>({
    id: productRecipe.consumer_info?.id || 0,
    product_recipe_id: productRecipe.id,
    ingredients: productRecipe.consumer_info?.ingredients || '',
    consuming_guide: productRecipe.consumer_info?.consuming_guide || '',
    storing_conditions: productRecipe.consumer_info?.storing_conditions || '',
    allergen:
      productRecipe.consumer_info?.allergen_infos.map(
        (info: any) => info.key
      ) || [],
    company_id: companyId,
  });

  const handleCheckboxChange = (allergenKey: string) => {
    if (data.allergen.includes(allergenKey)) {
      setData(
        'allergen',
        data.allergen.filter((key) => key !== allergenKey)
      );
    } else {
      setData('allergen', [...data.allergen, allergenKey]);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    post(route('consumer-info.store', { product_recipe_id }));
  };

  const handleBackProductRecipe = () => {
    router.get(route('product-recipe'), { id: product_recipe_id });
  };

  const handleBackProductInfo = () => {
    router.get(route('product-info', { product_recipe_id }));
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
      header={
        <h2 className="text-xl font-semibold">{translations.newProduct}</h2>
      }
    >
      <div className="mb-2">
        {notification && (
          <NotificationMessage
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
      <Head title="Consumer Info" />

      <div className="flex">
        <Sidebar translations={translations as any} />

        <div className="flex-1 p-0 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
            <h5 className="text-xl font-bold">{translations.newProduct}</h5>
            <div>
              <CommonButton
                variant="outlined"
                className="mx-2 rounded-full px-4 py-2 "
              >
                {translations.delete}
              </CommonButton>

              {!isEditMode && productRecipe?.consumer_info ? (
                <CommonButton
                  variant="success"
                  onClick={handleToggleMode}
                  className="mx-2 rounded-full px-4 py-2"
                >
                  Edit
                </CommonButton>
              ) : (
                <CommonButton
                  variant="success"
                  onClick={handleSaveModel}
                  className="mx-2 rounded-full px-4 py-2"
                >
                  {translations.save}
                </CommonButton>
              )}
            </div>
          </div>

          <div className="flex justify-start items-center bg-slate-50 p-5 rounded-xl mb-4">
            <CommonButton
              variant="outlined"
              className=" rounded-full px-4 py-2 mx-1 text-sm"
              onClick={handleBackProductRecipe}
            >
              {translations.general}
            </CommonButton>
            {productRecipe.product_type !== 'purchased' && (
              <CommonButton
                variant="outlined"
                className=" rounded-full px-4 py-2 mx-1 text-sm"
                onClick={handleBackProductInfo}
              >
                {translations.preparationInfo}
              </CommonButton>
            )}
            <CommonButton
              variant="success"
              className=" rounded-full px-4 py-2 mx-1 text-sm"
            >
              {translations.consumerInfo}
            </CommonButton>
          </div>

          <div className="p-4">
            {showInfo && (
              <div className="bg-green-200 p-4 rounded-md mb-4 relative">
                <h2 className="text-sm">
                  <span>
                    <InfoIcon className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  </span>
                  {
                    translations.thisInformationCanBeUsedOnTheProductLabelIngredientsAndAllergensAreAutogeneratedAccordingToYourRecipeButYouAreAbleToChangeItAccordingToNeed
                  }
                </h2>
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-0 text-gray-600 hover:text-gray-900"
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {!isEditMode && productRecipe?.consumer_info ? (
              <ShowConsumerInfo
                ingredients={data.ingredients}
                allergens={data.allergen}
                consumingGuide={data.consuming_guide}
                storingConditions={data.storing_conditions}
              />
            ) : (
              <ConsumerInfoForm
                translations={translations}
                handleCheckboxChange={handleCheckboxChange}
                data={data}
                setData={setData}
                allergens={traceAllergens}
                EditorComponent={EditorComponent}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
