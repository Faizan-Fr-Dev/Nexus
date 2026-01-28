import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, CircleDollarSign, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('entrepreneur');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(name, email, password, role);
      // Redirect based on user role
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };
  
  return (
    
      
        
          
            
              
              
            
          
        
        
          Create your account
        
        
          Join Business Nexus to connect with partners
        
      

      
        
          {error && (
            
              
              {error}
            
          )}
          
          
            
              
                I am registering as a
              
              
                 setRole('entrepreneur')}
                >
                  
                  Entrepreneur
                
                
                 setRole('investor')}
                >
                  
                  Investor
                
              
            
            
             setName(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
             setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
             setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
             setConfirmPassword(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
            
              
              
                I agree to the{' '}
                
                  Terms of Service
                {' '}
                and{' '}
                
                  Privacy Policy
                
              
            
            
            
              Create account
            
          
          
          
            
              
                
              
              
                Or
              
            
            
            
              
                Already have an account?{' '}
                
                  Sign in
                
              
            
          
        
      
    
  );
};
