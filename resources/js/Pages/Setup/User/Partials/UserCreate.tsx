import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import CommonButton from '@/Components/CommonButton';
import { Add as AddIcon } from '@mui/icons-material';
import TeamRolesModal from '@/Components/TeamRolesModal';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import { InfoIcon } from 'lucide-react';

type Role = {
  id: string;
  name: string;
};

type PaginatedRoles = {
  data: Role[];
  current_page: number;
  total: number;
};

type RoleListType = Role[];

type UserCreateProps = {
  roles: RoleListType | PaginatedRoles;
  sharedRights: any;
  sharedRightsLocation: any;
  onRolesUpdated: (roles: RoleListType[]) => void;
};

interface roleListTypes {
  name: string;
  id: string;
}

type PagePropsWithTranslation = {
  locale: string;
  auth: any;
};

const UserCreate: React.FC<UserCreateProps> = ({
  roles,
  sharedRights,
  sharedRightsLocation,
}) => {
  const dispatch = useAppDispatch();
  const { data, setData, post, processing, errors } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    roles: [] as roleListTypes[],
    rights: '',
  });
  const auth: any = usePage().props.auth;

  const [rolesList, setRoleList] = useState<roleListTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const normalizedRoles: Role[] = Array.isArray(roles) ? roles : roles.data;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveRoles = (selectedRoles: string[]) => {
    const rolesData = Array.isArray(roles) ? roles : roles.data;
    const rolesList = rolesData
      .filter((role) => selectedRoles.includes(role.id))
      .map((role) => ({ name: role.name, id: role.id }));
    setRoleList(rolesList);
    setData('roles', rolesList);
  };

  const removeSaveRoles = (id: string) => {
    setRoleList(rolesList.filter((item) => item.id !== id));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roleName = e.target.value;
    setSelectedRole(roleName);
    setData('rights', roleName);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(route('setup.user.store'), {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
      onError: (errors) => {
        console.log(errors);
      },
    });
  };

  const { translation, locale } = usePage().props;
  const [translationData, setTranslationsData] = useState<any>(translation);

  const UserCreate =
    translationData['Validation.setupUser'] ||
    translationData['Validation.setupUser'] ||
    {};
  const translations = { ...UserCreate };

  const cancelDrawer = () => {
    dispatch(closeDrawer());
  };

  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <InputLabel
          htmlFor="firstName"
          value={translations.drawer.firstName}
          className="text-base mb-2"
        />
        <TextInput
          type="text"
          name="firstName"
          placeholder={translations.drawer.firstName}
          className="border rounded px-4 py-2 w-full mb-3"
          onChange={(e) => setData('firstName', e.target.value)}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName}</p>
        )}
      </div>
      <div>
        <InputLabel
          htmlFor="lastName"
          value={translations.drawer.lastName}
          className="text-base mb-2"
        />
        <TextInput
          type="text"
          name="lastName"
          placeholder={translations.drawer.lastName}
          onChange={(e) => setData('lastName', e.target.value)}
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm">{errors.lastName}</p>
        )}
      </div>

      <div>
        <InputLabel
          htmlFor="email"
          value={translations.drawer.email}
          className="text-base mb-2"
        />
        <TextInput
          type="email"
          name="email"
          placeholder={translations.drawer.email}
          onChange={(e) => setData('email', e.target.value)}
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {showInfo && (
        <div className="bg-green-200 p-4 rounded-md mt-4 relative w-full flex items-center">
          <h2 className="text-sm flex items-center gap-1">
            <span>
              {' '}
              <InfoIcon className="w-5 h-5 text-green-600 mr-3" />
            </span>
            {translations.drawer.msg}
          </h2>
          <button
            onClick={handleClose}
            className=" text-black hover:text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <h5 className="text-sm font-bold mt-4 mb-2 ">
          {translations.drawer.teamRolesIn}{' '}
          {auth?.selectedCompany?.company_name}
        </h5>
        <div className="relative group ml-2">
          <span className="text-lg cursor-pointer">
            <InfoIcon className="w-5 h-5 text-black-600 mr-3 mt-3" />
          </span>
          <div className="absolute left-0 bottom-8 hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-3 z-10">
            {translations.drawer.toolTip}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="py-2">
          {rolesList?.map((item, index) => (
            <span
              key={index}
              className="p-2 bg-gray-200 rounded-lg mr-2 inline-block mb-2"
              id="rolesList"
            >
              {item?.name}{' '}
              <CloseIcon
                onClick={() => removeSaveRoles(item?.id)}
                className={'text-gray-500 cursor-pointer'}
              />
            </span>
          ))}
        </div>
        {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}

        <CommonButton variant="success" onClick={openModal}>
          <AddIcon className="mr-2" /> {translations.drawer.add}
        </CommonButton>
      </div>

      <h5 className="text-sm font-bold mt-4 mb-4">
        {translations.drawer.sharedRights || 'Shared rights'}
      </h5>
      <div className="flex justify-between items-center">
        <div>
          <p>{translations.drawer.allLocations}</p>
        </div>

        <div className="w-56">
          <select
            className=" bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 border rounded px-4 py-2 w-full mb-0"
            name="rights"
            onChange={handleRoleChange}
          >
            {sharedRightsLocation.map((item: any, index: any) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedRole !== 'Admin' && (
        <div className="flex justify-between items-center border-t-2 mt-4 py-2">
          <div>
            <p>{auth?.selectedCompany?.company_name}</p>
          </div>

          <div>
            <div className="w-56">
              <select
                className=" bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 border rounded px-4 py-2 w-full mb-0"
                name="permission"
              >
                {sharedRights.map((item: any, index: any) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <TeamRolesModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={translations.drawer.teamRoles}
        roles={roles as any}
        selectedRoles={rolesList.map((item) => item.id)}
        onSave={handleSaveRoles}
        translations={translations}
      />

      <div className="flex justify-between mt-6 space-x-2">
        <CommonButton onClick={cancelDrawer} variant="outlined">
          {translations.drawer.cancel}
        </CommonButton>
        <CommonButton variant="success" type="submit" disabled={processing}>
          {translations.drawer.save}
        </CommonButton>
      </div>
    </form>
  );
};
export default UserCreate;
