import CommonButton from '../CommonButton';
import { useState, useEffect } from 'react';

const ProcessAuditModal = ({
  auditTemplate,
  isAuditModalOpen,
  closeAuditModal,
  data,
  setData,
  processing,
  error,
}: any) => {
  const [selectedAuditTasks, setSelectedAuditTasks] = useState<
    { id: number; name: string }[]
  >([]);
  useEffect(() => {
    if (data.audit_template_id) {
      setSelectedAuditTasks(data.audit_template_id);
    } else {
      setSelectedAuditTasks([]);
    }
  }, [data.audit_template_id]);

  const handleAuditCheckboxChange = (taskId: number, taskName: string) => {
    setSelectedAuditTasks((prev) =>
      prev.some((task) => task.id === taskId)
        ? prev.filter((task) => task.id !== taskId)
        : [...prev, { id: taskId, name: taskName }]
    );
  };

  const handleSave = () => {
    setData('audit_template_id', selectedAuditTasks);
    closeAuditModal();
  };

  return (
    <div className="space-y-4">
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Audit</h2>
              <button
                onClick={closeAuditModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <div>
              {auditTemplate.map((task: any) => (
                <div key={task.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className="mr-2"
                    checked={selectedAuditTasks.some(
                      (selectedTask) => selectedTask.id === task.id
                    )} // Check if task is selected
                    onChange={() =>
                      handleAuditCheckboxChange(task.id, task.name)
                    } // Pass both id and name
                  />
                  <label htmlFor={`task-${task.id}`} className="text-gray-700">
                    {task.name || 'Unnamed Audit'}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <CommonButton
                variant="outlined"
                className="text-gray-600 mr-2"
                onClick={closeAuditModal}
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

export default ProcessAuditModal;
