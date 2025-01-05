import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import CommonButton from '@/Components/CommonButton';
import { useForm } from '@inertiajs/react';
import FoodProductionView from '@/Components/Haccp/FoodProductionView';
import FoodProductionEdit from '@/Components/Haccp/FoodProduction';
import HaccpSidebar from '@/Components/Haccp/HaccpSidebar';

export default function ProductionVolumeUser({
  translations,
  companyId,
  companyFoodProduced,
  estimatedVolumes,
  companyProductionVolume,
  units,
  periods,
  isHaccp,
  anotherCompanyServe,
  AnotherCompanyProductionVolume
}: PageProps) {

  const auth: any = usePage().props.auth;
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, post, processing, errors} = useForm({
    food_volumes: companyFoodProduced.map((food: any) => {
      const existingVolume = companyProductionVolume.find(
        (volume: any) => volume.food_product_id === food.id
      );
      return {
        id: existingVolume ? existingVolume.id : 0,
        food_product_id: food.id,
        company_id: companyId,
        volume: existingVolume ? existingVolume.volume : '',
        unit: existingVolume ? existingVolume.unit : '',
        period: existingVolume ? existingVolume.period : '',
      };
    }),
  });

  const { data: anotherCompanyData, setData: setAnotherCompanyData, post: postAnotherCompanyData, processing: processingAnotherCompanyData , errors: otherCompanyErrors } = useForm({
    food_volumes: companyFoodProduced.map((food: any) => {
      const existingVolume = AnotherCompanyProductionVolume.find(
        (volume: any) => volume.other_production_volume?.food_product_id === food.id
      );
      return {
        id: existingVolume ? existingVolume.other_production_volume?.id : 0,
        food_product_id: food.id,
        company_id: companyId,
        volume: existingVolume ? existingVolume.other_production_volume?.volume : '',
        unit: existingVolume ? existingVolume.other_production_volume?.unit : '',
        period: existingVolume ? existingVolume.other_production_volume?.period : '',
      };
    }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Promise.all([
      post(route('production.volume.update'), {
        data,
        onSuccess: () => {
            setIsEditing(false);
        },
        onError: (errors) => {
            setIsEditing(true);
        },
      }),
      postAnotherCompanyData(route('another.company.production.volume'), {
        data: anotherCompanyData,
        onSuccess: () => {
            setIsEditing(false);
        },
        onError: (errors) => {
            setIsEditing(true);
        },
      }),
    ])
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
        {isHaccp === 1 && <HaccpSidebar />}
        <div className="max-w-7xl mx-auto">
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
                otherCompanyErrors = {otherCompanyErrors}
                handleSubmit={handleSubmit}
                setData={setData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                anotherCompanyServe = {anotherCompanyServe}
                anotherCompanyData = {anotherCompanyData}
                setAnotherCompanyData = {setAnotherCompanyData}
              />
            ) : (
              <FoodProductionView
                data={data}
                anotherCompanyData = {anotherCompanyData}
                companyFoodProduced={companyFoodProduced}
                translations={translations}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                anotherCompanyServe = {anotherCompanyServe}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
