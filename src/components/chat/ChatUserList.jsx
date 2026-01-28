import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ChatConversation } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { findUserById } from '../../data/users';
import { useAuth } from '../../context/AuthContext';

interface ChatUserListProps {
  conversations: ChatConversation[];
}

export const ChatUserList = ({ conversations }) => {
  const navigate = useNavigate();
  const { userId: activeUserId } = useParams();
  const { user: currentUser } = useAuth();
  
  if (!currentUser) return null;
  
  const handleSelectUser = (userId) => {
    navigate(`/chat/${userId}`);
  };

  return (
    
      
        Messages
        
        
          {conversations.length > 0 ? (
            conversations.map(conversation => {
              // Get the other participant (not the current user)
              const otherParticipantId = conversation.participants.find(id => id !== currentUser.id);
              if (!otherParticipantId) return null;
              
              const otherUser = findUserById(otherParticipantId);
              if (!otherUser) return null;
              
              const lastMessage = conversation.lastMessage;
              const isActive = activeUserId === otherParticipantId;
              
              return (
                 handleSelectUser(otherUser.id)}
                >
                  
                  
                  
                    
                      
                        {otherUser.name}
                      
                      
                      {lastMessage && (
                        
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                        
                      )}
                    
                    
                    
                      {lastMessage && (
                        
                          {lastMessage.senderId === currentUser.id ? 'You: ' : ''}
                          {lastMessage.content}
                        
                      )}
                      
                      {lastMessage && !lastMessage.isRead && lastMessage.senderId !== currentUser.id && (
                        New
                      )}
                    
                  
                
              );
            })
          ) : (
            
              No conversations yet
            
          )}
        
      
    
  );
};
