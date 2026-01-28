import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

export const InvestorDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  
  if (!user) return null;
  
  // Get collaboration requests sent by this investor
  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);
  
  // Filter entrepreneurs based on search and industry filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Industry filter
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.includes(entrepreneur.industry);
    
    return matchesSearch && matchesIndustry;
  });
  
  // Get unique industries for filter
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  
  // Toggle industry selection
  const toggleIndustry = (industry) => {
    setSelectedIndustries(prevSelected => 
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };
  
  return (
    
      
        
          Discover Startups
          Find and connect with promising entrepreneurs
        
        
        
          }
          >
            View All Startups
          
        
      
      
      {/* Filters and search */}
      
        
           setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={}
          />
        
        
        
          
            
            Filter by:
            
            
              {industries.map(industry => (
                 toggleIndustry(industry)}
                >
                  {industry}
                
              ))}
            
          
        
      
      
      {/* Stats summary */}
      
        
          
            
              
                
              
              
                Total Startups
                {entrepreneurs.length}
              
            
          
        
        
        
          
            
              
                
              
              
                Industries
                {industries.length}
              
            
          
        
        
        
          
            
              
                
              
              
                Your Connections
                
                  {sentRequests.filter(req => req.status === 'accepted').length}
                
              
            
          
        
      
      
      {/* Entrepreneurs grid */}
      
        
          
            Featured Startups
          
          
          
            {filteredEntrepreneurs.length > 0 ? (
              
                {filteredEntrepreneurs.map(entrepreneur => (
                  
                ))}
              
            ) : (
              
                No startups match your filters
                 {
                    setSearchQuery('');
                    setSelectedIndustries([]);
                  }}
                >
                  Clear filters
                
              
            )}
          
        
      
    
  );
};
