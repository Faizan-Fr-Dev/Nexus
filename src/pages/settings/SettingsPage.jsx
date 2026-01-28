import React from 'react';
import { User, Lock, Bell, Globe, Palette, CreditCard } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    
      
        Settings
        Manage your account preferences and settings
      
      
      
        {/* Settings navigation */}
        
          
            
              
                
                Profile
              
              
              
                
                Security
              
              
              
                
                Notifications
              
              
              
                
                Language
              
              
              
                
                Appearance
              
              
              
                
                Billing
              
            
          
        
        
        {/* Main settings content */}
        
          {/* Profile Settings */}
          
            
              Profile Settings
            
            
              
                
                
                
                  
                    Change Photo
                  
                  
                    JPG, GIF or PNG. Max size of 800K
                  
                
              
              
              
                
                
                
                
                
                
                
              
              
              
                
                  Bio
                
                
              
              
              
                Cancel
                Save Changes
              
            
          
          
          {/* Security Settings */}
          
            
              Security Settings
            
            
              
                Two-Factor Authentication
                
                  
                    
                      Add an extra layer of security to your account
                    
                    Not Enabled
                  
                  Enable
                
              
              
              
                Change Password
                
                  
                  
                  
                  
                  
                  
                  
                    Update Password
                  
                
              
            
          
        
      
    
  );
};
