import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import CommonButton from '@/Components/CommonButton';
import { useState } from 'react';
import TextInput from '@/Components/TextInput';
import NotificationMessage from '@/Components/NotificationMessage';
import { FaPlus } from 'react-icons/fa6';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

interface QuestionError {
  text?: string;
}

interface Errors {
  name?: string;
  audit_frequency?: string;
  score_level?: string;
  start_date?: string;
  question?: QuestionError[];
}

export default function CreateTemplate({
  auth,
  auditFrequencies,
  frequencies,
  companyId,
  folders,
}: PageProps) {
  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    audit_frequency: string;
    score_level: string;
    start_date: string;
    company_id: number;
    question: { id: number; text: any; language: string }[];
  }>({
    name: '',
    audit_frequency: '',
    score_level: '',
    start_date: '',
    company_id: companyId,
    question: [{ id: 1, text: '', language: 'EN' }],
  });

  const [selectedOption, setSelectedOption] = useState('');
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
    setSelectedOption(event.target.value);
    setData('score_level', event.target.value);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleQuestionChange = (id: number, field: string, value: string) => {
    setData(
      'question',
      data.question.map((q) => (q.id === id ? { ...q, [field]: value } : q))
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
    post(route('admin.template.store'), {
      onSuccess: () => {
        setNotification({
          message: 'Template created successfully!',
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
      <Head title="Create Audit Template" />

      <div className="flex ">
        <AdminUserSidebar folders={folders || []} />
        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1  bg-white shadow-lg rounded-lg !h-fit">
          <div className="flex justify-between items-center p-4 bg-neutral-100	rounded-t-md border-b border-neutral-200">
            <h1 className="text-xl font-bold mb-0 ">Create Audit Template</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-8 py-6 space-y-3">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Audit frequency
                </label>
                <select
                  name="audit_frequency"
                  value={data.audit_frequency}
                  onChange={handleInputChange}
                  className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 p-2.5 border-gray-300 focus:!ring-transparent focus:!border-gray-300 "
                >
                  <option value="">Select frequency</option>
                  {auditFrequencies.map((audit_freq: any) => (
                    <option key={audit_freq.value} value={audit_freq.value}>
                      {audit_freq.label}
                    </option>
                  ))}
                </select>
                {errors.audit_frequency && (
                  <p className="text-red-500 text-sm">
                    {errors.audit_frequency}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score level
                </label>
                <select
                  name="score_level"
                  onChange={handleSelectChange}
                  value={selectedOption}
                  className="rounded-md shadow-sm w-full bg-slate-100 text-slate-400 border-gray-300 p-2.5 focus:!ring-transparent focus:!border-gray-300 "
                >
                  <option value="" disabled>
                    Select score level
                  </option>
                  {frequencies.map((freq: any) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">{getMessage()}</p>
                {errors.score_level && (
                  <p className="text-red-500 text-sm">{errors.score_level}</p>
                )}
              </div>

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

              <div className="max-h-64 overflow-y-auto ">
                {data.question.map((q, index) => (
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
                    </div>
                    <select
                      value={q.language}
                      onChange={(e) =>
                        handleQuestionChange(q.id, 'language', e.target.value)
                      }
                      className="rounded-md bg-slate-100 border-gray-300 focus:!ring-transparent focus:!border-gray-300 shadow-sm"
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
                          data.question.filter((quest) => quest.id !== q.id)
                        )
                      }
                      className="text-red-500 hover:text-red-700 focus:outline-none w-10 h-10 rounded-md text-red bg-red-200"
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
                  className="px-6 py-2.5 rounded border-solid border-2 border-orange-400 hover:bg-orange-100 mt-4 flex items-center gap-3"
                  onClick={addQuestion}
                >
                  <FaPlus />
                  New Question
                </CommonButton>
              </div>
            </div>

            <div className="px-8 py-6 border-t">
              <div className="flex justify-end">
                <CommonButton
                  type="submit"
                  variant="success"
                  disabled={processing}
                >
                  Save
                </CommonButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
