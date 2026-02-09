import React from 'react';
import { Bell, MessageCircle, UserPlus, DollarSign, Clock, Check } from 'lucide-react';
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
      case 'message': return <MessageCircle size={14} className="text-blue-500" />;
      case 'connection': return <UserPlus size={14} className="text-green-500" />;
      case 'investment': return <DollarSign size={14} className="text-purple-500" />;
      default: return <Bell size={14} />;
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with your network activity</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50">
          <Check size={18} className="mr-2" />
          Mark all as read
        </Button>
      </div>
      
      <div className="space-y-3">
        {notifications.map(notification => (
          <Card key={notification.id} className={`${notification.unread ? 'border-l-4 border-l-primary-500 shadow-sm' : 'bg-gray-50/30 opacity-75'}`}>
            <CardBody className="p-4">
              <div className="flex gap-4">
                <Avatar src={notification.user.avatar} size="lg" />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.user.name}
                    </p>
                    {notification.unread && (
                      <Badge variant="primary" size="sm">New</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.content}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <Clock size={12} />
                    <span>{notification.time}</span>
                    <span className="mx-1">•</span>
                    <div className="flex items-center gap-1">
                      {getNotificationIcon(notification.type)}
                      <span className="capitalize">{notification.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
        
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
              <Bell size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">All caught up!</h3>
            <p className="text-gray-600">You don't have any new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};
