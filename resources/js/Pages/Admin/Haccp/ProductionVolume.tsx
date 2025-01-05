import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import FoodProductionView from '@/Components/Haccp/FoodProductionView';
import FoodProductionEdit from '@/Components/Haccp/FoodProduction';

export default function ProductionVolume({
  translations,
  companyId,
  companyFoodProduced,
  estimatedVolumes,
  companyProductionVolume,
  units,
  periods,
  errors,
  folders,
  anotherCompanyServe,
  AnotherCompanyProductionVolume
}: PageProps) {
  const auth: any = usePage().props.auth;
  const { props } = usePage();
  const idCompany = props.companyId;
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, post, processing } = useForm({
    food_volumes: companyFoodProduced.map((food: any) => {
      return {
        id: food.production_volume ? food.production_volume.id : 0,
        food_product_id: food.id,
        company_id: idCompany,
        volume: food.production_volume ? food.production_volume.volume : '',
        unit: food.production_volume ? food.production_volume.unit : '',
        period: food.production_volume ? food.production_volume.period : '',
      };
    }),
  });


  const { data : anotherCompanyData, setData :  setAnotherCompanyData, post : postAnotherCompanyData, processing :processingAnotherCompanyData } = useForm({
    food_volumes: AnotherCompanyProductionVolume.map((food: any) => {
      const existingVolume = AnotherCompanyProductionVolume.find(
        (volume: any) => volume.food_product_id === food.id
      );
      return {
        id: existingVolume ? existingVolume.id : 0,
        food_product_id: food.id,
        company_id: idCompany,
        volume: existingVolume ? existingVolume.volume : '',
        unit: existingVolume ? existingVolume.unit : '',
        period: existingVolume ? existingVolume.period : '',
      };
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.production.volume.update'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold text-white bg-blue-600 p-4 rounded">
          Process Steps
        </h2>
      }
    >
     <Head title="Manage Food Production" />
      <div className="flex">
        <AdminUserSidebar folders={folders || []} />
        <div className="">
          <div className="bg-white shadow rounded w-full h-fit">
            {isEditing ? (
              <FoodProductionEdit
                data={data}
                companyFoodProduced={companyFoodProduced}
                translations={translations}
                estimatedVolumes={estimatedVolumes}
                units={units}
                periods={periods}
                errors={errors}
                handleSubmit={handleSubmit}
                setData={setData}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                anotherCompanyServe = {anotherCompanyServe}
                anotherCompanyData = {anotherCompanyData}
                setAnotherCompanyData = {setAnotherCompanyData}
              />
            ) : (
              <FoodProductionView
                data={data}
                companyFoodProduced={companyFoodProduced}
                translations={translations}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                anotherCompanyServe = {anotherCompanyServe}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
