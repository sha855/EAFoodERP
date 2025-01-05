import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import StatusCard from '@/Components/Card/StatusCard';
import { GoPlusCircle } from 'react-icons/go';
import Container from '@/Components/Container';
import clsx from 'clsx';
import { IoMdClose, IoMdInformationCircleOutline } from 'react-icons/io';
import React, { useState } from 'react';

export default function Index({
  translations,
  businessUnitCompany,
  customWorkGroup,
  companyWorkgroup,
  FoodProduct,
  CompanyProduction,
  companyIngredient,
  analyses,
  CompanyActiveProcess,
  customProcess,
  flowChart,
  locationPlan,
  floorPlan,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const businessUnitData = businessUnitCompany.business_unit;
  const workGroupData =
    customWorkGroup.length > 0 ? customWorkGroup : companyWorkgroup;
  const producedServedSoldFood = FoodProduct;
  const productionVolume = CompanyProduction;
  const companyIngredientData = companyIngredient;
  const analysesData = analyses;
  const processSteps =
    CompanyActiveProcess.length > 0 ? CompanyActiveProcess : customProcess;
  const taskDetails = analysesData.map((analysis: any) => ({
    task_detail: analysis.task_detail || '',
  }));

  const statusCardsData = [
    {
      title: 'General Info',
      description:
        'Note that choosing your main field of activity will affect the setup of your HACCP plan.',
      status: 'incomplete',
      link: route('haccp.general-Info'),
    },
    {
      title: 'Work Group',
      description:
        'Here is a list of activities that are important to keep your food safety under control. Mark a person who is responsible for each activity. This way your employees will know who to approach when they have a question.',
      status: 'incomplete',
      link: route('work-group.index'),
    },
    {
      title: 'Process Steps',
      description:
        'Here is a list of process steps, choose the ones you undertake in your business unit. Your food safety plan will include the safety instructions according to your chosen processes. You can always add/remove new processes and instructions to/from your plan!',
      status: 'incomplete',
      link: route('haccp.process'),
    },
    {
      title: 'Produced / Served / Sold Food',
      description:
        'Here is a list of food you may sell. Mark all the food that you serve/make at your business unit.',
      status: 'incomplete',
      link: route('haccp.food-product'),
    },
    {
      title: 'Production Volume',
      description: 'Here is a list of produces food production',
      status: 'incomplete',
      link: route('production.volume'),
    },
    {
      title: 'Ingredients',
      description:
        'List all the ingredients you use for making food and products you sell without packaging.',
      status: 'incomplete',
      link: route('haccp.ingredients'),
    },
    {
      title: 'Analyses',
      description:
        'Mark how often you do different analyses to prevent food contamination. In addition to provided analyses, you can add analyses according to need.',
      status: 'incomplete',
      link: route('haccp.analyses'),
    },
    {
      title: 'Flow Chart',
      description:
        'A flow chart helps to map out the steps of your food handling process and the possible risks. You can edit an automatically generated flow chart that is created according to your production processes or upload your own file.',
      status: 'incomplete',
      link: route('flow-chart.index'),
    },
    {
      title: 'Location Plan',
      description:
        'The location plan should show the boundaries of the site, including buildings, facilities, etc.  where the food preparation area and all related activities taking place (packaging, storage, outdoor smoke oven etc). See the example!',
      status: 'incomplete',
      link: route('location-plan.index'),
    },
    {
      title: 'Floor Plan',
      description:
        'The interior design and layout of the food business should allow adequate food hygiene, including the protection of food from cross-contamination between and during operations. The layouts should verify that food safety can be ensured onsite See the examples',
      status: 'incomplete',
      link: route('floor-plan.index'),
    },
  ];

  const updatedStatusCardsData = statusCardsData.map((card) => {
    const isDataComplete = {
      'General Info': !!businessUnitData,
      'Work Group': Array.isArray(workGroupData) && workGroupData.length > 0,
      'Process Steps': Array.isArray(processSteps) && processSteps.length > 0,
      'Produced / Served / Sold Food':
        Array.isArray(producedServedSoldFood) &&
        producedServedSoldFood.length > 0,
      'Production Volume':
        Array.isArray(productionVolume) && productionVolume.length > 0,
      Ingredients:
        Array.isArray(companyIngredientData) &&
        companyIngredientData.length > 0,
      Analyses: taskDetails.some(
        (detail: any) =>
          typeof detail.task_detail.comment === 'string' &&
          detail.task_detail.comment.trim() !== ''
      ),
      'Flow Chart': Array.isArray(flowChart) && flowChart.length > 0,
      'Location Plan': Array.isArray(locationPlan) && locationPlan.length > 0,
      'Floor Plan': Array.isArray(floorPlan) && floorPlan.length > 0,
    }[card.title];

    return {
      ...card,
      status: isDataComplete ? 'complete' : 'incomplete',
    };
  });
  const [openAlert, setAlertOpen] = React.useState(true);
  const totalTasks = updatedStatusCardsData.length;
  const completedTasks = updatedStatusCardsData.filter(
    (card) => card.status === 'complete'
  ).length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          HACCP Plan
        </h2>
      }
    >
      <Head title="HACCP Plan" />

      <div className="max-w-7xl mx-auto">
        <Container>
          <div>
            <div className="overflow-hidden sm:rounded-lg">
              <h1 className="pb-6 text-gray-900 text-3xl font-bold">
                Creating your HACCP Plan
              </h1>
              <div className="px-4 py-6 bg-gray-200 shadow-sm sm:rounded-xl border-l-2 mb-10">
                <div className="flex mb-2 items-center justify-between">
                  {openAlert && (
                    <div className="bg-green-200 border border-green-400 text-black p-4 rounded-md mb-4 relative flex  justify-center">
                      <div className="w-10 text-center flex">
                        <IoMdInformationCircleOutline className="h-6 w-6" />
                      </div>
                      <div className="pr-3">
                        <p className="text-sm">
                          This is a HACCP Plan builder. Answer the questions, follow each step, and let the software automatically generate your customizable HACCP plan template. You can customize the plan later according to your needs or feedback. Need help? Read our article How to get started with HACCP Plan?
                        </p>
                      </div>
                      <div className="w-8 text-center flex justify-center items-center">
                        <IoMdClose
                          onClick={() => setAlertOpen(false)}
                          className="h-5 w-5 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 ml-5">
                  <div
                    className="overflow-hidden h-2 text-xs flex rounded bg-white"
                    style={{
                      width: '90%',
                      height: '16px',
                      borderRadius: '12px',
                    }}
                  >
                    <div
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white rounded-lg justify-center"
                      style={{
                        width: `${completionPercentage}%`,
                        background:
                          'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)',
                      }}
                    ></div>
                  </div>
                  <button
                    className={`bg-gray-400 hover:bg-gray-500 text-white text-md font-medium py-2 px-4 rounded-full bg-gradient-org-red flex items-center gap-2 ${completionPercentage === 100 ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => {
                      router.get(
                        route('haccp.completed', {
                          company: businessUnitData.company_id,
                        })
                      );
                    }}
                    disabled={completionPercentage !== 100}
                  >
                    <GoPlusCircle className="text-xl" />
                    Create
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {updatedStatusCardsData.map((card, index) => (
                  <StatusCard
                    key={index}
                    title={card.title}
                    description={card.description}
                    status={card.status}
                    link={card.link}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AuthenticatedLayout>
  );
}
