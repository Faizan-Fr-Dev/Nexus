import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  helperText,
  startAdornment,
  endAdornment,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  
  const widthClass = fullWidth ? 'w-full' : '';
  const errorClass = error 
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-200 focus:ring-primary-500 focus:border-primary-500';
  
  const inputBaseClass = `block h-11 transition-all duration-200 rounded-xl shadow-sm text-sm ${errorClass} ${widthClass}`;
  const paddingClass = startAdornment ? 'pl-11' : 'pl-4';
  const endPaddingClass = endAdornment ? 'pr-11' : 'pr-4';
  
  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {startAdornment && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {startAdornment}
          </div>
        )}
        
        <input
          ref={ref}
          className={`${inputBaseClass} ${paddingClass} ${endPaddingClass}`}
          {...props}
        />
        
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary-500 transition-colors">
            {endAdornment}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1.5 text-xs ml-1 ${error ? 'text-red-500 font-medium' : 'text-gray-500 italic'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
