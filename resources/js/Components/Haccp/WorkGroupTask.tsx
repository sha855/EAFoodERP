import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaPlus } from 'react-icons/fa6';
import NotificationMessage from '../NotificationMessage';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useState } from 'react';
import CommonSelectSearch from '../CommonSelectSearch';
import Modal from '../Modal/Modal';
import axios, { AxiosResponse, AxiosError } from 'axios';
interface User {
  value: string;
  label: string;
}

const WorkGroupTask = ({
  translations,
  tasks,
  onTaskChange,
  onResponsibleChange,
  onOutsourcedChange,
  onOutsourcedDetailsChange,
  onAddNewTask,
  onDeleteTask,
  handleSubmit,
  data,
  setData,
  processing,
  notification,
  setNotification,
  handleSameResponsibleChange,
  handleOverallResponsibleChange,
  checkedData,
  setIsEditing,
  isEditing,
  errors,
  users,
  workGroupUser,
  responsible,
}: any) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState<User[]>([
    { value: '', label: '' },
  ]);
  const url = usePage().props.auth;
  const role = (url as any).roles[0];
  const [usersData, setUsersData] = useState([]);
  const formatErrorMessage = (errorKey: String) => {
    return errorKey.replace(/tasks\.\d+\./, '').replace(/_/g, ' ');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleUserChange = (selectedOption: any) => {
    setSearchValue(selectedOption);
  };

  useEffect(() => {
    const formattedUsers = users.map((user: any) => ({
      value: user.id,
      label: user.name,
    }));

    const selectedUsers = workGroupUser.map((wgUser: any) => ({
      value: wgUser.user_id,
      label: wgUser.user.name,
    }));

    setUsersData(formattedUsers);
    setSearchValue(selectedUsers);
  }, [users, workGroupUser]);

  const handleSave = async (): Promise<void> => {
    if (searchValue) {
      const response: AxiosResponse<{ message: string }> = await axios.post(
        route('admin.reponsible.user'),
        {
          users: searchValue.map((user) => user.value),
        }
      );
      toggleModal();
    } else {
      setShowModal(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {notification && (
        <NotificationMessage
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="w-full bg-white p-0 shadow rounded-md">
        <div className="flex flex-wrap justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
          <h3 className="text-xl mb-4 md:mb-0 font-bold text-gray-800">
            {translations.workGroup}
          </h3>

          <div className="flex justify-end gap-2">
            <CommonButton
              variant="outlined"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </CommonButton>
            {role !== 'admin' ? (
              <CommonButton variant="outlined" href={route('haccp')}>
                Back
              </CommonButton>
            ) : (
              <CommonButton variant="outlined" onClick={toggleModal}>
                Responsible Users
              </CommonButton>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-3 gap-4 items-center mt-4 mb-5 pb-8 border-b-2 border-slate-200">
            <div className="col-span-1 flex">
              <label className="text-sm">{translations.overAll}</label>
            </div>
            <div className="col-span-1">
              <TextInput
                type="text"
                value={data.overallResponsible}
                className="w-full border rounded p-2"
                placeholder="Overall responsible person for food safety plan *"
                onChange={(e) => handleOverallResponsibleChange(e.target.value)}
                readOnly
              />
            </div>
            <div>
              <TextInput
                type="checkbox"
                className="mr-2 !w-5"
                checked={responsible}
                onChange={(e) => handleSameResponsibleChange(e.target.checked)}
              />
              <label className="text-sm">
                {translations.personResponsible}
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4 mb-5">
            <div>
              <p className="font-semibold">{translations.task}</p>
            </div>
            <div>
              <p className="font-semibold">{translations.responsible}</p>
            </div>
            <div>
              <p className="font-semibold">
                {translations.serviceProvider} (the service provider is another
                company)
              </p>
            </div>
          </div>

          {tasks.map((taskItem: any, index: any) => (
            <div
              className="md:grid md:grid-cols-3 justify-between gap-4 mt-2 bg-slate-50 border-2 border-slate-100 mb-3 p-3 rounded-md"
              key={index}
            >
              <div className="mb-3 md:mb-0">
                <TextInput
                  type="text"
                  className="w-full border rounded p-2 bg-white"
                  placeholder="Task"
                  value={taskItem.task}
                  onChange={(e) => onTaskChange(index, e.target.value)}
                />
                {errors[`tasks.${index}.task`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`tasks.${index}.task`]}
                  </p>
                )}
              </div>
              <div>
                <select
                  id="responsible"
                  name="responsible"
                  value={taskItem.responsible}
                  onChange={(e) => onResponsibleChange(index, e.target.value)}
                  className="w-full border rounded p-2 bg-white bg-slate-100 text-slate-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200 "
                >
                  <option value="">Select Responsible Person</option>
                  {usersData.map((user: User) => (
                    <option key={user.value} value={user.value}>
                      {user.label}
                    </option>
                  ))}
                </select>
                {errors[`tasks.${index}.responsible`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formatErrorMessage(errors[`tasks.${index}.responsible`])}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start">
                {taskItem.is_service_provider && (
                  <>
                    <TextInput
                      type="text"
                      className="w-full border rounded p-2 bg-white"
                      placeholder="Enter outsourced service details"
                      value={taskItem.outsourced_service}
                      onChange={(e) =>
                        onOutsourcedDetailsChange(index, e.target.value)
                      }
                    />
                    {errors[`tasks.${index}.outsourced_service`] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[`tasks.${index}.outsourced_service`]}
                      </p>
                    )}
                  </>
                )}

                <div className="flex justify-between items-center p-2 w-full">
                  <div className="flex items-center">
                    <TextInput
                      type="checkbox"
                      className="mr-2 !w-5 !text-orange-400"
                      checked={taskItem.is_service_provider}
                      onChange={() => onOutsourcedChange(index)}
                    />
                    <label className="text-sm">{translations.outsourced}</label>
                  </div>

                  <div className="flex justify-end">
                    <div className="w-10 h-10 bg-red-200 flex justify-center items-center rounded-md">
                      <DeleteIcon
                        className="cursor-pointer text-red-500"
                        onClick={() => onDeleteTask(index, taskItem)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                Select Responsible Users
              </h2>
              <CommonSelectSearch
                options={usersData}
                value={searchValue}
                onChange={handleUserChange}
                placeholder="Search for a user..."
                isMulti={true}
              />
              <div className="mt-6 flex justify-end space-x-4">
                <CommonButton variant="success" onClick={handleSave}>
                  Save
                </CommonButton>
                <CommonButton onClick={toggleModal} variant="outlined">
                  Close
                </CommonButton>
              </div>
            </div>
          </div>
        )}

        <div className="py-6 px-6 flex justify-between border-t border-slate-200 bg-slate-100 rounded-b-md">
          <div className="flex justify-right">
            <CommonButton
              variant="success"
              type="button"
              onClick={onAddNewTask}
              className="flex items-center justify-center gap-2"
            >
              <FaPlus />
              Add New
            </CommonButton>
          </div>
          <div className="flex justify-end space-x-4">
            <CommonButton variant="success" type="submit" disabled={processing}>
              Save
            </CommonButton>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkGroupTask;
