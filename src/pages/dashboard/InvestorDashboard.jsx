import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, PieChart, Filter, Search, PlusCircle, Calendar, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';
import { getUpcomingMeetings } from '../../data/meetings';

export const InvestorDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    if (user) {
      // Load upcoming meetings
      const meetings = getUpcomingMeetings(user.id);
      setUpcomingMeetings(meetings);
    }
  }, [user]);

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
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Discover Startups</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium tracking-tight">Find and connect with promising entrepreneurs</p>
        </div>

        <Link
          to="/entrepreneurs"
          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle size={18} className="mr-2" />
          View All Startups
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-full lg:w-[400px]">
          <Input
            placeholder="Search by name, startup or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
          <div className="flex items-center gap-2 text-gray-500 min-w-max">
            <Filter size={18} className="text-primary-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Industry:</span>
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2">
              {industries.map(industry => (
                <button
                  key={industry}
                  onClick={() => toggleIndustry(industry)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all whitespace-nowrap ${selectedIndustries.includes(industry)
                      ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-100'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 hover:border-gray-200'
                    }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-yellow-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Startups</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">{entrepreneurs.length}</h3>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Users size={24} className="text-yellow-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wallet Balance</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">$2,500,000</h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <PieChart size={24} className="text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Connections</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users size={24} className="text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upcoming Meetings</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">
                  {upcomingMeetings.length}
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Calendar size={24} className="text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Entrepreneurs grid and Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              Featured Startups
              <span className="text-sm font-medium text-gray-400">({filteredEntrepreneurs.length})</span>
            </h2>
            {filteredEntrepreneurs.length < entrepreneurs.length && (
              <button
                onClick={() => { setSearchQuery(''); setSelectedIndustries([]); }}
                className="text-[10px] font-bold text-primary-600 uppercase tracking-widest hover:underline"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredEntrepreneurs.length > 0 ? (
              <>
                {filteredEntrepreneurs.map(entrepreneur => (
                  <EntrepreneurCard
                    key={entrepreneur.id}
                    entrepreneur={entrepreneur}
                    hasRequested={requestedEntrepreneurIds.includes(entrepreneur.id)}
                  />
                ))}
              </>
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-sm mb-4">
                  <Search size={32} className="text-gray-200" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No matches found</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto italic">Try adjusting your filters or search terms to find what you're looking for.</p>
                <Button
                  variant="primary"
                  size="sm"
                  className="mt-6 font-bold"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedIndustries([]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Meetings */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Upcoming Meetings</h2>
            <Link to="/schedule">
              <Calendar size={18} className="text-primary-600 hover:scale-110 transition-transform cursor-pointer" />
            </Link>
          </div>

          {upcomingMeetings.length > 0 ? (
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {upcomingMeetings.map(meeting => (
                  <div key={meeting.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary-100 group-hover:scale-105 transition-transform">
                        <Calendar size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{meeting.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(meeting.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50/50 border-t border-gray-100">
                <Link to="/schedule">
                  <Button variant="ghost" fullWidth size="sm" className="font-bold text-primary-600">Open Full Schedule</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">No sessions found today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
