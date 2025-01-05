import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import CommonButton from '@/Components/CommonButton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TextInput from '@/Components/TextInput';
import NotificationMessage from '@/Components/NotificationMessage';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

export default function TemplateEdit({
  auth,
  template,
  auditFrequencies,
  frequencies,
  companyId,
  folders,
}: PageProps) {
  const { data, setData, put, processing, errors } = useForm({
    name: template.name || '',
    audit_frequency: template.audit_frequency || '',
    score_level: template.score_level || '',
    start_date: template.start_date || '',
    question: Array.isArray(template.question) ? template.question : [],
    companyId: companyId,
  });
  const [selectedOption, setSelectedOption] = useState<string>(
    template.score_level || ''
  );
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const addQuestion = () => {
    setData('question', [
      ...data.question,
      { id: data.question.length + 1, text: '', language: 'EN' },
    ]);
  };

  const handleSelectChange = (event: any) => {
    setData('score_level', event.target.value);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleQuestionChange = (id: number, field: string, value: string) => {
    setData(
      'question',
      data.question.map((q: any) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const getMessage = () => {
    switch (selectedOption) {
      case 'yes/no':
        return 'This option represents a binary choice: yes or no.';
      case '0,1,2':
        return '0 = Incorrect, 1 = Partly correct, 2 = Correct';
      case '1,2,3,4,5':
        return '1 = Very dissatisfied, 2 = Dissatisfied, 3 = Average, 4 = Satisfied, 5 = Very satisfied';
      default:
        return 'Please select a score level to see details.';
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    put(route('admin.template.update', { template: template.id }), {
      onSuccess: () => {
        setNotification({
          message: 'Template updated successfully!',
          type: 'success',
        });
      },
      onError: () => {
        setNotification({ message: 'Something went wrong', type: 'error' });
      },
    });
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Audit Template</h2>}
    >
      <Head title="Audit Template" />

      <div className="flex ">
        <AdminUserSidebar folders={folders || []} />
        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg !h-fit">
          <h1 className="text-xl font-bold mb-6">Edit Audit Template</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <TextInput
                type="text"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter audit name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Audit Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audit frequency
              </label>
              <select
                name="audit_frequency"
                value={data.audit_frequency}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select frequency</option>
                {auditFrequencies.map((audit_freq: any) => (
                  <option key={audit_freq.value} value={audit_freq.value}>
                    {audit_freq.label}
                  </option>
                ))}
              </select>
              {errors.audit_frequency && (
                <p className="text-red-500 text-sm">{errors.audit_frequency}</p>
              )}
            </div>

            {/* Score Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Score level
              </label>
              <select
                name="score_level"
                onChange={handleSelectChange}
                value={selectedOption}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select score level
                </option>
                {frequencies.map((frequencie: any) => (
                  <option key={frequencie.value} value={frequencie.value}>
                    {frequencie.value}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">{getMessage()}</p>
              {errors.score_level && (
                <p className="text-red-500 text-sm">{errors.score_level}</p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start date
              </label>
              <TextInput
                type="date"
                name="start_date"
                value={data.start_date}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm">{errors.start_date}</p>
              )}
            </div>

            {/* Questions Section */}
            <div className="max-h-64 overflow-y-auto">
              {data.question.map((q: any) => (
                <div key={q.id} className="mt-2 flex items-center space-x-2">
                  <div className="flex-1">
                    <TextInput
                      type="text"
                      value={q.text}
                      onChange={(e) =>
                        handleQuestionChange(q.id, 'text', e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="New question"
                    />
                    {/* {errors[`question.${data.question.findIndex(item => item.id === q.id)}.text`] && (
                                            <p className="text-red-500 text-sm">
                                               Question is Required
                                            </p>
                                        )} */}
                  </div>
                  <select
                    value={q.language}
                    onChange={(e) =>
                      handleQuestionChange(q.id, 'language', e.target.value)
                    }
                    className="rounded-md border-gray-300 shadow-sm"
                  >
                    <option>EN</option>
                    <option>ET</option>
                    <option>RU</option>
                    <option>UKR</option>
                    <option>DE</option>
                    <option>ES</option>
                  </select>
                  <button
                    type="button"
                    onClick={() =>
                      setData(
                        'question',
                        data.question.filter((quest: any) => quest.id !== q.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
              {errors.question && (
                <p className="text-red-500 text-sm">{errors.question}</p>
              )}
              <CommonButton
                variant="outlined"
                className="mt-4"
                onClick={addQuestion}
              >
                New Question
              </CommonButton>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <CommonButton
                type="submit"
                variant="success"
                disabled={processing}
              >
                Save
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
