import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Investor } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface InvestorCardProps {
  investor: Investor;
  showActions?;
}

export const InvestorCard = ({
  investor,
  showActions = true
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };
  
  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/chat/${investor.id}`);
  };
  
  return (
    
      
        
          
          
          
            {investor.name}
            Investor • {investor.totalInvestments} investments
            
            
              {investor.investmentStage.map((stage, index) => (
                {stage}
              ))}
            
          
        
        
        
          Investment Interests
          
            {investor.investmentInterests.map((interest, index) => (
              {interest}
            ))}
          
        
        
        
          {investor.bio}
        
        
        
          
            Investment Range
            {investor.minimumInvestment} - {investor.maximumInvestment}
          
        
      
      
      {showActions && (
        
          }
            onClick={handleMessage}
          >
            Message
          
          
          }
            onClick={handleViewProfile}
          >
            View Profile
          
        
      )}
    
  );
};
