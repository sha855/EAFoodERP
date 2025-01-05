import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import IngredientIndex from '@/Components/Haccp/Ingredient';
import IngredientView from '@/Components/Haccp/IngredientView';
import CommonButton from '@/Components/CommonButton';
import HaccpSidebar from '@/Components/Haccp/HaccpSidebar';

interface IngredientField {
  [key: string]: boolean;
}

interface ExistingIngredients {
  [ingredientId: string]: {
    [ingredientTypeId: string]: IngredientField;
  };
}

export default function UserIngredients({
  translations,
  ingredients,
  companyId,
  companyIngredient,
  getIngredientsTypeCompany,
  isHaccp,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const { data, setData, post, errors, processing } = useForm({
    company_id: companyId,
    ingredients: {} as ExistingIngredients,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    if (companyIngredient.length === 0) return;

    const existingIngredients: ExistingIngredients = {};
    companyIngredient.forEach((item: any) => {
      const { ingredient_id, ingredient_type_id, ...fields } = item;
      if (!existingIngredients[ingredient_id]) {
        existingIngredients[ingredient_id] = {};
      }
      existingIngredients[ingredient_id][ingredient_type_id] = fields;
    });

    setData((prevData) => {
      if (
        JSON.stringify(prevData.ingredients) !==
        JSON.stringify(existingIngredients)
      ) {
        return {
          ...prevData,
          ingredients: existingIngredients,
        };
      }
      return prevData;
    });
  }, [companyIngredient]);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = (
    ingredientId: string,
    ingredientTypeId: string,
    field: string
  ) => {
    setData('ingredients', {
      ...data.ingredients,
      [ingredientId]: {
        ...data.ingredients[ingredientId],
        [ingredientTypeId]: {
          ...data.ingredients[ingredientId]?.[ingredientTypeId],
          [field]: !data.ingredients[ingredientId]?.[ingredientTypeId]?.[field],
        },
      },
    });
  };

  const handleSubmit = () => {
    post(route('haccp.ingredients.store'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (errors) => {
        const messages = Object.values(errors).flat();
        setErrorMessages(messages);
        setShowPopup(true);
      },
    });
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessages([]);
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
      <Head title="Manage Food Businesses" />
      {showPopup && (
        <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Error</h3>
            <button
              onClick={closePopup}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <ul className="mt-2">
            {errorMessages.map((message, index) => (
              <li key={index} className="text-red-500">
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="flex h-screen">
          {isHaccp === 1 && <HaccpSidebar />}

          <div className="w-full bg-white rounded-lg h-fit">
            {isEditing ? (
              <IngredientIndex
                translations={translations}
                ingredients={ingredients}
                selectedIngredients={data.ingredients}
                onCheckboxChange={handleCheckboxChange}
                onSubmit={handleSubmit}
                processing={processing}
                isEditing={isEditing}
                handleEditClick={handleEditClick}
              />
            ) : (
              <IngredientView
                translations={translations}
                companyIngredient={getIngredientsTypeCompany}
                processing={processing}
                isEditing={isEditing}
                handleEditClick={handleEditClick}
              />
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
