import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const InvestorCard = ({
  investor,
  showActions = true
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };
  
  const handleMessage = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/chat/${investor.id}`);
  };
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
      onClick={handleViewProfile}
    >
      <CardBody className="flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar src={investor.avatarUrl} alt={investor.name} size="lg" />
            <div>
              <h3 className="font-semibold text-gray-900">{investor.name}</h3>
              <p className="text-sm text-gray-500">Investor • {investor.totalInvestments} investments</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {investor.investmentStage.map((stage, index) => (
              <Badge key={index} variant="secondary" size="sm">{stage}</Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Investment Interests
          </p>
          <div className="flex flex-wrap gap-2">
            {investor.investmentInterests.map((interest, index) => (
              <Badge key={index} variant="outline" size="sm">{interest}</Badge>
            ))}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {investor.bio}
        </p>
        
        <div className="flex items-center text-sm text-gray-500">
          <span className="font-medium mr-2">Investment Range:</span>
          <span>{investor.minimumInvestment} - {investor.maximumInvestment}</span>
        </div>
      </CardBody>
      
      {showActions && (
        <CardFooter className="border-t border-gray-100 bg-gray-50 flex gap-2">
          <Button 
            variant="outline" 
            fullWidth 
            onClick={handleMessage}
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Message
          </Button>
          
          <Button 
            variant="primary" 
            fullWidth
            onClick={handleViewProfile}
            className="flex items-center justify-center gap-2"
          >
            <ExternalLink size={16} />
            View Profile
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
