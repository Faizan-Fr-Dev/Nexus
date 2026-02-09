import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Building2, MapPin, UserCircle, BarChart3, Briefcase, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';

export const InvestorProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  // Fetch investor data
  const investor = findUserById(id || '');
  
  if (!investor || investor.role !== 'investor') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Investor not found</h2>
        <p className="text-gray-600 mb-6">The investor profile you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard/investor">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }
  
  const isCurrentUser = currentUser?.id === investor.id;
  
  return (
    <div className="space-y-6">
      <Link to={currentUser?.role === 'entrepreneur' ? "/investors" : "/dashboard/investor"} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
        <ArrowLeft size={16} className="mr-1" />
        Back
      </Link>

      {/* Profile header */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar src={investor.avatarUrl} alt={investor.name} size="xl" />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{investor.name}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <Briefcase size={18} className="mr-2" />
                <span className="font-medium text-lg">Investor • {investor.totalInvestments} investments</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  San Francisco, CA
                </div>
                {investor.investmentStage.map((stage, index) => (
                  <Badge key={index} variant="secondary">{stage}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              {!isCurrentUser && (
                <Link to={`/chat/${investor.id}`} className="flex-1 md:flex-none">
                  <Button variant="primary" fullWidth className="flex items-center justify-center gap-2">
                    <MessageCircle size={18} />
                    Message
                  </Button>
                </Link>
              )}
              
              {isCurrentUser && (
                <Button variant="outline" className="flex-1 md:flex-none">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - left side */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">About</h3>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {investor.bio}
              </p>
            </CardBody>
          </Card>
          
          {/* Investment Interests */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Investment Interests</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 underline decoration-primary-200 underline-offset-4">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentInterests.map((interest, index) => (
                      <Badge key={index} variant="outline">{interest}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 underline decoration-primary-200 underline-offset-4">Investment Stages</h4>
                  <div className="flex flex-wrap gap-2">
                    {investor.investmentStage.map((stage, index) => (
                      <Badge key={index} variant="secondary">{stage}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 underline decoration-primary-200 underline-offset-4">Investment Criteria</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Strong founding team with domain expertise and a clear vision.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Clear market opportunity with a large TAM and demonstrated product-market fit.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Scalable business model with efficient and strong unit economics.</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Potential for significant long-term growth and substantial market impact.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Portfolio Companies */}
          <Card>
            <CardHeader className="border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Portfolio Companies</h3>
              <Badge variant="secondary">{investor.portfolioCompanies.length} companies</Badge>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investor.portfolioCompanies.map((company, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50/50">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Building2 className="text-primary-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{company}</h4>
                      <p className="text-xs text-gray-500">Invested in 2022</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          {/* Investment Details */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Investment Details</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Investment Range</p>
                  <p className="text-lg font-bold text-gray-900 italic">
                    {investor.minimumInvestment} - {investor.maximumInvestment}
                  </p>
                </div>
                
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500 italic">Total Investments</span>
                  <span className="font-semibold">{investor.totalInvestments} companies</span>
                </div>
                
                <div className="flex justify-between items-center text-sm py-2 border-b border-gray-100">
                  <span className="text-gray-500 italic">Typical Timeline</span>
                  <span className="font-semibold text-primary-700">3-5 years</span>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 underline underline-offset-4 decoration-primary-200">Investment Focus</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">SaaS & B2B</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary-500 h-full w-[85%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">FinTech</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary-500 h-full w-[60%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">HealthTech</span>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary-500 h-full w-[45%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Stats */}
          <Card className="bg-primary-600 text-white border-none shadow-primary-200">
            <CardHeader border={false}>
              <h3 className="font-semibold text-white flex items-center gap-2">
                <BarChart3 size={20} />
                Investment Stats
              </h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-primary-500/30 p-3 rounded-lg">
                  <div className="bg-white/10 p-2 rounded">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-primary-100">Successful Exits</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-primary-500/30 p-3 rounded-lg">
                  <div className="bg-white/10 p-2 rounded">
                    <DollarSign size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">3.2x</p>
                    <p className="text-xs text-primary-100">Avg. ROI</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-primary-500/30 p-3 rounded-lg">
                  <div className="bg-white/10 p-2 rounded">
                    <Briefcase size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{investor.portfolioCompanies.length}</p>
                    <p className="text-xs text-primary-100">Active Investments</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
