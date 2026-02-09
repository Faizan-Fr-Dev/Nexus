import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, ExternalLink, Building2, MapPin, Calendar, Users } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const EntrepreneurCard = ({
  entrepreneur,
  showActions = true
}) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/profile/entrepreneur/${entrepreneur.id}`);
  };
  
  const handleMessage = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/chat/${entrepreneur.id}`);
  };
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow h-full flex flex-col"
      onClick={handleViewProfile}
    >
      <CardBody className="flex-1">
        <div className="flex items-start gap-4 mb-4">
          <Avatar src={entrepreneur.avatarUrl} alt={entrepreneur.name} size="lg" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{entrepreneur.name}</h3>
            <div className="flex items-center text-sm text-primary-600 font-medium">
              <Building2 size={14} className="mr-1" />
              {entrepreneur.startupName}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="primary" size="sm">{entrepreneur.industry}</Badge>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin size={12} className="mr-1" />
            {entrepreneur.location}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            {entrepreneur.foundedYear}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4 italic">
          "{entrepreneur.pitchSummary}"
        </p>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Funding Need</p>
            <p className="text-sm font-bold text-gray-900">{entrepreneur.fundingNeeded}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Team Size</p>
            <p className="text-sm font-bold text-gray-900">{entrepreneur.teamSize} people</p>
          </div>
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
            View
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
