import React from 'react';
import { Bell, MessageCircle, UserPlus, DollarSign } from 'lucide-react';
import { Card, CardBody } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const notifications = [
  {
    id: 1,
    type: 'message',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    content: 'sent you a message about your startup',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'connection',
    user: {
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    content: 'accepted your connection request',
    time: '2 hours ago',
    unread: true
  },
  {
    id: 3,
    type: 'investment',
    user: {
      name: 'Jennifer Lee',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
    },
    content: 'showed interest in investing in your startup',
    time: '1 day ago',
    unread: false
  }
];

export const NotificationsPage = () => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return ;
      case 'connection':
        return ;
      case 'investment':
        return ;
      default:
        return ;
    }
  };
  
  return (
    
      
        
          Notifications
          Stay updated with your network activity
        
        
        
          Mark all as read
        
      
      
      
        {notifications.map(notification => (
          
            
              
              
              
                
                  
                    {notification.user.name}
                  
                  {notification.unread && (
                    New
                  )}
                
                
                
                  {notification.content}
                
                
                
                  {getNotificationIcon(notification.type)}
                  {notification.time}
                
              
            
          
        ))}
      
    
  );
};
