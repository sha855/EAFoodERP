import React, { useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import Sidebar from '@/Components/Traceability/Sidebar';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import { elements } from 'chart.js';
import ProductRecipeForm from '@/Components/Traceability/ProductRecipeForm';
import ShowProductRecipe from '@/Components/Traceability/ShowProductRecipe';

interface FormData {
  id: number;
  expiration_time: string;
  product_name: string;
  upc_code: string;
  product_code: string;
  expiration: string;
  is_used_as_ingredient: boolean;
  product_type: string;
  expiration_type: string;
  files: File[];
  company_id: number;
}
export default function ProductRecipe({
  auth,
  productExpirationDateEnum,
  productRecipe,
  companyId,
}: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [notification, setNotification] = React.useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const ProductRecipe =
    translationData['TraceAbility.ProductRecipe'] ||
    translationData['TraceAbility.ProductRecipe'] ||
    {};
  const translations = { ...TraceAbility, ...ProductRecipe };

  const { data, setData, post, processing, errors } = useForm<FormData>({
    id: productRecipe?.id || 0,
    product_name: productRecipe?.product_name || '',
    upc_code: productRecipe?.upc_code || '',
    product_code: productRecipe?.product_code || '',
    expiration: productRecipe?.expiration || '',
    expiration_time: productRecipe?.expiration_time || '',
    is_used_as_ingredient: productRecipe?.is_used_as_ingredient || 0,
    product_type: productRecipe?.product_type || '',
    expiration_type: productRecipe?.expiration_type || '',
    files: productRecipe?.images || [],
    company_id: companyId,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file, index) => ({
        tempId: `temp-${Date.now()}-${index}`,
        file,
        image_path: URL.createObjectURL(file),
      }));
      const updatedFiles = [...(data.files || []), ...fileArray];
      setData('files', updatedFiles as any);
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await post(route('product.store'), {
        onSuccess: () => {
          setNotification({
            message: 'Product recipe stored successfully!',
            type: 'success',
          });
        },
        onError: () => {
          setNotification({ message: 'Something went wrong!', type: 'error' });
        },
      });
    } catch (error) {
      setNotification({ message: 'Something went wrong', type: 'error' });
    }
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const idParam = searchParams.get('id');

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
      header={<h2 className="text-xl font-semibold">New Product</h2>}
    >
      <div className="p-3">
        {notification && (
          <NotificationMessage
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
      <Head title="Product Recipe" />
      <div className="flex">
        <Sidebar translations={translations as any} />

        <div className="flex-1 bg-white rounded-lg mr-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
              <h5 className="text-xl text-start font-bold">
                {data.product_name || 'New Product'}
                <span className="text-black-900 bg-gray-400 px-2 py-1 rounded-full text-xs ml-1">
                  {translations.recipe}
                </span>
              </h5>

              {productRecipe ? (
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
                  onClick={handleAdd}
                  disabled={processing}
                >
                  {translations.next}
                </CommonButton>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-start items-center bg-slate-50 p-5 rounded-xl mb-4">
                <CommonButton
                  variant="success"
                  className="mx-1 text-sm rounded-full px-4 py-2"
                >
                  {translations.general}
                </CommonButton>

                {data.product_type !== 'purchased' &&
                  (idParam ? (
                    <CommonButton
                      variant="outlined"
                      href={route('product-info', {
                        product_recipe_id: idParam,
                      })}
                      className="mx-1 text-sm rounded-full px-4 py-2"
                    >
                      {translations.preparationInfo}
                    </CommonButton>
                  ) : (
                    <CommonButton
                      variant="outlined"
                      className="mx-1 text-sm rounded-full px-4 py-2"
                    >
                      {translations.preparationInfo}
                    </CommonButton>
                  ))}

                {idParam ? (
                  <CommonButton
                    variant="outlined"
                    href={route('consumer-info', {
                      product_recipe_id: idParam,
                    })}
                    className="mx-1 text-sm rounded-full px-4 py-2"
                  >
                    {translations.consumerInfo}
                  </CommonButton>
                ) : (
                  <CommonButton
                    variant="outlined"
                    className="mx-1 text-sm rounded-full px-4 py-2"
                  >
                    {translations.consumerInfo}
                  </CommonButton>
                )}
              </div>
              {showInfo && (
                <div className="bg-green-200 p-4 rounded-md mb-4 relative">
                  <h2 className="text-sm">
                    <span>
                      <InfoIcon className="w-5 h-5 text-green-600 mr-3 mt-1" />
                    </span>
                    {
                      translations.addGeneralInfoAboutTheProductCreateTheRecipeAndGenerateConsumerInfo
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

              {!isEditMode && productRecipe?.consumer_info ? (
                <ShowProductRecipe data={data} translations={translations} />
              ) : (
                <ProductRecipeForm
                  translations={translations}
                  handleSubmit={handleSubmit}
                  data={data}
                  setData={setData}
                  errors={errors}
                  productExpirationDateEnum={productExpirationDateEnum}
                  fileInputRef={fileInputRef}
                  handleFileChange={handleFileChange}
                  imagePreviews={imagePreviews}
                  setImagePreviews={setImagePreviews}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
