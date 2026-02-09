import React from 'react';

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverableClass = hoverable ? 'transform hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300' : '';
  const clickableClass = onClick ? 'cursor-pointer active:scale-[0.98]' : '';
  
  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm shadow-gray-100 border border-gray-100 overflow-hidden ${hoverableClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = '',
  border = true
}) => {
  return (
    <div className={`px-6 py-4 ${border ? 'border-b border-gray-100' : ''} ${className}`}>
      {children}
    </div>
  );
};

export const CardBody = ({
  children,
  className = '',
}) => {
  return (
    <div className={`px-6 py-5 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({
  children,
  className = '',
  border = true
}) => {
  return (
    <div className={`px-6 py-4 bg-gray-50/50 ${border ? 'border-t border-gray-100' : ''} ${className}`}>
      {children}
    </div>
  );
};
