import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { entrepreneurs } from '../../data/users';

export const EntrepreneursPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedFundingRange, setSelectedFundingRange] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique industries and funding ranges
  const allIndustries = Array.from(new Set(entrepreneurs.map(e => e.industry)));
  const fundingRanges = ['< $500k', '$500k - $1M', '$1M - $5M', '> $5M'];
  
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
          case '< $500k': return amount < 500;
          case '$500k - $1M': return amount >= 500 && amount <= 1000;
          case '$1M - $5M': return amount > 1000 && amount <= 5000;
          case '> $5M': return amount > 5000;
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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Find Startups</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Discover promising startups looking for investment</p>
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
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Industries</h4>
                  <div className="space-y-1.5">
                    {allIndustries.map(industry => (
                      <button
                        key={industry}
                        onClick={() => toggleIndustry(industry)}
                        className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          selectedIndustries.includes(industry)
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'
                        }`}
                      >
                        {industry}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Funding Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {fundingRanges.map(range => (
                      <button
                        key={range}
                        onClick={() => toggleFundingRange(range)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedFundingRange.includes(range)
                            ? 'bg-primary-50 border-primary-200 text-primary-700 shadow-sm'
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="p-5">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Location</h4>
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

              {(selectedIndustries.length > 0 || selectedFundingRange.length > 0) && (
                <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                  <Button 
                    variant="ghost" 
                    fullWidth 
                    size="sm" 
                    className="text-xs font-bold text-gray-500 hover:text-red-600"
                    onClick={() => { setSelectedIndustries([]); setSelectedFundingRange([]); }}
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
                placeholder="Search by name, startup or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startAdornment={<Search size={18} className="text-gray-400" />}
                fullWidth
              />
            </div>
            
            <div className="flex items-center justify-between px-2 min-w-max">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing {filteredEntrepreneurs.length} startups
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEntrepreneurs.length > 0 ? (
              filteredEntrepreneurs.map(entrepreneur => (
                <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={40} className="text-gray-200" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No startups found</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">We couldn't find any startups matching your current filters. Try expanding your search criteria.</p>
                <Button 
                  variant="primary" 
                  className="mt-8 px-8 font-bold"
                  onClick={() => { setSearchQuery(''); setSelectedIndustries([]); setSelectedFundingRange([]); }}
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
