import React, { useState } from 'react';
import ProcessHazardForm from './ProcessHazardForm';
import ProcessCreationForm from './ProcessCreationForm';
import Modal from '../Modal/Modal';

const ProcessStepForm = ({
  monitoringTask,
  auditTemplate,
  hazardTypes,
  likelihood,
  severity,
  riskLevels,
  data,
  setData,
  processing,
  errors,
  handleSubmit,
}: any) => {
  const [isLikelihoodExpanded, setIsLikelihoodExpanded] = useState(false);
  const [isSeverityExpanded, setIsSeverityExpanded] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () => {
    if (data.process_name && data.additional_info) {
      setShowNewForm(true);
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="space-y-4">

   {showPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg relative w-[90%] max-w-[1000px] h-[80%] max-h-[800px] overflow-auto">
                      <button
                          onClick={() => setShowPopup(false)}
                          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                      >
                          ✖
                      </button>
                      <h3 className="text-lg font-semibold mb-4">Risk Matrix</h3>
                      <img
                          src="/Matrixmatrix.svg"
                          alt="Risk Matrix"
                          className="w-full h-auto max-h-[400px] object-contain"
                      />
                  </div>
              </div>

      )}

      {showNewForm ? (
        <ProcessHazardForm
          monitoringTask={monitoringTask}
          auditTemplate={auditTemplate}
          hazardTypes={hazardTypes}
          likelihood={likelihood}
          severity={severity}
          riskLevels={riskLevels}
          isLikelihoodExpanded={isLikelihoodExpanded}
          isSeverityExpanded={isSeverityExpanded}
          setIsSeverityExpanded={setIsSeverityExpanded}
          setIsLikelihoodExpanded={setIsLikelihoodExpanded}
          data={data}
          setData={setData}
          processing={processing}
          errors={errors}
          handleSubmit={handleSubmit}
          setShowPopup = {setShowPopup}
        />
      ) : (
        <ProcessCreationForm
          handleAddClick={handleAddClick}
          data={data}
          setData={setData}
          processing={processing}
          errors={errors}
          handleSubmit={handleSubmit}
        />
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>
          Please fill out the process name and additional information before
          adding.
        </p>
      </Modal>
    </div>
  );
};

export default ProcessStepForm;
