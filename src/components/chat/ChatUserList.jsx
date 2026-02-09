import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { findUserById } from '../../data/users';
import { useAuth } from '../../context/AuthContext';

export const ChatUserList = ({ conversations }) => {
  const navigate = useNavigate();
  const { userId: activeUserId } = useParams();
  const { user: currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  const handleSelectUser = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {conversations.map(conversation => {
              // Get the other participant (not the current user)
              const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
              if (!otherParticipantId) return null;
              
              const otherUser = findUserById(otherParticipantId);
              if (!otherUser) return null;
              
              const lastMessage = conversation.lastMessage;
              const isActive = activeUserId === otherParticipantId;
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => handleSelectUser(otherUser.id)}
                  className={`w-full flex items-center gap-3 p-4 transition-colors text-left ${
                    isActive ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="relative">
                    <Avatar src={otherUser.avatarUrl} alt={otherUser.name} />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      otherUser.isOnline ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className={`text-sm font-semibold truncate ${isActive ? 'text-primary-900' : 'text-gray-900'}`}>
                        {otherUser.name}
                      </h4>
                      {lastMessage && (
                        <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center gap-2">
                      {lastMessage && (
                        <p className={`text-xs truncate ${lastMessage.isRead || lastMessage.senderId === currentUser.id ? 'text-gray-500' : 'text-gray-900 font-bold'}`}>
                          {lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                          {lastMessage.content}
                        </p>
                      )}
                      
                      {lastMessage && !lastMessage.isRead && lastMessage.senderId !== currentUser.id && (
                        <Badge variant="primary" size="xs" className="flex-shrink-0">New</Badge>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-gray-500">
            <p className="text-sm">No conversations yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
