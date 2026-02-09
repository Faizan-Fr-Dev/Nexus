import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Home, Building2, CircleDollarSign, Users, MessageCircle,
  Bell, FileText, Settings, HelpCircle, Calendar, X, Video
} from 'lucide-react';
import { Button } from '../ui/Button';

const SidebarItem = ({ to, icon, text, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 rounded-xl transition-all duration-200 ${isActive
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
          : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
        }`
      }
    >
      {icon}
      <span className="ml-3 font-semibold">{text}</span>
    </NavLink>
  );
};

export const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  if (!user) return null;

  // Define sidebar items based on user role
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/schedule', icon: <Calendar size={20} />, text: 'Schedule' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={20} />, text: 'Documents' },
    { to: '/video-call', icon: <Video size={20} />, text: 'Video Call' },
  ];

  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Building2 size={20} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/schedule', icon: <Calendar size={20} />, text: 'Schedule' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={20} />, text: 'Deals' },
    { to: '/video-call', icon: <Video size={20} />, text: 'Video Call' },
  ];

  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;

  const commonItems = [
    { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, text: 'Help & Support' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 
        flex flex-col h-full transition-all duration-300 ease-in-out transform pt-16
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 flex items-center justify-end px-6 border-b border-gray-50">
          <button
            onClick={onClose}
            className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          <nav className="space-y-1.5">
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} {...item} onClick={() => { if (window.innerWidth < 768) onClose(); }} />
            ))}
          </nav>

          <div>
            <h3 className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Account & Support
            </h3>
            <div className="space-y-1.5">
              {commonItems.map((item, index) => (
                <SidebarItem key={index} {...item} onClick={() => { if (window.innerWidth < 768) onClose(); }} />
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-5 border border-primary-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary-100/50 rounded-full blur-2xl group-hover:bg-primary-200/50 transition-colors"></div>
            <div className="relative z-10">
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-sm mb-3">
                <HelpCircle size={20} className="text-primary-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Need assistance?</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Our support team is always here to help you grow.
              </p>
              <Button variant="link" size="xs" className="mt-3 text-primary-600 font-bold p-0">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
