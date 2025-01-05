import { createSlice } from '@reduxjs/toolkit';
import { selectedFieldData } from '@/types/monitoringForm';
import { MONITORING_TASK_SETUP_ENUM } from '@/types/enum';

interface initialStateProps {
  drawer: boolean;
  monitoringActiveFrom: {
    usedFor?: boolean;
    taskDetails?: boolean;
    verification?: boolean;
    checklistTasks?: boolean;
    currentType?: string | null;
    task_related?: string | null;
  };
  monitoringFromStepThree: {
    selectedFields: { id: number; type: string }[];
    data: {
      task_related: string;
      type: string;
      data: selectedFieldData[];
    } | null;
  };
  checkListActive: string;
}

const initialState: initialStateProps = {
  drawer: false,
  monitoringActiveFrom: {
    usedFor: false,
    taskDetails: false,
    verification: false,
    checklistTasks: false,
    currentType: null,
    task_related: null,
  },
  monitoringFromStepThree: {
    selectedFields: [],
    data: null,
  },
  checkListActive: '',
};

const StateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
    renderComponent: (state, action) => {
      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.EQUIPMENT
      ) {
        state.monitoringActiveFrom.usedFor = true;
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.verification = true;
      }

      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.NONE
      ) {
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.verification = true;
      }

      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_DETAILED_TASK &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.ROOMS
      ) {
        state.monitoringActiveFrom.usedFor = true;
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.verification = true;
      }

      //Checklist
      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.EQUIPMENT
      ) {
        state.monitoringActiveFrom.usedFor = true;
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.checklistTasks = true;
        state.monitoringActiveFrom.verification = true;
      }

      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.ROOMS
      ) {
        state.monitoringActiveFrom.usedFor = true;
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.checklistTasks = true;
        state.monitoringActiveFrom.verification = true;
      }
      if (
        action.payload.type === MONITORING_TASK_SETUP_ENUM.A_CHECKLIST &&
        action.payload.task === MONITORING_TASK_SETUP_ENUM.NONE
      ) {
        state.monitoringActiveFrom.taskDetails = true;
        state.monitoringActiveFrom.checklistTasks = true;
        state.monitoringActiveFrom.verification = true;
      }

      state.monitoringActiveFrom.currentType = action.payload.type;
      state.monitoringActiveFrom.task_related = action.payload.task;
    },
    handleSelectedField: (state, action) => {
      state.monitoringFromStepThree.selectedFields.push({
        id: state.monitoringFromStepThree.selectedFields.length + 1,
        type: action.payload,
      });
    },
    removeSelectedField: (state, action) => {
      state.monitoringFromStepThree.selectedFields =
        state.monitoringFromStepThree.selectedFields.filter(
          (item, index: number) => item.id !== action.payload
        );
    },
    activeCheckList: (state, action) => {
      state.checkListActive = action.payload;
    },
  },
});

export const {
  closeDrawer,
  openDrawer,
  renderComponent,
  handleSelectedField,
  removeSelectedField,
  activeCheckList,
} = StateSlice.actions;

export default StateSlice.reducer;

export const renderForm =
  ({ type, task }: { type: string; task: string }) =>
  (dispatch: any) => {
    dispatch(renderComponent({ type, task }));
  };

export const UpdateSelectField =
  ({ field }: { field: string }) =>
  (dispatch: any) => {
    dispatch(handleSelectedField(field));
  };
export const removeField =
  ({ field }: { field: number }) =>
  (dispatch: any) => {
    dispatch(removeSelectedField(field));
  };
