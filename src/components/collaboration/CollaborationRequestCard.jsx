import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageCircle, ArrowRight } from 'lucide-react';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { findUserById } from '../../data/users';
import { updateRequestStatus } from '../../data/collaborationRequests';
import { formatDistanceToNow } from 'date-fns';

export const CollaborationRequestCard = ({
  request,
  onStatusUpdate
}) => {
  const navigate = useNavigate();
  const investor = findUserById(request.investorId);
  
  if (!investor) return null;
  
  const handleAccept = (e) => {
    e.stopPropagation();
    updateRequestStatus(request.id, 'accepted');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'accepted');
    }
  };
  
  const handleReject = (e) => {
    e.stopPropagation();
    updateRequestStatus(request.id, 'rejected');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'rejected');
    }
  };
  
  const handleMessage = (e) => {
    e.stopPropagation();
    navigate(`/chat/${investor.id}`);
  };
  
  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };
  
  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending': return <Badge variant="warning">Pending</Badge>;
      case 'accepted': return <Badge variant="success">Accepted</Badge>;
      case 'rejected': return <Badge variant="error">Declined</Badge>;
      default: return null;
    }
  };
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewProfile}
    >
      <CardBody>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar src={investor.avatarUrl} alt={investor.name} size="md" />
            <div>
              <h4 className="font-bold text-gray-900">{investor.name}</h4>
              <p className="text-[10px] text-gray-400 font-medium italic">
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-2">
          <p className="text-sm text-gray-600 italic">
            "{request.message}"
          </p>
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-between items-center py-3">
        {request.status === 'pending' ? (
          <div className="flex gap-2 w-full">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 text-red-500 hover:text-red-600 border-red-100 hover:border-red-200"
              onClick={handleReject}
            >
              <X size={16} className="mr-1" />
              Decline
            </Button>
            <Button 
              size="sm" 
              variant="primary" 
              className="flex-1"
              onClick={handleAccept}
            >
              <Check size={16} className="mr-1" />
              Accept
            </Button>
          </div>
        ) : (
          <div className="flex justify-between w-full items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMessage}
              className="text-primary-600"
            >
              <MessageCircle size={16} className="mr-2" />
              Message
            </Button>
            <div className="flex items-center text-xs font-bold text-gray-400">
              Details <ArrowRight size={14} className="ml-1" />
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
