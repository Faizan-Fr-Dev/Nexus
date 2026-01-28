import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { investors } from '../../data/users';

export const InvestorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  
  // Get unique investment stages and interests
  const allStages = Array.from(new Set(investors.flatMap(i => i.investmentStage)));
  const allInterests = Array.from(new Set(investors.flatMap(i => i.investmentInterests)));
  
  // Filter investors based on search and filters
  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = searchQuery === '' || 
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.investmentInterests.some(interest => 
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesStages = selectedStages.length === 0 ||
      investor.investmentStage.some(stage => selectedStages.includes(stage));
    
    const matchesInterests = selectedInterests.length === 0 ||
      investor.investmentInterests.some(interest => selectedInterests.includes(interest));
    
    return matchesSearch && matchesStages && matchesInterests;
  });
  
  const toggleStage = (stage) => {
    setSelectedStages(prev => 
      prev.includes(stage)
        ? prev.filter(s => s !== stage)
        : [...prev, stage]
    );
  };
  
  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  return (
    
      
        Find Investors
        Connect with investors who match your startup's needs
      
      
      
        {/* Filters sidebar */}
        
          
            
              Filters
            
            
              
                Investment Stage
                
                  {allStages.map(stage => (
                     toggleStage(stage)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedStages.includes(stage)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {stage}
                    
                  ))}
                
              
              
              
                Investment Interests
                
                  {allInterests.map(interest => (
                     toggleInterest(interest)}
                    >
                      {interest}
                    
                  ))}
                
              
              
              
                Location
                
                  
                    
                    San Francisco, CA
                  
                  
                    
                    New York, NY
                  
                  
                    
                    Boston, MA
                  
                
              
            
          
        
        
        {/* Main content */}
        
          
             setSearchQuery(e.target.value)}
              startAdornment={}
              fullWidth
            />
            
            
              
              
                {filteredInvestors.length} results
              
            
          
          
          
            {filteredInvestors.map(investor => (
              
            ))}
          
        
      
    
  );
};
