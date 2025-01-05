import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import SetupSidebar from '@/Components/Setup/SetupSidebar';
import CommonButton from '@/Components/CommonButton';
import { IconButton } from '@mui/material';
import { InfoIcon } from 'lucide-react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import TableButton from '@/Components/TableButton';
import ConfirmationBox from '@/Components/ConfirmationBox';
import CommonTable from '@/Components/CommonTable';

interface TranslationStructure {
  [key: string]: any;
}

interface TranslationProps extends PageProps {
  translation: {
    'ApiAccessToken.messages': TranslationStructure;
    'ApiAccessToken.Messages': TranslationStructure;
  };
  locale: string;
}

interface ApiAccessTokenData {
  name: string;
  api_access_token: string;
  companyId: string;
}

export default function Index({ apiAccessTokens, companyId }: PageProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, setData, post, processing, errors } =
    useForm<ApiAccessTokenData>({
      name: '',
      api_access_token: '',
      companyId: '',
    });

  const { translation, locale } = usePage<TranslationProps>().props;
  const translations =
    translation['ApiAccessToken.messages'] ||
    translation['ApiAccessToken.Messages'] ||
    {};

  const auth: any = usePage().props.auth;

  const columns = [
    { label: translations.table.name, key: 'name', sortable: true },
    {
      label: translations.table.apiToken,
      key: 'api_access_token',
      sortable: true,
    },
    {
      label: 'Actions',
      key: 'actions',
      renderCell: (params: any) => (
        <div className="flex gap-2">
          <TableButton
            variant="outlined"
            onClick={() => handleDeleteClick(params.id)}
          >
            {translations.table.delete}
          </TableButton>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (id: any) => {
    setDeleteId(id);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      router.delete(route('integrations.destroy', { id: deleteId }), {
        onSuccess: () => {},
        onError: () => {},
      });
      setShowConfirmation(false);
      setDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setDeleteId(null);
  };

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const apiRoute = route('integrations.store');
    post(apiRoute, {
      onSuccess: () => {
        setData({ name: '', api_access_token: '', companyId: companyId });
      },
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold">
          {translations.data.setupIntegration}
        </h2>
      }
    >
      <Head title={translations.data.integration} />

      <div className="flex ">
        <SetupSidebar />

        <div className="flex-1 bg-white rounded-lg">
          <div className="flex justify-between items-center p-4  bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h3 className="text-xl font-bold">
              {translations.data.integration}
            </h3>
          </div>

          <div className="p-4">
            <>
              {isVisible && (
                <div
                  className={`bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex items-start`}
                >
                  <InfoIcon className="w-5 h-5  mr-3" />
                  <div className="flex-1">
                    <h2 className="text-sm font-medium text-black">
                      {translations.data.warning}
                    </h2>
                  </div>
                  <IconButton
                    onClick={handleClose}
                    className=" text-gray-600 hover:text-gray-900"
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </>
            <div>{translations.data.topMsg}</div>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-4 my-4">
                <TextInput
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder={translations.table.name}
                  className="border rounded px-4 py-2 w-1/4"
                />
                <CommonButton
                  style={{
                    background:
                      'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
                  }}
                  variant="success"
                  type="submit"
                >
                  {translations.data.createApiToken}
                </CommonButton>
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </form>
            {showConfirmation && (
              <ConfirmationBox
                Question={translations.confirm.deleteMsg}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
              />
            )}
            <CommonTable
              columns={columns}
              data={apiAccessTokens}
              dataRoute={'integrations.index'}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
