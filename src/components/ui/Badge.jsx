import React from 'react';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-blue-100 text-blue-700 border-blue-200',
    accent: 'bg-purple-100 text-purple-700 border-purple-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
  };
  
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 font-bold',
    sm: 'text-xs px-2 py-0.5 font-semibold',
    md: 'text-xs px-2.5 py-0.5 font-bold uppercase tracking-wider',
    lg: 'text-sm px-3 py-1 font-bold',
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded-lg';
  
  return (
    <span className={`inline-flex items-center border ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClass} ${className}`}>
      {children}
    </span>
  );
};
