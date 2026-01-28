import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Building2, CircleDollarSign, Users, MessageCircle, 
  Bell, FileText, Settings, HelpCircle
} from 'lucide-react';

interface SidebarItemProps {
  to;
  icon;
  text;
}

const SidebarItem = ({ to, icon, text }) => {
  return (
     
        `flex items-center py-2.5 px-4 rounded-md transition-colors duration-200 ${
          isActive 
            ? 'bg-primary-50 text-primary-700' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      {icon}
      {text}
    
  );
};

export const Sidebar = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Define sidebar items based on user role
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: , text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: , text: 'My Startup' },
    { to: '/investors', icon: , text: 'Find Investors' },
    { to: '/messages', icon: , text: 'Messages' },
    { to: '/notifications', icon: , text: 'Notifications' },
    { to: '/documents', icon: , text: 'Documents' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: , text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: , text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: , text: 'Find Startups' },
    { to: '/messages', icon: , text: 'Messages' },
    { to: '/notifications', icon: , text: 'Notifications' },
    { to: '/deals', icon: , text: 'Deals' },
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  // Common items at the bottom
  const commonItems = [
    { to: '/settings', icon: , text: 'Settings' },
    { to: '/help', icon: , text: 'Help & Support' },
  ];
  
  return (
    
      
        
          
            {sidebarItems.map((item, index) => (
              
            ))}
          
          
          
            
              Settings
            
            
              {commonItems.map((item, index) => (
                
              ))}
            
          
        
        
        
          
            Need assistance?
            Contact Support
            
              support@businessnexus.com
            
          
        
      
    
  );
};
