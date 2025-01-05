import { InputHTMLAttributes } from 'react';

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        'ml-0 bg-slate-50 rounded-md text-orange-400 p-2.5 focus:!ring-transparent focus:!border-gray-300 !border-gray-200' +
        className
      }
    />
  );
}
