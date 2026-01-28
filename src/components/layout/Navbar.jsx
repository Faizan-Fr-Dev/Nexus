import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Building2, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar = () => {
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
      icon: user?.role === 'entrepreneur' ?  : ,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    {
      icon: ,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: ,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    },
    {
      icon: ,
      text: 'Profile',
      path: profileRoute,
    }
  ];
  
  return (
    
      
        
          {/* Logo and brand */}
          
            
              
                
                  
                  
                
              
              Business Nexus
            
          
          
          {/* Desktop navigation */}
          
            {user ? (
              
                {navLinks.map((link, index) => (
                  
                    {link.icon}
                    {link.text}
                  
                ))}
                
                }
                >
                  Logout
                
                
                
                  
                  {user.name}
                
              
            ) : (
              
                
                  Log in
                
                
                  Sign up
                
              
            )}
          
          
          {/* Mobile menu button */}
          
            
              {isMenuOpen ? (
                
              ) : (
                
              )}
            
          
        
      
      
      {/* Mobile menu */}
      {isMenuOpen && (
        
          
            {user ? (
              <>
                
                  
                  
                    {user.name}
                    {user.role}
                  
                
                
                
                  {navLinks.map((link, index) => (
                     setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.text}
                    
                  ))}
                  
                   {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  >
                    
                    Logout
                  
                
              
            ) : (
              
                 setIsMenuOpen(false)}
                >
                  Log in
                
                 setIsMenuOpen(false)}
                >
                  Sign up
                
              
            )}
          
        
      )}
    
  );
};
