import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import { useForm, usePage } from '@inertiajs/react';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import { useState, useRef, useEffect } from 'react';
interface Training {
  id: number;
  user_id: number;
  company_id: number;
  training_name: string;
  frequency: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface FrequencyOption {
  label: string;
  value: string;
}

interface TeamMessages {
  created: string;
  updated: string;
  notFound: string;
}

interface RoleMessages {
  used: string;
  name: string;
  team: string;
  newTeamRole: string;
}

interface CertificateMessages {
  created: string;
  missing: string;
}

interface DeleteMessages {
  confirm: string;
  no: string;
  yes: string;
}

interface ActionMessages {
  add: string;
  edit: string;
  delete: string;
  activate: string;
  deactivate: string;
  confirmDelete: string;
}

interface TrainingMessages {
  task: string;
  frequency: string;
  created: string;
  updated: string;
  notFound: string;
  select: string;
}

interface SidebarMenu {
  team: {
    menu: string;
    subMenu: {
      teamMember: string;
    };
  };
  setting: {
    menu: string;
    subMenu: {
      teamRoles: string;
      certificateTraining: string;
    };
  };
}

interface TableMessages {
  membersRoles: string;
  yes: string;
  no: string;
  noTeamAvailable: string;
  noRoleAvailable: string;
  noTrainingAvailable: string;
}

interface Messages {
  team: TeamMessages;
  role: RoleMessages;
  certificate: CertificateMessages;
  delete: DeleteMessages;
  actions: ActionMessages;
  training: TrainingMessages;
  sidebarMenu: SidebarMenu;
  teamMember: string;
  newTeamMember: string;
  addRole: string;
  addTraining: string;
  assignToTeamRoles: string;
  add: string;
  uploadDocument: string;
  issuedOn: string;
  validUntil: string;
  cancel: string;
  save: string;
  table: TableMessages;
}

const CreateTeamcertificatesAndTrainings = ({
  editData,
  frequencies,
  translations,
  companyId,
}: {
  editData: Training;
  frequencies: FrequencyOption[];
  translations: Messages;
  setIsDrawerOpen?: boolean;
  companyId: any;
}) => {
  const [editDataModal, setEditDataModal] = useState<any>();
  const auth: any = usePage().props.auth;
  const loginUser = auth.roles[0];

  const dispatch = useAppDispatch();
  const { data, setData, post, errors } = useForm({
    training_name: '',
    frequency: '',
    companyId: companyId || '',
  });

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setEditDataModal(editData);
      setData({
        training_name: editData.training_name || '',
        frequency: editData.frequency || '',
        companyId: companyId || '',
      });
    }
  }, [editData, frequencies]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const url = editData?.id
      ? route(
          `${loginUser === 'admin' ? 'admin.team.training.edit' : 'team.training.edit'}`,
          { id: editData?.id }
        )
      : route(
          `${loginUser === 'admin' ? 'admin.team.certificate.store' : 'team.certificate.store'}`
        );

    post(url, {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
    });
  };

  const cancelDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          name="training_name"
          value={data.training_name}
          onChange={(e) => setData('training_name', e.target.value)}
          placeholder="Training name"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.training_name && (
          <p className="text-red-500 text-sm">{errors.training_name}</p>
        )}
      </div>
      <div>
        <select
          className="w-full border rounded p-2"
          name="frequency"
          value={data.frequency}
          onChange={(e) => setData('frequency', e.target.value)}
        >
          <option value="">{translations.training.select}</option>
          {frequencies?.map((option: any, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.frequency && (
          <p className="text-red-500 text-sm">{errors.frequency}</p>
        )}
      </div>
      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations.cancel}
        </CommonButton>
        <CommonButton
          style={{
            background:
              'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
          }}
          variant="success"
          type="submit"
        >
          {translations.save}
        </CommonButton>
      </div>
    </form>
  );
};

export default CreateTeamcertificatesAndTrainings;
