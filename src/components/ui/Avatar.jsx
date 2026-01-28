import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src;
  alt;
  size?: AvatarSize;
  className?;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const Avatar = ({
  src,
  alt,
  size = 'md',
  className = '',
  status,
}) => {
  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };
  
  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-gray-400',
    away: 'bg-warning-500',
    busy: 'bg-error-500',
  };
  
  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };
  
  return (
    
       {
          // Fallback to initials if image fails to load
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(alt)}&background=random`;
        }}
      />
      
      {status && (
        
      )}
    
  );
};
