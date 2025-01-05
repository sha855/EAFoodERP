import { router } from '@inertiajs/react';

export default function ProductRecipeForm({
  translations,
  handleSubmit,
  data,
  setData,
  errors,
  productExpirationDateEnum,
  fileInputRef,
  handleFileChange,
}: any) {
  const handleDelete = async (fileId?: number, index?: number) => {
    if (fileId) {
      router.delete(route('recipesImages.delete', { recipe_image: fileId }), {
        onSuccess: () => {
          setData((prevData: any) => ({
            ...prevData,
            files: prevData.files.filter((file: any) => file.id !== fileId),
          }));
        },
        onError: () => {
          alert('Failed to delete the image. Please try again.');
        },
      });
    } else if (index !== undefined) {
      setData((prevData: any) => ({
        ...prevData,
        files: prevData.files.filter((_: any, i: number) => i !== index),
      }));
    }
  };

  const BaseUrl = () => {
    const { protocol, host } = window.location;
    return `${protocol}//${host}/`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <div className="flex items-center">
            <div className="w-full">
              <label
                className="font-base mb-2 inline-block"
                htmlFor="product-name"
              >
                {translations.productName}
              </label>
              <input
                type="text"
                id="product-name"
                name="product_name"
                value={data.product_name}
                onChange={(e) => setData('product_name', e.target.value)}
                className="block border border-gray-300 rounded-lg p-2  focus:ring-orange-400 w-full "
                required
              />
              {errors.product_name && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.product_name}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="used-as-ingredient"
              name="is_used_as_ingredient"
              checked={data.is_used_as_ingredient}
              onChange={(e) =>
                setData('is_used_as_ingredient', e.target.checked)
              }
              className="h-4 w-4 text-orange-400 border-gray-300 rounded !ring-offset-0  focus:ring-transparent"
            />
            <label
              className="text-gray-700 text-base"
              htmlFor="used-as-ingredient"
            >
              {translations.usedAsIngredientName}
            </label>
          </div>
        </div>

        <div className="flex items-left flex-col !mt-0 py-4">
          <div className="flex items-center gap-4 mt-2">
            <label className="font-base">{translations.thisIs}</label>
            <div className="flex items-center mr-2">
              <input
                type="radio"
                value="purchased"
                name="product_type"
                checked={data.product_type === 'purchased'}
                onChange={() => setData('product_type', 'purchased')}
                className="mr-2 text-orange-400 !ring-0 !shadow-none"
              />
              <label className="font-base">{translations.purchased}</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="our_recipe"
                name="product_type"
                checked={data.product_type === 'our_recipe'}
                onChange={() => setData('product_type', 'our_recipe')}
                className="mr-2 text-orange-400 !ring-0 !shadow-none"
              />
              <label className="font-base">{translations.ourRecipe}</label>
            </div>
          </div>
          {errors.product_type && (
            <span className="text-red-600 text-sm mt-1 block">
              {errors.product_type}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-base mb-2">{translations.upcCode}</label>
            <input
              type="text"
              name="upc_code"
              value={data.upc_code}
              onChange={(e) => setData('upc_code', e.target.value)}
              className="block border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.upc_code && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.upc_code}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-base mb-2">{translations.productCode}</label>
            <input
              type="text"
              name="product_code"
              value={data.product_code}
              onChange={(e) => setData('product_code', e.target.value)}
              className="block border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.product_code && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.product_code}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-base mb-2">
            {translations.expirationDate}
          </label>
          <input
            type="number"
            name="expiration"
            value={data.expiration}
            onChange={(e) => setData('expiration', e.target.value)}
            className="block border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.expiration && (
            <span className="text-red-600 text-sm mt-1 block">
              {errors.expiration}
            </span>
          )}
        </div>

        <div className="flex-grow">
          <select
            name="expiration_time"
            className="!border-gray-300 text-slate-400 p-2 focus:!ring-transparent focus:ring-orange-400 rounded-md w-full"
            onChange={(e) => setData('expiration_time', e.target.value)}
            value={data.expiration_time}
          >
            <option value="">{translations.choose}</option>
            {productExpirationDateEnum.map((expirationData: any) => (
              <option key={expirationData.value} value={expirationData.value}>
                {expirationData.label}
              </option>
            ))}
          </select>

          {errors.expiration_time && (
            <span className="text-red-600 text-sm mt-1 block">
              {errors.expiration_time}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="best-before"
              name="expiration_type"
              value="best_before"
              checked={data.expiration_type === 'best_before'}
              onChange={(e) => setData('expiration_type', e.target.value)}
              className="h-4 w-4 mr-2 text-orange-400 border-gray-300 rounded !ring-offset-0 focus:ring-transparent"
            />
            <label htmlFor="best-before" className="font-base">
              {translations.bestBefore}
            </label>
          </div>

          <div className="flex items-center mr-4">
            <input
              type="radio"
              id="use-by"
              name="expiration_type"
              value="used_by"
              checked={data.expiration_type === 'used_by'}
              onChange={(e) => setData('expiration_type', e.target.value)}
              className="h-4 w-4 mr-2 text-orange-400 border-gray-300 rounded !ring-offset-0 focus:ring-transparent"
            />
            <label htmlFor="use-by" className="font-base">
              {translations.useBy}
            </label>
          </div>

          {errors.expiration_type && (
            <span className="text-red-600 text-sm mt-1 block">
              {errors.expiration_type}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-base mb-2">{translations.uploadFiles}</label>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 bg-white rounded-lg cursor-pointer focus:outline-none p-2"
          />
          <div className="flex flex-wrap gap-4 mt-2">
            {data.files.map((file: any, index: number) => (
              <div
                key={file.id || file.tempId || `file-${index}`}
                className="relative w-32 h-32"
              >
                <img
                  src={
                    file.file
                      ? file.image_path
                      : `${BaseUrl()}storage/${file.image_path}`
                  }
                  alt={`File ${index}`}
                  className="w-full h-full object-cover rounded-md shadow-md"
                />
                <button
                  type="button"
                  onClick={() =>
                    file.id
                      ? handleDelete(file.id)
                      : handleDelete(undefined, index)
                  }
                  className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-md hover:bg-red-700 focus:outline-none"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
