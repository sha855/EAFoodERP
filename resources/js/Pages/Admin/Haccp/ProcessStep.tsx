import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProcessStepIndex from '@/Components/Haccp/ProcessStepIndex';
import Drawer from '@/Components/Drawer';
import ProcessStepForm from '@/Components/Form/ProcessStepForm';
import ProcessView from '@/Components/Haccp/ProcessView';
import CommonButton from '@/Components/CommonButton';

export default function adminProcessStep({
  translations,
  process,
  monitoringTask,
  auditTemplate,
  hazardTypes,
  likelihood,
  severity,
  riskLevels,
  companyId,
  foodHazards,
  customProcess,
  CompanyActiveProcess,
  folders,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const { data, setData, post, processing, errors } = useForm({
    process_name: '',
    is_active_process: '',
    company_id: companyId,
    additional_info: '',
    is_active_add_info: '',
    hazard_info: '',
    is_active_hazard_info: false,
    custom_process_id: 0,
    potential_hazards: '',
    hazards_type: '',
    likelihood: 0,
    severity: 0,
    risk_level: '',
    justification_decision: '',
    preventive_measure: '',
    critical_limit: '',
    corrective_action: '',
    verification: '',
    food_hazard_id: 0,
    monitoring_task_id: [],
    audit_template_id: [],
  });

  const {
    data: activeProcessData,
    setData: setactiveProcessData,
    post: postActiveProcess,
    processing: processingProcess,
    errors: processActiveErrors,
  } = useForm({
    process_id: '',
    is_active: '',
    company_id: companyId,
    selected_process_activities: [],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('admin.custom.process.submit'));
    setIsDrawerOpen(false);
  };

  const handleActiveProcessSubmit = (e: any) => {
    e.preventDefault();
    postActiveProcess(route('admin.active.process.submit'), {
      onSuccess: (response) => {
        setIsEditing(false);
      },
      onError: (error) => {
        console.log('Error occurred:', error);
      },
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
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

      <div className="flex ">
        <AdminUserSidebar folders={folders || []} />

        <div className="w-full">
          {isEditing ? (
            <ProcessStepIndex
              activeProcessData={activeProcessData}
              setactiveProcessData={setactiveProcessData}
              translations={translations}
              process={process}
              processActiveErrors={processActiveErrors}
              handleDrawerOpen={handleDrawerOpen}
              handleActiveProcessSubmit={handleActiveProcessSubmit}
              companyId={companyId}
              customProcess={customProcess}
              CompanyActiveProcess={CompanyActiveProcess}
              toggleEdit={toggleEdit}
              isEditing={isEditing}
            />
          ) : (
            <ProcessView
              setactiveProcessData={setactiveProcessData}
              translations={translations}
              process={process}
              companyId={companyId}
              CompanyActiveProcess={CompanyActiveProcess}
              toggleEdit={toggleEdit}
              isEditing={isEditing}
            />
          )}
        </div>

        <Drawer
          isDrawerOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          title="Edit process step"
          formContent={
            <ProcessStepForm
              monitoringTask={monitoringTask}
              auditTemplate={auditTemplate}
              hazardTypes={hazardTypes}
              likelihood={likelihood}
              severity={severity}
              riskLevels={riskLevels}
              data={data}
              setData={setData}
              processing={processing}
              errors={errors}
              handleSubmit={handleSubmit}
              foodHazards={foodHazards}
              customProcess={customProcess}
            />
          }
        />
      </div>
    </AuthenticatedLayout>
  );
}
