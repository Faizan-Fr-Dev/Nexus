import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { investors } from '../../data/users';

export const InvestorsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Find Investors</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Connect with investors who match your startup's needs</p>
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all"
        >
          <Filter size={18} className={showFilters ? 'text-primary-600' : 'text-gray-400'} />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Filters sidebar */}
        <div className={`lg:col-span-1 space-y-6 lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <Card className="sticky top-24 border-gray-100 shadow-sm overflow-hidden bg-white/50 backdrop-blur-md">
            <CardHeader className="bg-gray-50/50 border-b border-gray-100 py-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Filter size={18} className="text-primary-600" />
                Refine Search
              </h3>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                <div className="p-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Investment Stage</h4>
                  <div className="space-y-1.5">
                    {allStages.map(stage => (
                      <button
                        key={stage}
                        onClick={() => toggleStage(stage)}
                        className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          selectedStages.includes(stage)
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {allInterests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedInterests.includes(interest)
                            ? 'bg-primary-50 border-primary-200 text-primary-700 shadow-sm'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Top Locations</h4>
                  <div className="space-y-1">
                    {['San Francisco, CA', 'New York, NY', 'Boston, MA'].map(loc => (
                      <div key={loc} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 font-medium">
                        <MapPin size={16} className="text-primary-400" />
                        <span>{loc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {(selectedStages.length > 0 || selectedInterests.length > 0) && (
                <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    size="sm" 
                    className="text-xs font-bold text-gray-500 hover:text-red-600"
                    onClick={() => { setSelectedStages([]); setSelectedInterests([]); }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, industry or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={<Search size={18} className="text-gray-400" />}
                fullWidth
              />
            </div>
            
            <div className="flex items-center justify-between px-2 min-w-max">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredInvestors.length} investors
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredInvestors.length > 0 ? (
              filteredInvestors.map(investor => (
                <InvestorCard key={investor.id} investor={investor} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={40} className="text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No investors found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any investors matching your current filters. Try expanding your search criteria.</p>
                <Button 
                  variant="primary" 
                  className="mt-8 px-8 font-bold"
                  onClick={() => { setSearchQuery(''); setSelectedStages([]); setSelectedInterests([]); }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
