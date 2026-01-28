import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Phone, Video, Info, Smile } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatUserList } from '../../components/chat/ChatUserList';
import { useAuth } from '../../context/AuthContext';
import { Message } from '../../types';
import { findUserById } from '../../data/users';
import { getMessagesBetweenUsers, sendMessage, getConversationsForUser } from '../../data/messages';
import { MessageCircle } from 'lucide-react';

export const ChatPage = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);
  
  const chatPartner = userId ? findUserById(userId) : null;
  
  useEffect(() => {
    // Load conversations
    if (currentUser) {
      setConversations(getConversationsForUser(currentUser.id));
    }
  }, [currentUser]);
  
  useEffect(() => {
    // Load messages between users
    if (currentUser && userId) {
      setMessages(getMessagesBetweenUsers(currentUser.id, userId));
    }
  }, [currentUser, userId]);
  
  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !currentUser || !userId) return;
    
    const message = sendMessage({
      senderId: currentUser.id,
      receiverId: userId,
      content: newMessage
    });
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Update conversations
    setConversations(getConversationsForUser(currentUser.id));
  };
  
  if (!currentUser) return null;
  
  return (
    
      {/* Conversations sidebar */}
      
        
      
      
      {/* Main chat area */}
      
        {/* Chat header */}
        {chatPartner ? (
          <>
            
              
                
                
                
                  {chatPartner.name}
                  
                    {chatPartner.isOnline ? 'Online' : 'Last seen recently'}
                  
                
              
              
              
                
                  
                
                
                
                  
                
                
                
                  
                
              
            
            
            {/* Messages container */}
            
              {messages.length > 0 ? (
                
                  {messages.map(message => (
                    
                  ))}
                  
                
              ) : (
                
                  
                    
                  
                  No messages yet
                  Send a message to start the conversation
                
              )}
            
            
            {/* Message input */}
            
              
                
                  
                
                
                 setNewMessage(e.target.value)}
                  fullWidth
                  className="flex-1"
                />
                
                
                  
                
              
            
          
        ) : (
          
            
              
            
            Select a conversation
            
              Choose a contact from the list to start chatting
            
          
        )}
      
    
  );
};
