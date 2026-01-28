import React from 'react';

interface CardProps {
  children;
  className?;
  onClick?: () => void;
  hoverable?;
}

export const Card = ({
  children,
  className = '',
  onClick,
  hoverable = false,
}) => {
  const hoverableClass = hoverable ? 'transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    
      {children}
    
  );
};

interface CardHeaderProps {
  children;
  className?;
}

export const CardHeader = ({
  children,
  className = '',
}) => {
  return (
    
      {children}
    
  );
};

interface CardBodyProps {
  children;
  className?;
}

export const CardBody = ({
  children,
  className = '',
}) => {
  return (
    
      {children}
    
  );
};

interface CardFooterProps {
  children;
  className?;
}

export const CardFooter = ({
  children,
  className = '',
}) => {
  return (
    
      {children}
    
  );
};
