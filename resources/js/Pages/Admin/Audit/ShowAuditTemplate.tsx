import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuditSidebar from '@/Components/Audit/Sidebar';
import AdminUserSidebar from '@/Components/Admin/AdminUserSidebar';

interface Question {
  id: number;
  text: string;
}

export default function ShowAuditTemplate({
  auth,
  template,
  folders,
}: PageProps) {
  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className="text-xl font-semibold">Show Audit Template</h2>}
    >
      <Head title="Show Audit Template" />

      <div className="flex ">
        <AdminUserSidebar folders={folders || []} />
        <div className="flex-1 p-8 bg-white">
          <div className="mb-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-center mb-6">
                {template.name}
              </h1>
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                <div className="text-right pr-4">
                  <label className="text-lg font-medium">Frequency</label>
                </div>
                <div className="text-left">
                  <p className="text-lg">{template.audit_frequency}</p>
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
          <div>
            <h2 className="text-lg font-semibold mb-4">Questions</h2>
            <div className="border border-gray-300 rounded-md divide-y">
              {template.question.map((question: Question) => (
                <div key={question.id} className="p-4">
                  {question.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
