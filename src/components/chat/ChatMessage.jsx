import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '../../types';
import { Avatar } from '../ui/Avatar';
import { findUserById } from '../../data/users';

interface ChatMessageProps {
  message: Message;
  isCurrentUser;
}

export const ChatMessage = ({ message, isCurrentUser }) => {
  const user = findUserById(message.senderId);
  
  if (!user) return null;
  
  return (
    
      {!isCurrentUser && (
        
      )}
      
      
        
          {message.content}
        
        
        
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        
      
      
      {isCurrentUser && (
        
      )}
    
  );
};
