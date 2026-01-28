import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { entrepreneurs } from '../../data/users';

export const EntrepreneursPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedFundingRange, setSelectedFundingRange] = useState([]);
  
  // Get unique industries and funding ranges
  const allIndustries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  const fundingRanges = [' $5M'];
  
  // Filter entrepreneurs based on search and filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    const matchesSearch = searchQuery === '' || 
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);
    
    // Simple funding range filter based on the amount string
    const matchesFunding = selectedFundingRange.length === 0 || 
      selectedFundingRange.some(range => {
        const amount = parseInt(entrepreneur.fundingNeeded.replace(/[^0-9]/g, ''));
        switch (range) {
          case '= 500 && amount  1000 && amount  $5M': return amount > 5000;
          default: return true;
        }
      });
    
    return matchesSearch && matchesIndustry && matchesFunding;
  });
  
  const toggleIndustry = (industry) => {
    setSelectedIndustries(prev => 
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };
  
  const toggleFundingRange = (range) => {
    setSelectedFundingRange(prev => 
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };
  
  return (
    
      
        Find Startups
        Discover promising startups looking for investment
      
      
      
        {/* Filters sidebar */}
        
          
            
              Filters
            
            
              
                Industry
                
                  {allIndustries.map(industry => (
                     toggleIndustry(industry)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedIndustries.includes(industry)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {industry}
                    
                  ))}
                
              
              
              
                Funding Range
                
                  {fundingRanges.map(range => (
                     toggleFundingRange(range)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedFundingRange.includes(range)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {range}
                    
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
            
            
              
              
                {filteredEntrepreneurs.length} results
              
            
          
          
          
            {filteredEntrepreneurs.map(entrepreneur => (
              
            ))}
          
        
      
    
  );
};
