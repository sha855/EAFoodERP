export interface selectedFieldData {
  id: number;
  component: ComponentType;
  fieldTitle: string;
  cartTitle?: string;
  details?:
    | { [key: string]: any }
    | string
    | string[]
    | TimerValueTypes
    | ChoseValueTypes[]
    | ChoseValueTypes
    | null
    | unknown
    | object;
}

interface ChoseValueTypes {
  question: string;
  options: string[];
}

interface TimerValueTypes {
  hours: string[];
  notify: string;
}

export enum ComponentType {
  DATE = 'date',
  TIME = 'time',
  NONE = 'none',
  TEMPERATURE = 'temperature',
  AMOUNT = 'amount',
  TEXT = 'text',
  NUMERIC = 'numeric',
  MULTIPLE_ANSWER = 'multiple_answer',
  ONE_ANSWER = 'one_answer',
  PRODUCT = 'product',
  PHOTO_FILE = 'photo_file',
  TICKET = 'ticket',
  TIMER = 'timer',
  CORRECTIVE_FUNCTION = 'corrective',
  VERIFICATION = 'verification',
}

export interface ChecklistDataTypes {
  [key: string]: CheckListDataTypes[];
}

export interface CheckListDataTypes {
  id: number;
  name: string;
  allowNotDone: boolean;
  frequency: string;
  assignTask: string;
  title: string;
  data_id?: number;
  custom?: CustomFrequencyTypes;
}

export interface CustomFrequencyTypes {
  date: string;
  repeat: number;
  repeatOn?: string[];
  types: string;
  on?: string;
}

export interface TaskDetailsTypes {
  frequency: string;
  isFrequency: boolean;
  assignTask: string;
  isAssignTask: boolean;
  canSkip?: boolean;
  custom?: CustomFrequencyTypes;
}

export enum CartsTitleTypes {
  TASK_DETAILS = 'task_details',
  TASK_DETAILS_SINGLE = 'task_details_single',
  TASK_DETAILS_MULTIPLE = 'task_details_multiple',
  CHECKLIST = 'check-list',
}
