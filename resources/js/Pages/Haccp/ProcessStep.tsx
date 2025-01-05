import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import ProcessStepIndex from '@/Components/Haccp/ProcessStepIndex';
import Drawer from '@/Components/Drawer';
import ProcessStepForm from '@/Components/Form/ProcessStepForm';
import ProcessView from '@/Components/Haccp/ProcessView';
import CommonButton from '@/Components/CommonButton';
import HaccpSidebar from '@/Components/Haccp/HaccpSidebar';

export default function UserProcessStep({
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
  isHaccp,
  inActiveProcess,
}: PageProps) {
  const auth: any = usePage().props.auth;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
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

  const { data: activeProcessData, setData: setactiveProcessData } = useForm({
    processes: process.map(mapProcess),
  });

  const { data: inactiveProcessData, setData: setInactiveProcessData } = useForm({
    processes: inActiveProcess.map(mapProcess),
  });

  const [combinedProcesses, setCombinedProcesses] = useState<any[]>([]);

  useEffect(() => {
    const combined = [...activeProcessData.processes, ...inactiveProcessData.processes];
    setCombinedProcesses(combined);
  }, [activeProcessData.processes, inactiveProcessData.processes]);

  function mapProcess(proc: any) {
    let activities = [];
    if (proc?.activities) {
      activities = typeof proc.activities === 'string' ? JSON.parse(proc.activities) : proc.activities;
    }
    return {
      id: proc.id,
      name: proc.name,
      company_id: proc.company_id,
      is_active: proc.is_active,
      description: proc.description,
      activities: activities.map((activity: any) => ({
        name: activity?.name,
        description: activity?.description,
        is_active: activity?.is_active || false,
      })),
    };
  }

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);

  const handleCombinedProcessSubmit = (e: any) => {
    e.preventDefault();
    router.post(route('haccp.activeprocess.submit'), { processes: combinedProcesses }, {
      onSuccess: () => {
        setIsDrawerOpen(false); // Close the drawer
      },
    });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

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
        {/* Sidebar */}
        {isHaccp === 1 && <HaccpSidebar />}

        <div className="w-full">
          {isEditing ? (
            <ProcessStepIndex
              activeProcessData={activeProcessData}
              setactiveProcessData={setactiveProcessData}
              translations={translations}
              process={process}
              processActiveErrors={errors}
              handleDrawerOpen={handleDrawerOpen}
              handleCombinedProcessSubmit={handleCombinedProcessSubmit}
              companyId={companyId}
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              setIsEditing={setIsEditing}
              inactiveProcessData={inactiveProcessData}
              setInactiveProcessData={setInactiveProcessData}
            />
          ) : (
            <ProcessView
              activeProcessData={activeProcessData}
              translations={translations}
              process={process}
              companyId={companyId}
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              setIsEditing={setIsEditing}
            />
          )}
        </div>

        {/* Drawer for Editing */}
        <Drawer
          isDrawerOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          title="Edit Process Step"
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
              handleSubmit={(e: any) => {
                e.preventDefault();
                post(route('haccp.submit'), {
                  onSuccess: () => {
                    setIsDrawerOpen(false);
                    reset();
                  },
                });
              }}
              foodHazards={foodHazards}
            />
          }
        />
      </div>
    </AuthenticatedLayout>
  );
}
