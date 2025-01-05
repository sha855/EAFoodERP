import React from 'react';
import { Link } from '@inertiajs/react';
import { StatusCardProps } from '@/types/feature';

export default function StatusCard({
  title,
  description,
  status,
  link,
}: StatusCardProps) {
  const statusClass =
    status === 'complete'
      ? 'bg-green-100 text-green-500'
      : 'bg-red-100 text-red-500';
  const borderColor =
    status === 'complete' ? 'border-green-500' : 'border-orange-400';

  return (
    <Link href={link} className="block">
      <div
        className={`p-3 md:p-4 lg:p-6 bg-white shadow-sm sm:rounded-lg border-l-4 mb-3 sm:mb-6 ${borderColor}`}
      >
        <div className="flex items-center mb-2 sm:mb-4">
          <h2 className="text-md sm:text-xl font-semibold text-gray-900 mr-4 mb-0">
            {title}
          </h2>
          {status && (
            <p
              className={`font-semibold ${statusClass} px-2 text-xs py-1 bg-gray-200 rounded shadow`}
            >
              {status.toUpperCase()}
            </p>
          )}
        </div>
        <p className="text-gray-600 text-sm sm:text-base ">{description}</p>
      </div>
    </Link>
  );
}
