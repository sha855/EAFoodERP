import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import AnalysesIndex from '@/Components/Haccp/Analyses';
import AnalysesView from '@/Components/Haccp/AnalysesView';
import CommonButton from '@/Components/CommonButton';
import HaccpSidebar from '@/Components/Haccp/HaccpSidebar';

export default function userAnalyses({
  translations,
  analysesFrequencyOptions,
  analysesData,
  customAnalysesData,
  companyId,
  isHaccp,
  waterSystemAnalyses
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [isEditing, setIsEditing] = useState(false);

  const initialData = [
    ...analysesData.map((analysis: any) => ({
      id: analysis.task_detail?.id,
      task_name: analysis.task_name || '',
      frequency: analysis.task_detail?.frequency || '',
      company_id: companyId || '',
      analyses_task_id: analysis.id || '',
      comment: analysis.task_detail?.comment || '',
      custom_frequency: analysis.task_detail?.custom_frequency || '',
      isNew: false,
    })),
    ...customAnalysesData.map((customTask: any) => ({
      id: customTask.id,
      task_name: customTask.task_name || '',
      frequency: customTask.frequency || '',
      company_id: customTask.company_id || '',
      analyses_task_id: customTask.id || '',
      comment: customTask.comment || '',
      custom_frequency: customTask.custom_frequency || '',
      isNew: true,
    })),
  ];

  const { data, setData, post, processing, errors } = useForm({
    analyses: initialData,
  });

  const handleChange = (index: number, field: string, value: any) => {
    const updatedData = [...data.analyses];
    updatedData[index][field] = value;
    setData('analyses', updatedData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('analyses.store'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
      preserveScroll: true,
    });
  };

  const addNewAnalysis = () => {
    setData('analyses', [
      ...data.analyses,
      {
        id: 0,
        task_name: '',
        frequency: '',
        company_id: companyId || '',
        comment: '',
        custom_frequency: '',
        isNew: true,
      },
    ]);
  };

  const removeAnalysis = (id: number) => {
    if (data.analyses.some((analysis) => analysis.id === id)) {
      const updatedData = data.analyses.filter(
        (analysis) => analysis.id !== id
      );
      setData('analyses', updatedData);
      router.get(route('analyses.delete', { analyses: id }));
    }
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

      <div className="flex">
        {isHaccp === 1 && <HaccpSidebar />}
        <div className="bg-white  shadow rounded w-full h-fit">
          {isEditing ? (
            <AnalysesIndex
              translations={translations}
              frequency={analysesFrequencyOptions}
              analysesData={data.analyses}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              addNewAnalysis={addNewAnalysis}
              removeAnalysis={removeAnalysis}
              processing={processing}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              errors={errors}
              waterSystemAnalyses = {waterSystemAnalyses}
            />
          ) : (
            <AnalysesView
              translations={translations}
              frequency={analysesFrequencyOptions}
              analysesData={data.analyses}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              addNewAnalysis={addNewAnalysis}
              removeAnalysis={removeAnalysis}
              processing={processing}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
            />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
