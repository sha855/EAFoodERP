import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import FoodProductIndex from '@/Components/Haccp/FoodProduct';
import CommonButton from '@/Components/CommonButton';
import FoodProductView from '@/Components/Haccp/FoodProductView';

export default function adminProcessStep({
  producedFood,
  translations,
  companyId,
  companyFoodProduced,
  folders,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const { data, setData, post } = useForm({
    food_product: producedFood.map((food: any) => {
      const existingFood = companyFoodProduced.find(
        (item: any) => item.food_product_id === food.id
      );
      return {
        id: existingFood ? existingFood.id : 0,
        food_product_id: food.id,
        is_active: existingFood ? true : false,
        company_id: companyId,
        product: food.product,
        description: food.description,
      };
    }),
  });

  const handleToggle = (food_product_id: number, is_active: boolean) => {
    setData(
      'food_product',
      data.food_product.map((food: any) =>
        food.food_product_id === food_product_id ? { ...food, is_active } : food
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.producedFood.store'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    });
  };

  const [isEditing, setIsEditing] = useState(false);

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
      <Head title="Manage Food Businesses" />

      <div className="flex h-fit">
        <AdminUserSidebar folders={folders || []} />

        <div className="bg-white p-0 shadow rounded h-fit w-full">
          <form onSubmit={handleSubmit}>
            {isEditing ? (
              <FoodProductIndex
                translation={translations}
                producedFood={data.food_product}
                onToggle={handleToggle}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
              />
            ) : (
              <FoodProductView
                translation={translations}
                producedFood={data.food_product}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
              />
            )}
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
