import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, MessageCircle } from 'lucide-react';
import { CollaborationRequest } from '../../types';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { findUserById } from '../../data/users';
import { updateRequestStatus } from '../../data/collaborationRequests';
import { formatDistanceToNow } from 'date-fns';

interface CollaborationRequestCardProps {
  request: CollaborationRequest;
  onStatusUpdate?: (requestId, status: 'accepted' | 'rejected') => void;
}

export const CollaborationRequestCard = ({
  request,
  onStatusUpdate
}) => {
  const navigate = useNavigate();
  const investor = findUserById(request.investorId);
  
  if (!investor) return null;
  
  const handleAccept = () => {
    updateRequestStatus(request.id, 'accepted');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'accepted');
    }
  };
  
  const handleReject = () => {
    updateRequestStatus(request.id, 'rejected');
    if (onStatusUpdate) {
      onStatusUpdate(request.id, 'rejected');
    }
  };
  
  const handleMessage = () => {
    navigate(`/chat/${investor.id}`);
  };
  
  const handleViewProfile = () => {
    navigate(`/profile/investor/${investor.id}`);
  };
  
  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return Pending;
      case 'accepted':
        return Accepted;
      case 'rejected':
        return Declined;
      default:
        return null;
    }
  };
  
  return (
    
      
        
          
            
            
            
              {investor.name}
              
                {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
              
            
          
          
          {getStatusBadge()}
        
        
        
          {request.message}
        
      
      
      
        {request.status === 'pending' ? (
          
            
              }
                onClick={handleReject}
              >
                Decline
              
              }
                onClick={handleAccept}
              >
                Accept
              
            
            
            }
              onClick={handleMessage}
            >
              Message
            
          
        ) : (
          
            }
              onClick={handleMessage}
            >
              Message
            
            
            
              View Profile
            
          
        )}
      
    
  );
};
