import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import CommonButton from '@/Components/CommonButton';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

interface Question {
  id: number;
  text: string;
  selected_score: number;
  comment: string;
}

export default function ShowAudit({
  auth,
  template,
  companyId,
  folders,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Show Audit</h2>}
    >
      <Head title="Show Audit Template" />

      <div className="flex ">
        <AdminUserSidebar folders={folders || []} />
        <div className="h-fit flex-1  bg-white">
          <div className="mb-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-center mb-6">
                {template.name}
              </h1>

              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="text-right pr-4">
                  <label className="text-lg font-medium">Audit date</label>
                </div>
                <div className="text-left">
                  <p className="text-lg">{template.start_date}</p>
                </div>
                <div className="text-right pr-4">
                  <label className="text-lg font-medium">Auditor(s)</label>
                </div>
                <div className="text-left">
                  <p className="text-lg">{template.auditor}</p>
                </div>
                <div className="text-right pr-4">
                  <label className="text-lg font-medium">Auditee(s)</label>
                </div>
                <div className="text-left">
                  <p className="text-lg">{template.auditee}</p>
                </div>
                <div className="text-right pr-4">
                  <label className="text-lg font-medium">Score level</label>
                </div>
                <div className="text-left">
                  <p className="text-lg">{template.score_level}</p>
                </div>
              </div>
            </div>
          </div>
          <CommonButton
            variant="success"
            href={route('admin.audit.template.form.create', {
              template: template.id,
              company: companyId,
            })}
          >
            {' '}
            EDIT
          </CommonButton>
          <div>
            <h2 className="text-lg font-semibold mb-4">Questions</h2>
            <div className="border border-gray-300 rounded-md divide-y">
              {template.question.map((question: Question) => (
                <div key={question.id} className="p-4">
                  <div className="bg-gray-100 p-4 rounded-t-md">
                    <h3 className="text-md font-bold mb-2">{question.text}</h3>
                  </div>
                  <p className="text-lg font-semibold mt-2">
                    {question.selected_score}
                  </p>
                  <div className="mt-2">
                    <label className="block text-md mb-1 font-bold">
                      Comments
                    </label>
                    <p className="text-md">{question.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
