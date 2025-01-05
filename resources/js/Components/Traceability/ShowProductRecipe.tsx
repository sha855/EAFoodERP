import { router } from '@inertiajs/react';

export default function ShowProductRecipe({ translations, data }: any) {
  const BaseUrl = () => {
    const { protocol, host } = window.location;
    return `${protocol}//${host}/`;
  };

  const formatExpirationType = (type: string): string => {
    switch (type) {
      case 'best_before':
        return 'Best Before';
      case 'used_by':
        return 'Use By';
      case 'sell_by':
        return 'Sell By';
      default:
        return '-';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center mt-4">
          <span className="font-semibold w-48">
            {translations.productName}:
          </span>
          <span className="text-gray-800">{data.product_name || '-'}</span>
        </div>

        <div className="flex items-center mt-4">
          <span className="font-semibold w-48">{translations.upcCode}:</span>
          <span className="text-gray-800">{data.upc_code || '-'}</span>
        </div>

        <div className="flex items-center mt-4">
          <span className="font-semibold w-48">
            {translations.productCode}:
          </span>
          <span className="text-gray-800">{data.product_code || '-'}</span>
        </div>

        <div className="flex items-center mt-4">
          <span className="font-semibold w-48">
            {formatExpirationType(data.expiration_type)}:
          </span>
          <span className="text-gray-800">
            {data.expiration || '-'} {data.expiration_time}
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-4">
          {translations.uploadFiles}
        </h3>
        <div className="flex flex-wrap gap-4">
          {data.files.length > 0 ? (
            data.files.map((file: any, index: number) => (
              <div
                key={file.id || file.tempId || `file-${index}`}
                className="w-32 h-32 border rounded-md overflow-hidden shadow-sm"
              >
                <img
                  src={
                    file.file
                      ? file.image_path
                      : `${BaseUrl()}storage/${file.image_path}`
                  }
                  alt={`File ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600">{translations.noFilesUploaded}</p>
          )}
        </div>
      </div>
    </div>
  );
}
