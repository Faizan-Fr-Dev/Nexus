import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { resetPassword } = useAuth();
  const token = searchParams.get('token');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      return;
    }
    
    if (password !== confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resetPassword(token, password);
      navigate('/login');
    } catch (error) {
      // Error is handled by the AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
    return (
      
        
          
            
              Invalid reset link
            
            
              This password reset link is invalid or has expired.
            
             navigate('/forgot-password')}
            >
              Request new reset link
            
          
        
      
    );
  }
  
  return (
    
      
        
          
          
            Reset your password
          
          
            Enter your new password below
          
        
        
        
          
             setPassword(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
             setConfirmPassword(e.target.value)}
              required
              fullWidth
              startAdornment={}
              error={password !== confirmPassword ? 'Passwords do not match' : undefined}
            />
            
            
              Reset password
            
          
        
      
    
  );
};
