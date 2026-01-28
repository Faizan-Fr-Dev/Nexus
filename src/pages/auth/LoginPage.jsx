import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      // Redirect based on user role
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };
  
  // For demo purposes, pre-filled credentials
  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };
  
  return (
    
      
        
          
            
              
              
            
          
        
        
          Sign in to Business Nexus
        
        
          Connect with investors and entrepreneurs
        
      

      
        
          {error && (
            
              
              {error}
            
          )}
          
          
            
              
                I am a
              
              
                 setRole('entrepreneur')}
                >
                  
                  Entrepreneur
                
                
                 setRole('investor')}
                >
                  
                  Investor
                
              
            
            
             setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
             setPassword(e.target.value)}
              required
              fullWidth
            />
            
            
              
                
                
                  Remember me
                
              

              
                
                  Forgot your password?
                
              
            
            
            }
            >
              Sign in
            
          
          
          
            
              
                
              
              
                Demo Accounts
              
            
            
            
               fillDemoCredentials('entrepreneur')}
                leftIcon={}
              >
                Entrepreneur Demo
              
              
               fillDemoCredentials('investor')}
                leftIcon={}
              >
                Investor Demo
              
            
          
          
          
            
              
                
              
              
                Or
              
            
            
            
              
                Don't have an account?{' '}
                
                  Sign up
                
              
            
          
        
      
    
  );
};
