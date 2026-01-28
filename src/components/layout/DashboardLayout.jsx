import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      
        
      
    );
  }
  
  if (!isAuthenticated) {
    return ;
  }
  
  return (
    
      
      
      
        
        
        
          
            
          
        
      
    
  );
};
