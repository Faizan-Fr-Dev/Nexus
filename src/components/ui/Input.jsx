import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes {
  label?;
  error?;
  helperText?;
  startAdornment?;
  endAdornment?;
  fullWidth?;
}

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
  const errorClass = error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500';
  
  const inputBaseClass = `block rounded-md shadow-sm focus:ring-2 focus:ring-opacity-50 sm:text-sm ${errorClass}`;
  const adornmentClass = startAdornment ? 'pl-10' : '';
  
  return (
    
      {label && (
        
          {label}
        
      )}
      
      
        {startAdornment && (
          
            {startAdornment}
          
        )}
        
        
        
        {endAdornment && (
          
            {endAdornment}
          
        )}
      
      
      {(error || helperText) && (
        
          {error || helperText}
        
      )}
    
  );
});

Input.displayName = 'Input';
