import React from 'react';
import CommonButton from '@/Components/CommonButton';
import { router, usePage } from '@inertiajs/react';

interface SelectAuditTemplatePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (selectedTemplate: string) => void;
  data: { id: string; name: string }[];
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  handleSelect: () => void;
  companyId?: Number;
}

export default function SelectAuditTemplatePopup({
  isOpen,
  companyId,
  selectedTemplate,
  setSelectedTemplate,
  onClose,
  data,
  handleSelect,
}: SelectAuditTemplatePopupProps) {
  if (!isOpen) return null;
  const auth: any = usePage().props.auth;
  const isAdmin = auth.roles?.includes('admin');

  const routes = isAdmin
    ? route('admin.template.create', { company: companyId })
    : route('template.create');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold mb-0">Select Audit Template</h2>
        </div>

        <div className="p-6">
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          >
            <option value="">Select a template</option>
            {data.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>

          <div className="mb-4">
            <span className="text-gray-600">
              Couldn't find the audit template?{' '}
            </span>
            <CommonButton className="ml-2" variant="text" href={routes}>
              Create new
            </CommonButton>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200">
          <div className="flex justify-end gap-4">
            <CommonButton
              variant="success"
              onClick={handleSelect}
              className="!py-2"
            >
              Next
            </CommonButton>
            <CommonButton
              variant="outlined"
              onClick={onClose}
              className="!py-2"
            >
              Cancel
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
