import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '../ui/Avatar';
import { findUserById } from '../../data/users';

export const ChatMessage = ({ message, isOwn }) => {
  const user = findUserById(message.senderId);
  
  if (!user) return null;
  
  return (
    <div className={`flex w-full mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[75%] gap-3 ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isOwn && (
          <Avatar src={user.avatarUrl} size="sm" className="mt-1" />
        )}
        
        <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isOwn 
              ? 'bg-primary-600 text-white rounded-tr-none' 
              : 'bg-white text-gray-900 border border-gray-100 rounded-tl-none'
          }`}>
            {message.content}
          </div>
          
          <span className="text-[10px] text-gray-400 mt-1 px-1">
            {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  );
};
