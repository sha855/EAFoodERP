import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import { Add as AddIcon } from '@mui/icons-material';
import { Head, useForm, router } from '@inertiajs/react';
import React, { useState, useRef, useEffect } from 'react';
import TeamRolesModal from '../TeamRolesModal';
import { useAppDispatch } from '@/_hooks/useStore';
import { closeDrawer } from '@/store/slice/stateSlice';
import { RiUpload2Line } from 'react-icons/ri';
import { TargetIcon } from 'lucide-react';

interface Role {
  id: string;
  name: string;
}

interface Certificate {
  training_name: string;
  certificate_file: string;
}

interface EditData {
  id?: string;
  first_last_name?: string;
  position?: string;
  personal_identification_code?: string;
  phone_number?: string;
  roles?: string[];
  certificates_and_trainings?: {
    certificate_file?: string;
    certificate_issue_on?: string;
    certificate_valid_until?: string;
  }[];
}

interface Translations {
  assignToTeamRoles: string;
  add: string;
  uploadDocument: string;
  issuedOn: string;
  validUntil: string;
  cancel: string;
  save: string;
  teamRolesModal: {
    teamRoles: string;
    saveAndClose: string;
  };
}

interface CreateTeamProps {
  roles: Role[];
  editData: EditData;
  certificatesAndTrainings: Certificate[];
  translations: Translations;
  companyId: number;
}

interface TeamCertificate {
  training_id: string;
  certificate_file: null | any;
  certificate_issue_on: string;
  certificate_valid_until: string;
}

interface TeamData {
  first_last_name: string;
  position: string;
  personal_identification_code: string;
  phone_number: string;
  team_certificates: TeamCertificate[];
  team_roles: string[];
  company_id: number;
}

