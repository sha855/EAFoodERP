import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const MultipleAnswer: React.FC = () => {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-medium">
        Field title
      </label>
      <div className="bg-slate-100 text-slate-400  mt-1 !p-1.5 border-0  rounded w-full">
        <span className="inline-flex items-center text-xs bg-slate-300 px-1.5 py-1 text-slate-500 rounded-full mb-1 mr-1">
          Name 1 <IoCloseOutline className="cursor-pointer" />
        </span>
        <span className="inline-flex items-center text-xs bg-slate-300 px-1.5 py-1 text-slate-500 rounded-full mb-1 mr-1">
          Name 2 <IoCloseOutline className="cursor-pointer" />
        </span>
        <span className="inline-flex items-center text-xs bg-slate-300 px-1.5 py-1 text-slate-500 rounded-full mb-1 mr-1">
          Name 3 <IoCloseOutline className="cursor-pointer" />
        </span>
        <span className="inline-flex items-center text-xs bg-slate-300 px-1.5 py-1 text-slate-500 rounded-full mb-1 mr-1">
          Name 4 <IoCloseOutline className="cursor-pointer" />
        </span>
        <span className="inline-flex items-center text-xs bg-slate-300 px-1.5 py-1 text-slate-500 rounded-full mb-1 mr-1">
          Name 5 <IoCloseOutline className="cursor-pointer" />
        </span>
      </div>
    </div>
  );
};
export default MultipleAnswer;
