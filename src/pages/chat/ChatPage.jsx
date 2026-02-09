import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Send, Phone, Video, Info, Smile, MessageCircle } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ChatMessage } from '../../components/chat/ChatMessage';
import { ChatUserList } from '../../components/chat/ChatUserList';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { getMessagesBetweenUsers, sendMessage, getConversationsForUser } from '../../data/messages';

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
  
  const handleSendMessage = (e) => {
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
    <div className="flex h-[calc(100vh-theme(spacing.16))] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Conversations sidebar */}
      <div className="w-80 border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        <ChatUserList 
          conversations={conversations} 
          currentUserId={currentUser.id} 
          selectedUserId={userId}
        />
      </div>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full bg-gray-50">
        {/* Chat header */}
        {chatPartner ? (
          <>
            <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                <Avatar src={chatPartner.avatarUrl} alt={chatPartner.name} />
                <div>
                  <h3 className="font-semibold text-gray-900">{chatPartner.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${chatPartner.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <p className="text-xs text-gray-500">{chatPartner.isOnline ? 'Online' : 'Last seen recently'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary-600">
                  <Phone size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary-600">
                  <Video size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-primary-600">
                  <Info size={20} />
                </Button>
              </div>
            </div>
            
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length > 0 ? (
                <>
                  {messages.map(message => (
                    <ChatMessage 
                      key={message.id} 
                      message={message} 
                      isOwn={message.senderId === currentUser.id} 
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 animate-in fade-in duration-500">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <MessageCircle size={32} className="text-primary-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                  <p className="text-sm mt-1">Send a message to start the conversation</p>
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="bg-white p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-2 items-center">
                <Button type="button" variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Smile size={24} />
                </Button>
                
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  fullWidth
                  className="flex-1"
                />
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={!newMessage.trim()}
                  className="px-4"
                >
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <MessageCircle size={48} className="text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Select a conversation</h2>
            <p className="mt-2">Choose a contact from the list to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};
