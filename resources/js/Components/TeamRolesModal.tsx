import React, { useEffect } from 'react';
import CommonButton from '@/Components/CommonButton';
import Checkbox from '@/Components/Checkbox';

interface Translations {
  teamRolesModal: {
    saveAndClose: string;
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedRoles: string[]) => void;
  title?: string;
  roles: { id: string; name: string }[];
  selectedRoles?: string[];
  translations?: Translations;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  roles,
  selectedRoles = [],
  translations,
}) => {
  const [selectedRoleIds, setSelectedRoleIds] =
    React.useState<string[]>(selectedRoles);

  const handleRoleChange = (roleId: string) => {
    setSelectedRoleIds((prevSelected) =>
      prevSelected.includes(roleId)
        ? prevSelected.filter((id) => id !== roleId)
        : [...prevSelected, roleId]
    );
  };

  useEffect(() => {
    if (selectedRoles && Object.keys(selectedRoles).length > 0) {
      setSelectedRoleIds(selectedRoles);
    }
  }, [selectedRoles]);

  const onSubmit = () => {
    onSave(selectedRoleIds);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-2.5 md:p-0">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button className="text-gray-500" onClick={onClose}>
            ✖
          </button>
        </div>
        <hr />
        <div>
          <ul className="grid grid-cols-2 gap-3 p-4">
            {(roles as any)?.data.map((role: any) => (
              <li
                key={role.id}
                className="flex items-center p-3 bg-neutral-50 border border-neutral-200 rounded-lg"
              >
                <Checkbox
                  id={`role-${role.id}`}
                  checked={selectedRoleIds.includes(role.id)}
                  onChange={() => handleRoleChange(role.id)}
                  className="h-4 w-4 mr-2 text-orange-400 border-gray-300 rounded !ring-offset-0  focus:ring-transparent"
                />
                <label className="cursor-pointer" htmlFor={`role-${role.id}`}>
                  {role.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-4 p-4 border-t border-neutral-200">
          <CommonButton variant="success" onClick={onSubmit}>
            {translations?.teamRolesModal.saveAndClose}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