const CreateTeam = ({
  roles,
  editData,
  companyId,
  certificatesAndTrainings,
  translations,
}: CreateTeamProps) => {
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const [editDataModal, setEditDataModal] = useState<any>(null);
  const { data, setData, post, processing, errors } = useForm<TeamData>({
    first_last_name: '',
    position: '',
    personal_identification_code: '',
    phone_number: '',
    company_id: companyId || 0,
    team_certificates: (certificatesAndTrainings as any).data.map(
      (certificate: any) => ({
        training_id: certificate.id || 0,
        certificate_file: null,
        certificate_issue_on: '',
        certificate_valid_until: '',
      })
    ),
    team_roles: [],
  });

  const fileInputRefCertificate = useRef<HTMLInputElement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleInputChange = (index: number, field: string, value: string) => {
    setData(
      'team_certificates',
      data.team_certificates.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      )
    );
  };

  const rolesListRef = useRef<HTMLSpanElement>(null);

  const handleSaveRoles = (selectedRoles: string[]) => {
    setData('team_roles', selectedRoles);
    if (rolesListRef.current) {
      rolesListRef.current.innerHTML = '';

      (roles as any).data
        .filter((role: any) => selectedRoles.includes(role.id))
        .forEach((role: any) => {
          const roleSpan = document.createElement('span');
          roleSpan.style.display = 'inline-flex';
          roleSpan.style.alignItems = 'center';
          roleSpan.style.marginRight = '8px';
          roleSpan.style.backgroundColor =
            'rgb(229 231 235 / var(--tw-bg-opacity))';
          roleSpan.style.padding = '8px';
          roleSpan.style.marginBottom = '8px';
          roleSpan.style.borderRadius = '10px';
          roleSpan.innerText = ' ' + role.name;

          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = '✖';
          deleteButton.style.marginLeft = '4px';
          deleteButton.style.backgroundColor = 'transparent';
          deleteButton.style.border = 'none';
          deleteButton.style.cursor = 'pointer';

          deleteButton.onclick = () => {
            const updatedRoles = selectedRoles.filter((id) => id !== role.id);
            setData('team_roles', updatedRoles);
            setSelectedRoleIds(updatedRoles);
            handleSaveRoles(updatedRoles);
          };

          roleSpan.appendChild(deleteButton);
          rolesListRef.current!.appendChild(roleSpan);
        });
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length > 0) {
      setEditDataModal(editData);
      setData({
        company_id: data.company_id || 0,
        first_last_name: editData.first_last_name || '',
        position: editData.position || '',
        personal_identification_code:
          editData.personal_identification_code || '',
        phone_number: editData.phone_number || '',
        team_certificates: (certificatesAndTrainings as any).data.map(
          (certificate: any, index: any) => {
            const trainingData = editData['certificates_and_trainings']
              ? editData['certificates_and_trainings'][index]
              : null;
            return {
              training_id: certificate.id || 0,
              certificate_file: trainingData
                ? trainingData['certificate_file'] || ''
                : '',
              certificate_issue_on:
                trainingData && trainingData['certificate_issue_on']
                  ? formatDate(trainingData['certificate_issue_on'])
                  : '',
              certificate_valid_until:
                trainingData && trainingData['certificate_valid_until']
                  ? formatDate(trainingData['certificate_valid_until'])
                  : '',
            };
          }
        ),
        team_roles: editData.roles || [],
      });
    }
  }, [editData, certificatesAndTrainings]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const route = editData?.id ? `/team/edit/${editData.id}` : '/team/store';
    post(route, {
      onSuccess: () => {
        dispatch(closeDrawer());
      },
    });
  };

  const handleFileInputChange = (index: number, event: any) => {
    const file = event.target.files[0];
    if (file) {
      setData(
        'team_certificates',
        data.team_certificates.map((cert, i) =>
          i === index ? { ...cert, certificate_file: file } : cert
        )
      );
    }
  };

  const cancelDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleRemoveRole = (roleId: number) => {
    const updatedRoles: string[] =
      editData?.roles?.filter((id: any) => id !== roleId) || [];
    setData('team_roles', updatedRoles);
    setSelectedRoleIds(updatedRoles);
    handleSaveRoles(updatedRoles);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          name="first_last_name"
          value={data.first_last_name}
          onChange={(e) => setData('first_last_name', e.target.value)}
          placeholder="First name Last name"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.first_last_name && (
          <p className="text-red-500 text-sm">{errors.first_last_name}</p>
        )}
        <TextInput
          type="text"
          name="position"
          value={data.position}
          onChange={(e) => setData('position', e.target.value)}
          placeholder="Position"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.position && (
          <p className="text-red-500 text-sm">{errors.position}</p>
        )}

        <div className="my-4">
          <label className="block text-sm font-medium mb-2">
            {translations.assignToTeamRoles}
          </label>
          <p>
            <span ref={rolesListRef}>
              {editData?.roles &&
                (roles as any).data
                  .filter((role: any) => editData.roles?.includes(role.id))
                  .map((role: any) => (
                    <span
                      key={role.id}
                      className="role-button"
                      onClick={() => handleRemoveRole(role.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        marginRight: '8px',
                        backgroundColor:
                          'rgb(229 231 235 / var(--tw-bg-opacity))',
                        padding: '8px',
                        marginBottom: '8px',
                        borderRadius: '10px',
                      }}
                    >
                      {role.name}{' '}
                      <span
                        style={{
                          marginLeft: '4px',
                          backgroundColor: 'backgroundColor',
                          cursor: 'pointer',
                          border: 'none',
                        }}
                      >
                        ✖
                      </span>
                    </span>
                  ))}
            </span>
          </p>
          <CommonButton variant="success" onClick={openModal} className="mb-2">
            <AddIcon /> {translations.add}
          </CommonButton>
        </div>

        <TeamRolesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={translations.teamRolesModal.teamRoles}
          roles={roles}
          selectedRoles={data.team_roles}
          onSave={handleSaveRoles}
          translations={translations as any}
        />

        {errors.team_roles && (
          <p className="text-red-500 text-sm">{errors.team_roles}</p>
        )}
        <TextInput
          type="text"
          name="personal_identification_code"
          value={data.personal_identification_code}
          onChange={(e) =>
            setData('personal_identification_code', e.target.value)
          }
          placeholder="Personal identification code"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.personal_identification_code && (
          <p className="text-red-500 text-sm">
            {errors.personal_identification_code}
          </p>
        )}
        <TextInput
          type="text"
          name="phone_number"
          value={data.phone_number}
          onChange={(e) => setData('phone_number', e.target.value)}
          placeholder="Phone number"
          className="border rounded px-4 py-2 w-full mb-3"
        />
        {errors.phone_number && (
          <p className="text-red-500 text-sm">{errors.phone_number}</p>
        )}
        {(certificatesAndTrainings as any).data.map(
          (certificate: any, index: any) => (
            <div
              key={index}
              id={`certificate_${index}`}
              className="border p-3 rounded border-gray-200 mt-4 bg-slate-100"
            >
              <h3 className="text-lg font-semibold  mb-2">
                {certificate.training_name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                {certificate.frequency}
              </p>

              <input
                ref={(el: any) => (fileInputRefCertificate.current[index] = el)}
                type="file"
                name={`certificate_file_${index}`}
                style={{ display: 'none' }}
                onChange={(e) => handleFileInputChange(index, e)}
              />
              <p>
                <span id={`name_certificate_${index}`}>
                  {data.team_certificates[index]?.certificate_file?.name
                    ? data.team_certificates[index].certificate_file.name
                        .length > 10
                      ? `${data.team_certificates[index].certificate_file.name.substring(0, 10)}...`
                      : data.team_certificates[index].certificate_file.name
                    : data.team_certificates[index].certificate_file
                      ? data.team_certificates[
                          index
                        ].certificate_file.substring(
                          data.team_certificates[
                            index
                          ].certificate_file.lastIndexOf('/') + 1
                        ).length > 10
                        ? `${data.team_certificates[index].certificate_file.substring(data.team_certificates[index].certificate_file.lastIndexOf('/') + 1, data.team_certificates[index].certificate_file.lastIndexOf('/') + 11)}...`
                        : data.team_certificates[
                            index
                          ].certificate_file.substring(
                            data.team_certificates[
                              index
                            ].certificate_file.lastIndexOf('/') + 1
                          )
                      : ''}
                </span>
              </p>

              <div className="flex items-center gap-2 p-3 border bg-white rounded-md my-3">
                <RiUpload2Line />

                <CommonButton
                  variant="text"
                  className="!p-0 !text-black !text-sm"
                  onClick={() =>
                    fileInputRefCertificate.current[index]?.click()
                  }
                >
                  {translations.uploadDocument}
                </CommonButton>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.issuedOn}
                  </label>
                  <TextInput
                    type="date"
                    name={`certificate_issue_on_${index}`}
                    placeholder="Issued on"
                    value={data.team_certificates[index].certificate_issue_on}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        'certificate_issue_on',
                        e.target.value
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translations.validUntil}
                  </label>
                  <TextInput
                    type="date"
                    name={`certificate_valid_until_${index}`}
                    placeholder="Valid until"
                    value={
                      data.team_certificates[index].certificate_valid_until
                    }
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        'certificate_valid_until',
                        e.target.value
                      )
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                  />
                </div>
              </div>
            </div>
          )
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

export default CreateTeam;
