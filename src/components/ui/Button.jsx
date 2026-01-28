import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'error';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?;
  isLoading?;
  leftIcon?;
  rightIcon?;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size styles
  const sizeStyles = {
    xs: 'text-xs px-2 py-1',
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5',
    xl: 'text-lg px-6 py-3',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-400',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-primary-500',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-primary-500',
    link: 'bg-transparent text-primary-600 hover:text-primary-700 hover:underline focus:ring-primary-500 p-0',
    success: 'bg-success-500 text-white hover:bg-success-700 focus:ring-success-500',
    warning: 'bg-warning-500 text-white hover:bg-warning-700 focus:ring-warning-500',
    error: 'bg-error-500 text-white hover:bg-error-700 focus:ring-error-500',
  };
  
  // Loading state
  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled state
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  const combinedClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthClass} ${loadingClass} ${disabledClass} ${className}`;
  
  return (
    
      {isLoading && (
        
          
          
        
      )}
      
      {!isLoading && leftIcon && {leftIcon}}
      {children}
      {!isLoading && rightIcon && {rightIcon}}
    
  );
};
