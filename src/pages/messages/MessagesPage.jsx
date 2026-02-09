import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getConversationsForUser } from '../../data/messages';
import { ChatUserList } from '../../components/chat/ChatUserList';
import { MessageSquare, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const MessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;
  
  const conversations = getConversationsForUser(user.id);
  
  return (
    <div className="h-[calc(100vh-theme(spacing.24))] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Coordinate and collaborate with your network</p>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex">
        {conversations.length > 0 ? (
          <div className="w-full flex">
            <div className="w-80 border-r border-gray-200">
              <ChatUserList 
                conversations={conversations} 
                currentUserId={user.id} 
              />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
              <div className="text-center p-8 max-w-sm">
                <div className="mx-auto w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary-500 mb-4">
                  <MessageSquare size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Select a conversation</h2>
                <p className="text-gray-500 mt-2">
                  Choose a contact from the list on the left to view your message history and start chatting.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <MessageSquare size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">No messages yet</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't started any conversations yet. Connect with entrepreneurs or investors to begin collaborating.
            </p>
            <div className="mt-8">
              <Button 
                variant="primary" 
                onClick={() => navigate(user.role === 'entrepreneur' ? '/investors' : '/entrepreneurs')}
                className="flex items-center gap-2"
              >
                <Users size={18} />
                Browse Directory
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
