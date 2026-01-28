import React, { useState } from 'react';
import { Search, Filter, DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';

const deals = [
  {
    id: 1,
    startup: {
      name: 'TechWave AI',
      logo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      industry: 'FinTech'
    },
    amount: '$1.5M',
    equity: '15%',
    status: 'Due Diligence',
    stage: 'Series A',
    lastActivity: '2024-02-15'
  },
  {
    id: 2,
    startup: {
      name: 'GreenLife Solutions',
      logo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
      industry: 'CleanTech'
    },
    amount: '$2M',
    equity: '20%',
    status: 'Term Sheet',
    stage: 'Seed',
    lastActivity: '2024-02-10'
  },
  {
    id: 3,
    startup: {
      name: 'HealthPulse',
      logo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      industry: 'HealthTech'
    },
    amount: '$800K',
    equity: '12%',
    status: 'Negotiation',
    stage: 'Pre-seed',
    lastActivity: '2024-02-05'
  }
];

export const DealsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);
  
  const statuses = ['Due Diligence', 'Term Sheet', 'Negotiation', 'Closed', 'Passed'];
  
  const toggleStatus = (status) => {
    setSelectedStatus(prev => 
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Due Diligence':
        return 'primary';
      case 'Term Sheet':
        return 'secondary';
      case 'Negotiation':
        return 'accent';
      case 'Closed':
        return 'success';
      case 'Passed':
        return 'error';
      default:
        return 'gray';
    }
  };
  
  return (
    
      
        
          Investment Deals
          Track and manage your investment pipeline
        
        
        
          Add Deal
        
      
      
      {/* Stats */}
      
        
          
            
              
                
              
              
                Total Investment
                $4.3M
              
            
          
        
        
        
          
            
              
                
              
              
                Active Deals
                8
              
            
          
        
        
        
          
            
              
                
              
              
                Portfolio Companies
                12
              
            
          
        
        
        
          
            
              
                
              
              
                Closed This Month
                2
              
            
          
        
      
      
      {/* Filters */}
      
        
           setSearchQuery(e.target.value)}
            startAdornment={}
            fullWidth
          />
        
        
        
          
            
            
              {statuses.map(status => (
                 toggleStatus(status)}
                >
                  {status}
                
              ))}
            
          
        
      
      
      {/* Deals table */}
      
        
          Active Deals
        
        
          
            
              
                
                  
                    Startup
                  
                  
                    Amount
                  
                  
                    Equity
                  
                  
                    Status
                  
                  
                    Stage
                  
                  
                    Last Activity
                  
                  
                    Actions
                  
                
              
              
                {deals.map(deal => (
                  
                    
                      
                        
                        
                          
                            {deal.startup.name}
                          
                          
                            {deal.startup.industry}
                          
                        
                      
                    
                    
                      {deal.amount}
                    
                    
                      {deal.equity}
                    
                    
                      
                        {deal.status}
                      
                    
                    
                      {deal.stage}
                    
                    
                      
                        {new Date(deal.lastActivity).toLocaleDateString()}
                      
                    
                    
                      
                        View Details
                      
                    
                  
                ))}
              
            
          
        
      
    
  );
};
