import { useState, useEffect } from 'react';
import CommonButton from '../CommonButton';

const ProcessMonitorModal = ({
  monitoringTask,
  closeModal,
  data,
  setData,
  isModalOpen,
}: any) => {
  const [selectedTasks, setSelectedTasks] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    if (data.monitoring_task_id) {
      setSelectedTasks(data.monitoring_task_id);
    } else {
      setSelectedTasks([]);
    }
  }, [data.monitoring_task_id]);

  const handleCheckboxChange = (taskId: number, taskName: string) => {
    setSelectedTasks((prev) =>
      prev.some((task) => task.id === taskId)
        ? prev.filter((task) => task.id !== taskId)
        : [...prev, { id: taskId, name: taskName }]
    );
  };

  const handleSave = () => {
    setData('monitoring_task_id', selectedTasks);
    closeModal();
  };

  return (
    <div className="space-y-4">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Monitor</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div>
              {monitoringTask.map((task: any) => (
                <div key={task.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className="mr-2"
                    checked={selectedTasks.some(
                      (selectedTask) => selectedTask.id === task.id
                    )} // Check if the task is selected
                    onChange={() => handleCheckboxChange(task.id, task.name)} // Handle checkbox change
                  />
                  <label htmlFor={`task-${task.id}`} className="text-gray-700">
                    {task.name || 'Unnamed Task'}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <CommonButton
                variant="outlined"
                className="text-gray-600 mr-2"
                onClick={closeModal}
              >
                Cancel
              </CommonButton>
              <CommonButton variant="success" onClick={handleSave}>
                Save
              </CommonButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessMonitorModal;
