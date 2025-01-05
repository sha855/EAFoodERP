import {
  ButtonHTMLAttributes,
  ReactNode,
  CSSProperties,
  useState,
} from 'react';
import { router } from '@inertiajs/react';

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'success';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;
}

export default function CommonButton({
  className = '',
  onClick,
  children,
  variant = 'primary',
  style = {},
  href,
  type = 'button', // Default type as 'button'
  ...props
}: CommonButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const outlinedStyle: CSSProperties =
    variant === 'outlined'
      ? {
          borderImageSlice: 1,
        }
      : {};

  const successStyle: CSSProperties =
    variant === 'success'
      ? {
          background: isHovered
            ? 'linear-gradient(90deg, #FFC785 0%, #FFB066 50%, #FF9A76 100%)' // Light orange on hover
            : 'linear-gradient(90deg, #FF6F61 0%, #FF9A76 50%, #FFC785 100%)', // Original gradient
          color: 'white', // Ensure text is readable on gradient
          transition: 'background 0.3s', // Smooth transition for hover effect
        }
      : {};

  // Determine classes based on the variant
  const variantClasses: { [key: string]: string } = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    success: '',
    outlined:
      'border-solid border-2 border-orange-400 hover:bg-orange-100 rounded', // Outline base without border styling
    text: 'text-blue-500 hover:text-blue-600', // No underline
  };

  // Handle click event, prioritizing href navigation over onClick
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Only prevent default if the button type is not 'submit'
    if (type !== 'submit') {
      event.preventDefault(); // Prevent default link behavior or form submission
    }
    if (href) {
      router.get(href); // Navigate using Inertia
    } else if (onClick) {
      onClick(event); // Call the onClick handler if no href
    }
  };

  return (
    <button
      type={type} // Set button type dynamically to support 'submit'
      className={`px-5 py-2 rounded !font-bold text-sm ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)} // Set hover state on mouse enter
      onMouseLeave={() => setIsHovered(false)} // Remove hover state on mouse leave
      style={{
        ...style,
        ...(variant === 'outlined' ? outlinedStyle : {}),
        ...(variant === 'success' ? successStyle : {}),
      }} // Apply variant styles
      {...props}
    >
      {children}
    </button>
  );
}
