import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import Container from '@/Components/Container';
import { useEffect, useState } from 'react';
import TextInput from '@/Components/TextInput';
import CommonButton from '@/Components/CommonButton';
import AdminSettingSidebar from '@/Components/Admin/AdminSettingSidebar';

export default function Index({ setting }: PageProps) {
  const auth: any = usePage().props.auth;
  const { data, setData, post, processing, errors } = useForm({
    id: setting?.id || 0,
    logo: null as File | null,
    full_logo: null as File | null,
    favicon: null as File | null,
    mobile_logo: null as File | null,
    dark_logo: null as File | null,
    api_token: setting?.api_token || '',
  });
  const baseURL = `${window.location.origin}`;

  const [previews, setPreviews] = useState<{ [key: string]: string | null }>({
    logo: setting?.logo_path ? `${baseURL}${setting.logo_path}` : null,
    full_logo: setting?.full_logo_path
      ? `${baseURL}${setting.full_logo_path}`
      : null,
    favicon: setting?.favicon_path ? `${baseURL}${setting.favicon_path}` : null,
    mobile_logo: setting?.mobile_logo_path
      ? `${baseURL}${setting.mobile_logo_path}`
      : null,
    dark_logo: setting?.dark_logo_path
      ? `${baseURL}${setting.dark_logo_path}`
      : null,
  });

  type FieldKey = keyof typeof data;

  const handleFileChange =
    (field: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setData((prevData) => ({
        ...prevData,
        [field]: file,
      }));

      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [field]: event.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        setPreviews((prevPreviews) => ({
          ...prevPreviews,
          [field]: null,
        }));
      }
    };

  const handleRemoveImage = (field: FieldKey) => {
    setData(field, null);
    setPreviews((prev) => ({ ...prev, [field]: null }));
  };

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 20);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value instanceof File ? value : String(value));
      } else {
        formData.append(key, '');
      }
    });

    post(route('admin.setting.update'), {
      data: formData,
      onSuccess: () => console.log('Settings saved successfully!'),
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          User Settings
        </h2>
      }
    >
      <Head title="Settings" />
      <Container>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/4">
            <AdminSettingSidebar />
          </div>

          <div className="flex-1">
            <form
              onSubmit={handleSave}
              className="flex flex-col gap-6 p-8 bg-gray-50 rounded-md"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { field: 'logo', label: 'Logo', previewKey: 'logo' },
                  {
                    field: 'full_logo',
                    label: 'Full Logo with Text',
                    previewKey: 'full_logo',
                  },
                  { field: 'favicon', label: 'Favicon', previewKey: 'favicon' },
                  {
                    field: 'mobile_logo',
                    label: 'Mobile Logo',
                    previewKey: 'mobile_logo',
                  },
                  {
                    field: 'dark_logo',
                    label: 'Dark Mode Logo',
                    previewKey: 'dark_logo',
                  },
                ].map(({ field, label, previewKey }) => (
                  <div key={field}>
                    <label className="block text-lg font-medium mb-2">
                      {label}
                    </label>
                    <div className="relative inline-block">
                      <TextInput
                        type="file"
                        accept=".jpg,.png,.svg,.jpeg,.ico"
                        onChange={handleFileChange(field as any)}
                      />
                      {previews[previewKey] && (
                        <div className="relative mt-2">
                          <img
                            src={previews[previewKey]!}
                            alt={`${label} Preview`}
                            className="h-20 w-auto rounded shadow"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(field as any)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      )}

                      {errors[field as keyof typeof errors] && (
                        <p className="text-sm text-red-600 mt-1">
                          {errors[field as keyof typeof errors]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Web API Token Field */}
              <div className="mt-4">
                <label className="block text-lg font-medium mb-2">
                  Web API Token
                </label>
                <div className="flex items-center gap-2">
                  <TextInput
                    type="text"
                    value={data.api_token}
                    onChange={(e) => setData('api_token', e.target.value)}
                    className="flex-1 border rounded p-2"
                  />
                  <button
                    type="button"
                    onClick={() => setData('api_token', generateToken())}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Generate Token
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <CommonButton
                  type="submit"
                  disabled={processing}
                  variant="success"
                >
                  {processing ? 'Saving...' : 'Save Settings'}
                </CommonButton>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </AuthenticatedLayout>
  );
}
