import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

export const EntrepreneurDashboard = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  
  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);
  
  const handleRequestStatusUpdate = (requestId, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status } : req
      )
    );
  };
  
  if (!user) return null;
  
  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');
  
  return (
    
      
        
          Welcome, {user.name}
          Here's what's happening with your startup today
        
        
        
          }
          >
            Find Investors
          
        
      
      
      {/* Summary cards */}
      
        
          
            
              
                
              
              
                Pending Requests
                {pendingRequests.length}
              
            
          
        
        
        
          
            
              
                
              
              
                Total Connections
                
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                
              
            
          
        
        
        
          
            
              
                
              
              
                Upcoming Meetings
                2
              
            
          
        
        
        
          
            
              
                
              
              
                Profile Views
                24
              
            
          
        
      
      
      
        {/* Collaboration requests */}
        
          
            
              Collaboration Requests
              {pendingRequests.length} pending
            
            
            
              {collaborationRequests.length > 0 ? (
                
                  {collaborationRequests.map(request => (
                    
                  ))}
                
              ) : (
                
                  
                    
                  
                  No collaboration requests yet
                  When investors are interested in your startup, their requests will appear here
                
              )}
            
          
        
        
        {/* Recommended investors */}
        
          
            
              Recommended Investors
              
                View all
              
            
            
            
              {recommendedInvestors.map(investor => (
                
              ))}
            
          
        
      
    
  );
};
