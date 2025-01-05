declare namespace App.Data.API {
  export type BusinessUserData = {
    id: number | null;
    full_name: string;
    company_name: string;
    work_email: string | null;
    business_type_name: string;
    total_no_of_employees: string;
    stdcode: string;
    phone: string;
    document_url: string | null;
  };
}
declare namespace App.Data.Company {
  export type CompanyRegistration = {
    user_id: number | null;
    company_name: string;
    email: string | null;
    password: string | null;
    password_confirmation: string | null;
    business_type_id: number;
    country_name: string;
    state: string;
    total_no_of_employees: string;
    total_no_of_business_locations: string;
  };
}
declare namespace App.Data.FoodBuisness {
  export type BusinessActivityArrayData = {
    types: Array<App.Data.FoodBuisness.BusinessActivityData>;
  };
  export type BusinessActivityData = {
    id: number | null;
    name: string;
    food_business_type_id: number;
  };
  export type FoodBusinessTypeArrayData = {
    food_business_types: Array<App.Data.FoodBuisness.FoodBusinessTypeData>;
  };
  export type FoodBusinessTypeData = {
    id: number | null;
    name: string;
    description: string;
  };
}
declare namespace App.Data.HaccpPlan {
  export type AnalysesArrayData = {
    analyses: Array<App.Data.HaccpPlan.AnalysesData>;
  };
  export type AnalysesData = {
    id: number | null;
    task_name: string;
    frequency: string;
    company_id: number;
    analyses_task_id: number | null;
    comment: string | null;
    custom_frequency: string | null;
    is_new: boolean;
  };
  export type CompanyProcessArrayData = {
    active_processes: Array<App.Data.HaccpPlan.CompanyProcessData>;
  };
  export type CompanyProcessData = {
    id: number | null;
    process_id: number;
    company_id: number;
    is_active: boolean;
    selected_process_activities: Array<any> | null;
  };
  export type FlowChartProcessArrayData = {
    process_steps: Array<App.Data.HaccpPlan.FlowChartProcessData>;
    image: string | null;
  };
  export type FlowChartProcessData = {
    id: number | null;
    flow_chart_id: number | null;
    company_id: number | null;
    process_name: string;
    process_step: string;
    type: string;
    is_time: boolean;
    is_temperature: boolean;
    is_quality: boolean;
    is_recording: boolean;
    instruction: string | null;
  };
  export type FlowChartUploadData = {
    id: number | null;
    files: Array<any>;
    file_path: string | null;
    company_id: number;
  };
  export type FoodProcessData = {
    id: number | null;
    process_name: string;
    is_active_process: boolean;
    company_id: number;
    additional_info: string | null;
    is_active_add_info: boolean;
    hazard_info: string | null;
    is_active_hazard_info: boolean;
    custom_process_id: number | null;
    potential_hazards: string | null;
    hazards_type: string | null;
    likelihood: number | null;
    severity: number | null;
    risk_level: string | null;
    justification_decision: string | null;
    preventive_measure: string | null;
    critical_limit: string | null;
    corrective_action: string | null;
    verification: string | null;
    monitoring_task_id: Array<any> | null;
    audit_template_id: Array<any> | null;
  };
  export type IngredientsData = {
    id: number | null;
    company_id: number;
    ingredients: Array<any>;
  };
  export type LocationPlanUploadData = {
    id: number | null;
    files: Array<any>;
    file_path: string | null;
    company_id: number;
  };
  export type ProducedFoodArrayData = {
    food_product: Array<App.Data.HaccpPlan.ProducedFoodData>;
  };
  export type ProducedFoodData = {
    id: number | null;
    food_product_id: number;
    company_id: number;
    is_active: boolean;
  };
  export type ProductionVolumeArrayData = {
    food_volumes: Array<App.Data.HaccpPlan.ProductionVolumeData>;
  };
  export type ProductionVolumeData = {
    id: number | null;
    food_product_id: number;
    company_id: number;
    volume: string;
    unit: string;
    period: string;
  };
  export type WorkGroupArrayData = {
    tasks: Array<App.Data.HaccpPlan.WorkGroupData>;
  };
  export type WorkGroupData = {
    id: number | null;
    task: string;
    company_id: number;
    is_required: boolean;
    is_service_provider: boolean;
    outsourced_service: string | null;
    responsible: string;
    task_id: number;
    user_id: number;
    is_new: boolean;
  };
}
declare namespace App.Data.Setup {
  export type CompanySetup = {
    user_id: number | null;
    company_name: string;
    country_name: string;
    email: string;
    registration_number: string;
    vat_no: string | null;
    address: string;
    preferred_language: string;
    volume_units: string;
    weight_units: string;
    temperature_unit: string;
    monitoring: string;
    temperature_prefill: string;
    date_format: string;
    business_type_id: string;
  };
}
declare namespace App.Enums {
  export type AnalysesFrequency =
    | 'not_done'
    | 'non_recurrent'
    | 'annually'
    | 'twice_a_year'
    | 'four_times_a_year'
    | 'other';
  export type AuditFrequency =
    | 'Once a quarter'
    | 'Once a year'
    | 'Twice a year';
  export type CertificateAndTrainingFrequencyEnum =
    | 'Twice a year'
    | 'Once a year'
    | 'After every two years'
    | 'After every three years'
    | 'After every four years'
    | 'After every five years'
    | 'After every six years'
    | 'When started an employment'
    | 'Once'
    | 'Custom'
    | 'Not found'
    | 'Type to search';
  export type DateFormat = 'DD.MM.YYYY' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
  export type EmployeeOptions = '1-10' | '11-50' | '51-200';
  export type FloorPlan =
    | 'Water and Sewerage Floor Plan'
    | 'Floor plan'
    | 'Equipment Floor Plan'
    | 'Entrances and Exits Floor Plan'
    | 'Waste, Tare, Pest Control Floor Plan';
  export type FoodProduction =
    | '1-15'
    | '16-150'
    | '151-500'
    | '501-1000'
    | '1001+'
    | 'Portion/Ptn'
    | 'Kilogram'
    | 'Litre'
    | 'Milliliter'
    | 'Gram'
    | 'Annually'
    | 'Daily'
    | 'Monthly'
    | 'Weekly';
  export type FrequencyEnum = 'yes,no' | '0,1,2' | '1,2,3,4,5';
  export type Languages = 'English' | 'Spanish' | 'French' | 'Russian';
  export type LocationOptions = '1-5' | '6-20' | '21-50';
  export type LocationPlan =
    | 'Building'
    | 'Ingredient entry'
    | 'Employees entry (mornings)'
    | 'Waste exit (evenings)'
    | 'Customer entry'
    | 'Production exit'
    | 'Waste storage on territory'
    | 'General water supply spot'
    | 'Entry and exit roads';
  export type MapPoints =
    | 'Building'
    | 'Ingredient entry'
    | 'Employees entry (mornings)'
    | 'Waste exit (evenings)'
    | 'Customer entry'
    | 'Production exit'
    | 'Waste storage on territory'
    | 'General water supply spot';
  export type MonitoringTaskSetupEnum =
    | 'equipment'
    | 'rooms'
    | 'none'
    | 'a_detailed_task'
    | 'a_checklist';
  export type PotentialHazards =
    | 'BioLogical'
    | 'Physical'
    | 'Chemicals'
    | 'Allergens'
    | 'Nutritional'
    | 'Radiation'
    | 'Vulnerability'
    | 'Terrorism';
  export type Roles =
    | 'Management'
    | 'Cooks'
    | 'Cleaning'
    | 'Maintenance'
    | 'Delivery'
    | 'Customer service';
  export type SharedRights = 'Monitoring' | 'No access' | 'Admin';
}
