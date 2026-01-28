import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Entrepreneur } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface EntrepreneurCardProps {
  entrepreneur: Entrepreneur;
  showActions?;
}

export const EntrepreneurCard = ({
  entrepreneur,
  showActions = true
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/entrepreneur/${entrepreneur.id}`);
  };
  
  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/chat/${entrepreneur.id}`);
  };
  
  return (
    
      
        
          
          
          
            {entrepreneur.name}
            {entrepreneur.startupName}
            
            
              {entrepreneur.industry}
              {entrepreneur.location}
              Founded {entrepreneur.foundedYear}
            
          
        
        
        
          Pitch Summary
          {entrepreneur.pitchSummary}
        
        
        
          
            Funding Need
            {entrepreneur.fundingNeeded}
          
          
          
            Team Size
            {entrepreneur.teamSize} people
          
        
      
      
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
