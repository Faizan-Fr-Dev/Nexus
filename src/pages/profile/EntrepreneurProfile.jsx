import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Users, Calendar, Building2, MapPin, UserCircle, FileText, DollarSign, Send } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { createCollaborationRequest, getRequestsFromInvestor } from '../../data/collaborationRequests';
import { Entrepreneur } from '../../types';

export const EntrepreneurProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  // Fetch entrepreneur data
  const entrepreneur = findUserById(id || '') as Entrepreneur | null;
  
  if (!entrepreneur || entrepreneur.role !== 'entrepreneur') {
    return (
      
        Entrepreneur not found
        The entrepreneur profile you're looking for doesn't exist or has been removed.
        
          Back to Dashboard
        
      
    );
  }
  
  const isCurrentUser = currentUser?.id === entrepreneur.id;
  const isInvestor = currentUser?.role === 'investor';
  
  // Check if the current investor has already sent a request to this entrepreneur
  const hasRequestedCollaboration = isInvestor && id 
    ? getRequestsFromInvestor(currentUser.id).some(req => req.entrepreneurId === id)
    : false;
  
  const handleSendRequest = () => {
    if (isInvestor && currentUser && id) {
      createCollaborationRequest(
        currentUser.id,
        id,
        `I'm interested in learning more about ${entrepreneur.startupName} and would like to explore potential investment opportunities.`
      );
      
      // In a real app, we would refresh the data or update state
      // For this demo, we'll force a page reload
      window.location.reload();
    }
  };
  
  return (
    
      {/* Profile header */}
      
        
          
            
            
            
              {entrepreneur.name}
              
                
                Founder at {entrepreneur.startupName}
              
              
              
                {entrepreneur.industry}
                
                  
                  {entrepreneur.location}
                
                
                  
                  Founded {entrepreneur.foundedYear}
                
                
                  
                  {entrepreneur.teamSize} team members
                
              
            
          
          
          
            {!isCurrentUser && (
              <>
                
                  }
                  >
                    Message
                  
                
                
                {isInvestor && (
                  }
                    disabled={hasRequestedCollaboration}
                    onClick={handleSendRequest}
                  >
                    {hasRequestedCollaboration ? 'Request Sent' : 'Request Collaboration'}
                  
                )}
              
            )}
            
            {isCurrentUser && (
              }
              >
                Edit Profile
              
            )}
          
        
      
      
      
        {/* Main content - left side */}
        
          {/* About */}
          
            
              About
            
            
              {entrepreneur.bio}
            
          
          
          {/* Startup Description */}
          
            
              Startup Overview
            
            
              
                
                  Problem Statement
                  
                    {entrepreneur?.pitchSummary?.split('.')[0]}.
                  
                
                
                
                  Solution
                  
                    {entrepreneur.pitchSummary}
                  
                
                
                
                  Market Opportunity
                  
                    The {entrepreneur.industry} market is experiencing significant growth, with a projected CAGR of 14.5% through 2027. Our solution addresses key pain points in this expanding market.
                  
                
                
                
                  Competitive Advantage
                  
                    Unlike our competitors, we offer a unique approach that combines innovative technology with deep industry expertise, resulting in superior outcomes for our customers.
                  
                
              
            
          
          
          {/* Team */}
          
            
              Team
              {entrepreneur.teamSize} members
            
            
              
                
                  
                  
                    {entrepreneur.name}
                    Founder & CEO
                  
                
                
                
                  
                  
                    Alex Johnson
                    CTO
                  
                
                
                
                  
                  
                    Jessica Chen
                    Head of Product
                  
                
                
                {entrepreneur.teamSize > 3 && (
                  
                    + {entrepreneur.teamSize - 3} more team members
                  
                )}
              
            
          
        
        
        {/* Sidebar - right side */}
        
          {/* Funding Details */}
          
            
              Funding
            
            
              
                
                  Current Round
                  
                    
                    {entrepreneur.fundingNeeded}
                  
                
                
                
                  Valuation
                  $8M - $12M
                
                
                
                  Previous Funding
                  $750K Seed (2022)
                
                
                
                  Funding Timeline
                  
                    
                      Pre-seed
                      Completed
                    
                    
                      Seed
                      Completed
                    
                    
                      Series A
                      In Progress
                    
                  
                
              
            
          
          
          {/* Documents */}
          
            
              Documents
            
            
              
                
                  
                    
                  
                  
                    Pitch Deck
                    Updated 2 months ago
                  
                  View
                
                
                
                  
                    
                  
                  
                    Business Plan
                    Updated 1 month ago
                  
                  View
                
                
                
                  
                    
                  
                  
                    Financial Projections
                    Updated 2 weeks ago
                  
                  View
                
              
              
              {!isCurrentUser && isInvestor && (
                
                  
                    Request access to detailed documents and financials by sending a collaboration request.
                  
                  
                  {!hasRequestedCollaboration ? (
                    
                      Request Collaboration
                    
                  ) : (
                    
                      Request Sent
                    
                  )}
                
              )}
            
          
        
      
    
  );
};
