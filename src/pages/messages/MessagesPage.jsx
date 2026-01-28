import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getConversationsForUser } from '../../data/messages';
import { ChatUserList } from '../../components/chat/ChatUserList';
// import { MessageCircle } from 'lucide-react';

export const MessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  const conversations = getConversationsForUser(user.id);
  
  return (
    
      {conversations.length > 0 ? (
        
      ) : (
        
          
            {/*  */}
          
          No messages yet
          
            Start connecting with entrepreneurs and investors to begin conversations
          
        
      )}
    
  );
};
