import CommonButton from '../CommonButton';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationMessage from '../NotificationMessage';
import { usePage } from '@inertiajs/react';

const WorkGroupTaskView = ({
  translations,
  tasks,
  onAddNewTask,
  onDeleteTask,
  handleSubmit,
  data,
  processing,
  notification,
  setNotification,
  checkedData,
  setIsEditing,
  isEditing,
  companyWorkGroup,
}: any) => {
  const url = usePage().props.auth;
  const role = (url as any).roles[0];

  console.log('the data', data);

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
        <div className="flex justify-between items-center p-4 bg-neutral-100 rounded-t-md border-b border-neutral-200">
          <h3 className="text-xl font-bold text-gray-800">
            {translations.workGroup}
          </h3>

          <div className="flex justify-end gap-2">
            <CommonButton
              variant="outlined"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </CommonButton>

            {role !== 'admin' && (
              <CommonButton variant="outlined" href={route('haccp')}>
                Back
              </CommonButton>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 mt-4 mb-5">
            <div>
              <p className="font-semibold">{translations.task}</p>
            </div>
            <div>
              <p className="font-semibold">{translations.responsible}</p>
            </div>
            <div>
              <p className="font-semibold">{translations.serviceProvider}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 justify-between gap-4 mt-2 bg-slate-50 border-2 border-slate-100 mb-3 p-5 rounded-md">
            <div className="col-span-1 flex">
              <span>{translations.overAll}</span>
            </div>
            <div className="col-span-1">
              <span>{data.overallResponsible}</span>
            </div>
          </div>

          {data.tasks.map((taskItem: any, index: any) => (
            <div
              className="grid grid-cols-3 justify-between gap-4 mt-2 bg-slate-50 border-2 border-slate-100 mb-3 p-5 rounded-md"
              key={index}
            >
              <div>
                <span>{taskItem.task}</span>
              </div>

              <div>
                <span>
                  {taskItem.responsible_user?.name || taskItem.responsible}
                </span>
              </div>

              <div className="flex flex-col items-start">
                {taskItem.outsourced_service != 0 && (
                  <span>{taskItem.outsourced_service}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default WorkGroupTaskView;
