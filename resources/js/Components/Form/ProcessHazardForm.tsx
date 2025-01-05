import React, { useState } from 'react';
import TextInput from '../TextInput';
import CommonButton from '../CommonButton';
import ProcessAuditModal from '../Modal/ProcessAuditModal';
import ProcessMonitorModal from '../Modal/ProcessMonitorModal';

const ProcessHazardForm = ({
  monitoringTask,
  auditTemplate,
  hazardTypes,
  likelihood,
  severity,
  riskLevels,
  isLikelihoodExpanded,
  isSeverityExpanded,
  setIsSeverityExpanded,
  setIsLikelihoodExpanded,
  data,
  setData,
  processing,
  errors,
  handleSubmit,
  setShowPopup,
}: any) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuditModalOpen, setAuditModalOpen] = useState(false);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');
  const [selectedLikelihood, setSelectedLikelihood] = useState(0);
  const [selectedSeverity, setSelectedSeverity] = useState(0);

  const openAuditModal = () => {
    setAuditModalOpen(true);
  };
  const closeAuditModal = () => {
    setAuditModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const removeMonitoringTask = (id: number) => {
    setData((prevData: any) => ({
      ...prevData,
      monitoring_task_id: prevData.monitoring_task_id.filter(
        (task: any) => task.id !== id
      ),
    }));
  };
  const removeAuditTemplate = (id: number) => {
    setData((prevData: any) => ({
      ...prevData,
      audit_template_id: prevData.audit_template_id.filter(
        (audit: any) => audit.id !== id
      ),
    }));
  };

  const HazardPoint = [
    { level: 1 },
    { level: 2 },
    { level: 3 },
    { level: 4 },
    { level: 5 },
  ];

  const handleRiskLevelSelect = (risk: string) => {
    setSelectedRiskLevel(risk);
    setData((prevData: any) => ({
      ...prevData,
      risk_level: risk,
    }));
  };

  return (
    <div className="space-y-4">
      <form className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Food Hazards</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Potential Hazard:
          </label>
          <TextInput
            name="potential_hazards"
            type="text"
            placeholder="Insert text here"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.potential_hazards}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type of Hazard:
          </label>
          <select
            name="hazards_type"
            value={data.hazards_type}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {hazardTypes.map((type: any, index: any) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="font-semibold mb-4">
            Assess the likelihood and severity
          </h3>
          <div className="flex items-center space-x-4">
            <span>Rare</span>
            <div className="flex space-x-2 relative left-[56px]">
              {HazardPoint.map((item) => (
                <button
                  key={item.level}
                  className={`rounded-full border-2 w-8 h-8 text-center ${selectedLikelihood === item.level ? 'bg-orange-500 text-white border-orange-500' : 'border-gray-300'}`}
                  type="button"
                  onClick={() => {
                    setData((prevData: any) => ({
                      ...prevData,
                      likelihood: item.level,
                    }));
                    setSelectedLikelihood(item.level);
                  }}
                >
                  {item.level}
                </button>
              ))}
            </div>
            <span className="relative left-[58px]">Almost Certain</span>
            <button
              className="mt-2 text-blue-500 relative left-[45px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200"
              onClick={() => setIsLikelihoodExpanded(!isLikelihoodExpanded)}
              type="button"
            >
              <span className="text-blue-500">
                {isLikelihoodExpanded ? '?' : '?'}
              </span>
            </button>
          </div>

          {isLikelihoodExpanded && likelihood && likelihood.scale && (
            <div className="mt-4">
              {likelihood.scale.map((item: any) => (
                <div
                  key={item.level}
                  className="p-2 bg-gray-100 rounded-md mb-2"
                >
                  <strong>
                    {item.level} {item.name}:
                  </strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-4 mt-4">
            <span>Significant</span>
            <div className="flex space-x-2">
              {HazardPoint.map((item) => (
                <button
                  key={item.level}
                  className={`rounded-full border-2 w-8 h-8 text-center ${selectedSeverity === item.level ? 'bg-red-500 text-white border-red-500' : 'border-gray-300'}`}
                  type="button"
                  onClick={() => {
                    setData((prevData: any) => ({
                      ...prevData,
                      severity: item.level,
                    }));
                    setSelectedSeverity(item.level);
                  }}
                >
                  {item.level}
                </button>
              ))}
            </div>
            <span>Catastrophic</span>

            <button
              className="mt-2 text-blue-500 relative left-[45px] flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 transition duration-200"
              onClick={() => setIsSeverityExpanded(!isSeverityExpanded)}
              type="button"
            >
              <span className="text-blue-500">
                {isSeverityExpanded ? '?' : '?'}
              </span>
            </button>
          </div>

          {isSeverityExpanded && severity && severity.scale && (
            <div className="mt-4">
              {severity.scale.map((item: any) => (
                <div
                  key={item.level}
                  className="p-2 bg-gray-100 rounded-md mb-2"
                >
                  <strong>
                    {item.level} {item.name}:
                  </strong>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
        <div className="flex items-center justify-between mb-4">
  <h3 className="font-semibold">Select Risk Level</h3>
  <CommonButton
    onClick={() => setShowPopup(true)}
    type="button"
    variant = "text"
  >
    ? SEE RISK MATRIX
  </CommonButton>
</div>

          <div className="flex space-x-2">
                      {Object.entries(riskLevels).map(([key, value]: [string, any]) => (
                          <CommonButton
                              key={key}
                              onClick={() => handleRiskLevelSelect(key)}
                              className={`
                                border px-4 py-2 rounded bg-gray-100
                                ${key === 'MOD' ? (selectedRiskLevel === key ? 'bg-gray-400 text-black' : 'border-gray-400 text-gray-400') : ''}
                                ${key === 'PRP' ? (selectedRiskLevel === key ? 'bg-green-500 text-black' : 'border-green-500 text-green-500') : ''}
                                ${key === 'CP' ? (selectedRiskLevel === key ? 'bg-yellow-500 text-black' : 'border-yellow-500 text-yellow-500') : ''}
                                ${key === 'OPRP' ? (selectedRiskLevel === key ? 'bg-orange-500 text-black' : 'border-orange-500 text-orange-500') : ''}
                                ${key === 'CCP' ? (selectedRiskLevel === key ? 'bg-red-500 text-black' : 'border-red-500 text-red-500') : ''}
                                `}
                          >
                              {key}
                          </CommonButton>
                      ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Justification for Decision:
          </label>
          <TextInput
            name="justification_decision"
            type="text"
            placeholder="Insert justification"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.justification_decision}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Preventive Measure:
          </label>
          <TextInput
            name="preventive_measure"
            type="text"
            placeholder="Insert preventive measure"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.preventive_measure}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Critical Limit:
          </label>
          <TextInput
            name="critical_limit"
            type="text"
            placeholder="Insert critical limit"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.critical_limit}
            onChange={handleInputChange}
          />
        </div>


        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Monitoring:
          </label>
          <CommonButton
            variant="text"
            className="text-green-600 hover:text-green-700"
            onClick={openModal}
          >
            + ADD
          </CommonButton>
        </div>

        {data.monitoring_task_id && data.monitoring_task_id.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.monitoring_task_id.map((task: any) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <span>{task.name}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeMonitoringTask(task.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}


        <div>
          <label className="block text-sm font-medium text-gray-700">
            Corrective Action:
          </label>
          <TextInput
            name="corrective_action"
            type="text"
            placeholder="Insert corrective action"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.corrective_action}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Verification:
          </label>
          <TextInput
            name="verification"
            type="text"
            placeholder="Insert verification details"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={data.verification}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Audits:
          </label>
          <CommonButton
            variant="text"
            className="text-green-600 hover:text-green-700"
            onClick={openAuditModal}
          >
            + ADD
          </CommonButton>
        </div>

        {data.audit_template_id && data.audit_template_id.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.audit_template_id.map((audit: any) => (
              <div
                key={audit.id}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
              >
                <span>{audit.name}</span>
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeAuditTemplate(audit.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <CommonButton
            type="button"
            variant="success"
            disabled={processing}
            className="mr-2"
            onClick={handleSubmit}
          >
            Save
          </CommonButton>
        </div>
      </form>
      <ProcessAuditModal
        isAuditModalOpen={isAuditModalOpen}
        closeAuditModal={closeAuditModal}
        auditTemplate={auditTemplate}
        data={data}
        setData={setData}
        processing={processing}
        errors={errors}
      />

      <ProcessMonitorModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        monitoringTask={monitoringTask}
        data={data}
        setData={setData}
        processing={processing}
        errors={errors}
      />
    </div>
  );
};

export default ProcessHazardForm;
