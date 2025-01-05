import React, { useState, CSSProperties, ReactNode } from 'react';

interface TableButtonProps {
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'outlined'
    | 'text'
    | 'edit'
    | 'delete'
    | 'view';
  onClick?: () => void;
  children: ReactNode;
  className?: string; // Optional className prop
}

export default function TableButton({
  variant,
  onClick,
  children,
  className,
}: TableButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Success style logic
  const successStyle: CSSProperties =
    variant === 'success'
      ? {
          background: isHovered
            ? 'linear-gradient(90deg, #FFC785 0%, #FFB066 50%, #FF9A76 100%)' // Light orange on hover
            : 'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)', // Original gradient
          color: 'white',
          transition: 'background 0.3s', // Smooth transition for hover effect
        }
      : {};

  // Variant-based class logic
  const variantClasses: { [key: string]: string } = {
    primary: 'bg-blue-200 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-400',
    success: '', // Success styling handled by `successStyle`
    outlined:
      'border-solid border-2 border-red-300 hover:bg-red-400 rounded bg-red-200', // Outline variant
    edit: 'bg-lime-200 !text-lime-700',
    delete: 'bg-red-200 !text-red-700',
    view: 'bg-yellow-200 !text-yellow-700',
    text: 'text-blue-500 hover:text-blue-600', // Text-only variant
  };

  return (
    <button
      className={`font-bold text-sm py-2 px-2 mt-1 rounded   ${variant !== 'success' ? variantClasses[variant] : ''} ${className}`}
      style={successStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
}
