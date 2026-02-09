import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  isLoading = false,
  fullWidth = false,
  disabled,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`
        px-4 py-2 rounded-md font-medium transition-colors
        bg-blue-600 text-white hover:bg-blue-700
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children || 'кнопка'}
    </button>
  );
};