import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      // Error is handled by the AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      
        
          
            
            
              Check your email
            
            
              We've sent password reset instructions to {email}
            
          
          
          
            
              
                Didn't receive the email? Check your spam folder or try again.
              
              
               setIsSubmitted(false)}
              >
                Try again
              
              
              
                }
                >
                  Back to login
                
              
            
          
        
      
    );
  }
  
  return (
    
      
        
          
          
            Forgot your password?
          
          
            Enter your email address and we'll send you instructions to reset your password.
          
        
        
        
          
             setEmail(e.target.value)}
              required
              fullWidth
              startAdornment={}
            />
            
            
              Send reset instructions
            
            
            
              }
              >
                Back to login
              
            
          
        
      
    
  );
};
