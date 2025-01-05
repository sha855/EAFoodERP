import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import TextInput from '@/Components/TextInput';
import CommonButton from '@/Components/CommonButton';
import NotificationMessage from '@/Components/NotificationMessage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertBox from '@/Components/AlertBox';

interface Question {
  id: number;
  text: string;
  language?: string;
  comment?: string;
  selected_score?: string;
}

interface Template {
  id: number;
  name: string;
  start_date: string;
  auditor: string;
  auditee: string;
  audit_frequency: string;
  score_level: string;
  question: Question[];
}

interface AuditTemplateCreateProps extends PageProps {
  template: Template;
}

export default function AuditTemplateCreate({
  auth,
  template,
  companyId,
}: AuditTemplateCreateProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    id: template.id || '',
    name: template.name || '',
    start_date: template.start_date || '',
    auditor: template.auditor || auth.user.name,
    auditee: template.auditee || '',
    audit_frequency: template.audit_frequency || '',
    score_level: template.score_level || '',
    company_id: companyId,
    questions:
      template.question.map((q) => ({
        id: q.id,
        text: q.text,
        language: q.language,
        comment: q.comment || '',
        selected_score: q.selected_score || '',
      })) || [],
  });
  const [showAlert, setShowAlert] = useState(false);
  const [questionData, setQuestionData] = useState<{
    [key: number]: { comment: string; selected_score: string };
  }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuestionChange = (
    id: number,
    field: 'comment' | 'selected_score',
    value: string
  ) => {
    setQuestionData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedQuestions = data.questions.map((question: Question) => ({
      ...question,
      comment: questionData[question.id]?.comment || '',
      selected_score: questionData[question.id]?.selected_score || '',
    }));

    post(route('audit.template.detail.update', { id: template.id }), {
      data: {
        ...data,
        questions: updatedQuestions, // Include updated questions
      },
    });
  };

  const getMessage = (scoreLevel: string) => {
    switch (scoreLevel) {
      case 'yes/no':
        return 'yes or no.';
      case '0,1,2':
        return '0 = Incorrect, 1 = Partly correct, 2 = Correct, Not Valuated';
      case '1,2,3,4,5':
        return '1 = Very dissatisfied, 2 = Dissatisfied, 3 = Average, 4 = Satisfied, 5 = Very satisfied, Not Valuated';
      default:
        return 'Please select a score level to see details.';
    }
  };

  useEffect(() => {
    // Sync question data with main form data
    const updatedQuestions = data.questions.map((question) => ({
      ...question,
      comment: questionData[question.id]?.comment || '',
      selected_score: questionData[question.id]?.selected_score || '',
    }));
    setData((prevData) => ({
      ...prevData,
      questions: updatedQuestions,
    }));
  }, [questionData]); // Trigger when questionData changes

  const hasValidQuestions = () => {
    return Object.values(questionData).some(
      (q) => q.selected_score.trim() !== '' || q.comment.trim() !== ''
    );
  };

  const handleConfirmAudit = () => {
    if (!hasValidQuestions()) {
      setShowAlert(true);
      return;
    }
    router.visit(route('audit.show', { template: data.id }));
  };

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Audit Template</h2>}
    >
      <Head title="Audit Template" />

      <div className="flex ">
        <AuditSidebar />

        {notification && (
          <NotificationMessage
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex-1 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto overflow-y-auto max-h-[100vh]">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-6">
              {template.name}
            </h1>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-4">
                  Audit date
                </label>
                <TextInput
                  type="date"
                  name="start_date"
                  value={data.start_date}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm">{errors.start_date}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-4">
                  Auditor(s)
                </label>
                <TextInput
                  type="text"
                  name="auditor"
                  value={data.auditor}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                />

                {errors.auditor && (
                  <p className="text-red-500 text-sm">{errors.auditor}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-4">
                  Auditee(s)
                </label>
                <TextInput
                  type="text"
                  name="auditee"
                  value={data.auditee}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                />
                {errors.auditee && (
                  <p className="text-red-500 text-sm">{errors.auditee}</p>
                )}
              </div>
              <div className="flex items-center">
                <label className="text-lg font-medium w-1/3 text-right pr-4">
                  Score level
                </label>
                <TextInput
                  type="text"
                  name="score_level"
                  value={data.score_level}
                  onChange={handleInputChange}
                  readOnly
                  className="border border-gray-300 rounded-md px-4 py-2 w-1/3"
                />
              </div>

              <div className="mt-2 flex items-center justify-center">
                <p className="text-sm text-gray-500">
                  {getMessage(data.score_level)}
                </p>
              </div>
            </div>
          </div>
          {data.questions.map((question: Question, index: number) => (
            <div key={question.id} className="border-t border-gray-300 py-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{question.text}</h3>
              </div>

              {/* Score options */}
              <div className="flex justify-center space-x-6">
                {data.score_level
                  .trim()
                  .split(',')
                  .map((option: string) => (
                    <div key={option} className="flex items-center space-x-2">
                      <label className="text-lg font-medium">{option}</label>
                      <TextInput
                        type="radio"
                        name={`score_${question.id}`}
                        value={option}
                        checked={
                          questionData[question.id]?.selected_score === option
                        }
                        onChange={() =>
                          handleQuestionChange(
                            question.id,
                            'selected_score',
                            option
                          )
                        }
                        className="form-radio"
                      />
                    </div>
                  ))}

                {errors[
                  `questions.${index}.selected_score` as keyof typeof errors
                ] && (
                  <p className="text-red-500 text-sm">
                    Selecting Score is require
                  </p>
                )}
              </div>

              {/* Comment input */}
              <div className="mt-6">
                <label className="block text-md font-medium mb-2">
                  Comments
                </label>
                <textarea
                  value={questionData[question.id]?.comment || ''}
                  onChange={(e) =>
                    handleQuestionChange(question.id, 'comment', e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />

                {errors[
                  `questions.${index}.comment` as keyof typeof errors
                ] && (
                  <p className="text-red-500 text-sm">Comment is required</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <CommonButton variant="outlined" onClick={handleConfirmAudit}>
              Confirm Audit
            </CommonButton>
            <CommonButton
              type="submit"
              variant="success"
              onClick={handleSubmit}
              disabled={processing}
            >
              Save Template
            </CommonButton>
          </div>

          {showAlert && (
            <AlertBox
              message="Please save the template first."
              onCancel={() => setShowAlert(false)}
            />
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
