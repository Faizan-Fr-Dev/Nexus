import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Building2, MapPin, UserCircle, BarChart3, Briefcase } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { Investor } from '../../types';

export const InvestorProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  // Fetch investor data
  const investor = findUserById(id || '') as Investor | null;
  
  if (!investor || investor.role !== 'investor') {
    return (
      
        Investor not found
        The investor profile you're looking for doesn't exist or has been removed.
        
          Back to Dashboard
        
      
    );
  }
  
  const isCurrentUser = currentUser?.id === investor.id;
  
  return (
    
      {/* Profile header */}
      
        
          
            
            
            
              {investor.name}
              
                
                Investor • {investor.totalInvestments} investments
              
              
              
                
                  
                  San Francisco, CA
                
                {investor.investmentStage.map((stage, index) => (
                  {stage}
                ))}
              
            
          
          
          
            {!isCurrentUser && (
              
                }
                >
                  Message
                
              
            )}
            
            {isCurrentUser && (
              }
              >
                Edit Profile
              
            )}
          
        
      
      
      
        {/* Main content - left side */}
        
          {/* About */}
          
            
              About
            
            
              {investor.bio}
            
          
          
          {/* Investment Interests */}
          
            
              Investment Interests
            
            
              
                
                  Industries
                  
                    {investor.investmentInterests.map((interest, index) => (
                      {interest}
                    ))}
                  
                
                
                
                  Investment Stages
                  
                    {investor.investmentStage.map((stage, index) => (
                      {stage}
                    ))}
                  
                
                
                
                  Investment Criteria
                  
                    
                      
                      Strong founding team with domain expertise
                    
                    
                      
                      Clear market opportunity and product-market fit
                    
                    
                      
                      Scalable business model with strong unit economics
                    
                    
                      
                      Potential for significant growth and market impact
                    
                  
                
              
            
          
          
          {/* Portfolio Companies */}
          
            
              Portfolio Companies
              {investor.portfolioCompanies.length} companies
            
            
              
                {investor.portfolioCompanies.map((company, index) => (
                  
                    
                      
                    
                    
                      {company}
                      Invested in 2022
                    
                  
                ))}
              
            
          
        
        
        {/* Sidebar - right side */}
        
          {/* Investment Details */}
          
            
              Investment Details
            
            
              
                
                  Investment Range
                  
                    {investor.minimumInvestment} - {investor.maximumInvestment}
                  
                
                
                
                  Total Investments
                  {investor.totalInvestments} companies
                
                
                
                  Typical Investment Timeline
                  3-5 years
                
                
                
                  Investment Focus
                  
                    
                      SaaS & B2B
                      
                        
                      
                    
                    
                      FinTech
                      
                        
                      
                    
                    
                      HealthTech
                      
                        
                      
                    
                  
                
              
            
          
          
          {/* Stats */}
          
            
              Investment Stats
            
            
              
                
                  
                    
                      Successful Exits
                      4
                    
                    
                  
                
                
                
                  
                    
                      Avg. ROI
                      3.2x
                    
                    
                  
                
                
                
                  
                    
                      Active Investments
                      {investor.portfolioCompanies.length}
                    
                    
                  
                
              
            
          
        
      
    
  );
};
