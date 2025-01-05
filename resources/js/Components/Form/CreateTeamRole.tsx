import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import { useForm } from '@inertiajs/react';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from 'react';

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

interface Table {
  membersRoles: string;
  yes: string;
  no: string;
  noTeamAvailable: string;
  noRoleAvailable: string;
  noTrainingAvailable: string;
}

interface Role {
  used: string;
  name: string;
  team: string;
  newTeamRole: string;
}

interface MyObject {
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
  table: Table;
  role: Role;
}

export interface editData {
  id: number;
  name: string;
  company_id: string;
}

const CreateTeamFeaturedRole = ({
  companyId,
  translations,
  edit,
  setEdit,
}: {
  companyId: number;
  translations: MyObject;
  edit: editData;
  setEdit: Dispatch<SetStateAction<any>>;
}) => {
  const dispatch = useAppDispatch();

  const routeParams = {
    id: edit?.id,
    ...(companyId ? { company: companyId } : {}),
  };

  const { data, setData, post, put, errors } = useForm({
    name: edit?.name || '',
    company_id: edit?.company_id || companyId || '',
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    post(route('team.role.store'), {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
    });
  };

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    put(
      route('teamRole.update', {
        id: routeParams.id,
        country_id: routeParams.company,
      }),
      {
        onSuccess: () => {
          setEdit(null);
          dispatch(closeDrawer());
        },
      }
    );
  };

  const cancelDrawer = () => {
    setEdit(null);
    dispatch(closeDrawer());
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          placeholder="Role name"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations.cancel}
        </CommonButton>
        <CommonButton
          onClick={edit ? handleEditSubmit : handleSubmit}
          style={{
            background:
              'linear-gradient(90deg, rgb(255, 111, 97) 41%, rgb(255, 154, 118) 77%, rgb(255, 199, 133) 100%)',
          }}
          variant="success"
          type="button"
        >
          {translations.save}
        </CommonButton>
      </div>
    </form>
  );
};

export default CreateTeamFeaturedRole;
