import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Building2, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar = ({ onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // User dashboard route based on role
  const dashboardRoute = user?.role === 'entrepreneur' 
    ? '/dashboard/entrepreneur' 
    : '/dashboard/investor';
  
  // User profile route based on role and ID
  const profileRoute = user 
    ? `/profile/${user.role}/${user.id}` 
    : '/login';
  
  const navLinks = [
    {
      icon: user?.role === 'entrepreneur' ? <Building2 size={18} /> : <CircleDollarSign size={18} />,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    {
      icon: <MessageCircle size={18} />,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: <Bell size={18} />,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    },
    {
      icon: <User size={18} />,
      text: 'Profile',
      path: profileRoute,
    }
  ];
  
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          <div className="flex items-center gap-4">
            {user && (
              <button
                onClick={onToggleSidebar}
                className="md:hidden p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu size={24} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-1.5 rounded-lg text-white shadow-sm shadow-primary-200">
                <Building2 size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight hidden xs:block">Business Nexus</span>
              <span className="font-bold text-xl text-gray-900 tracking-tight block xs:hidden">Nexus</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-6">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-gray-500 hover:text-primary-600 flex items-center gap-2 text-sm font-semibold transition-all hover:-translate-y-0.5"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                ))}
                
                <div className="h-6 w-px bg-gray-200 mx-2"></div>
                
                <div className="flex items-center gap-3 pl-2 group cursor-pointer" onClick={() => navigate(profileRoute)}>
                  <Avatar src={user.avatarUrl} alt={user.name} size="sm" className="ring-2 ring-transparent group-hover:ring-primary-100 transition-all" />
                  <div className="hidden lg:block">
                    <p className="text-sm font-bold text-gray-900 leading-none">{user.name}</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">{user.role}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleLogout(); }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2"
                    title="Logout"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-bold">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" className="font-bold px-6">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button (For non-logged in or additional actions) */}
          <div className="flex md:hidden items-center">
            {!user ? (
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            ) : (
              <Link to={profileRoute} className="p-1">
                <Avatar src={user.avatarUrl} alt={user.name} size="sm" className="ring-2 ring-primary-50" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu (Non-logged in) */}
      {!user && isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2 pb-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button variant="outline" fullWidth className="font-bold">Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button variant="primary" fullWidth className="font-bold">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
