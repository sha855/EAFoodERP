import { Head, router, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonButton from '@/Components/CommonButton';
import { PageProps } from '@/types';
import Sidebar from '@/Components/Traceability/Sidebar';

interface ProductRecipeImage {
  id: number;
  product_recipes_id: number;
  image_path: string;
}

interface ProductRecipe {
  id: number;
  product_name: string;
  product_code: string;
  expiration_date: string;
  images: ProductRecipeImage[];
}

interface Props extends PageProps {
  recipe: ProductRecipe;
}

export default function ProductRecipeDetails({ auth, recipe }: Props) {
  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const TraceAbility =
    translationData['TraceAbility.TraceAbility'] ||
    translationData['TraceAbility.TraceAbility'] ||
    {};
  const ProductRecipeDetails =
    translationData['TraceAbility.ProductRecipeDetails'] ||
    translationData['TraceAbility.ProductRecipeDetails'] ||
    {};
  const translations = { ...TraceAbility, ...ProductRecipeDetails };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    }
  };

  const handleBackButton = () => {
    router.get(route('recipes-ingredients'));
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">{translations.recipeDetails}</h2>
      }
    >
      <Head title="Recipe Details" />
      <div className="flex h-screen">
        <Sidebar translations={translations as any} />

        <div className="flex-1 p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-start">
            <CommonButton variant="outlined" onClick={handleBackButton}>
              {translations.back}
            </CommonButton>
          </div>

          <div className="flex justify-between items-center mt-4">
            <h5 className="text-2xl font-bold mb-2">
              {recipe.product_name || 'New Product'}
            </h5>
            <CommonButton variant="success">{translations.edit}</CommonButton>
          </div>

          <div className="flex justify-start items-center mt-4">
            <CommonButton
              variant="success"
              className="mx-2 rounded-full px-4 py-2"
            >
              {translations.general}
            </CommonButton>
            <CommonButton
              variant="outlined"
              className="mx-2 rounded-full px-4 py-2"
            >
              {translations.preparationInfo}
            </CommonButton>
            <CommonButton
              variant="outlined"
              className="mx-2 rounded-full px-4 py-2"
            >
              {translations.consumerInfo}
            </CommonButton>
          </div>

          <div className="p-8 mt-4 bg-white rounded-lg flex flex-col">
            <div className="flex flex-col sm:flex-row sm:space-x-8">
              <div className="flex-1">
                <p>
                  <strong>{translations.productName}</strong>{' '}
                  {recipe.product_name}
                </p>
              </div>
              <div className="flex-1">
                <p>
                  <strong>{translations.productCode}</strong>{' '}
                  {recipe.product_code}
                </p>
              </div>
              <div className="flex-1">
                <p>
                  <strong>{translations.expirationDate}</strong>{' '}
                  {recipe.expiration_date}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <p>
              <strong>{translations.productImages}</strong>
            </p>
            <div className="flex flex-wrap mt-2">
              {recipe.images.map((image) => (
                <img
                  key={image.product_recipes_id}
                  src={image.image_path}
                  className="w-32 h-32 object-cover rounded border m-2"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
