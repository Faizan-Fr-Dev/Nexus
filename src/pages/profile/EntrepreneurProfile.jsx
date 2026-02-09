import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Users, Calendar, Building2, MapPin, UserCircle, FileText, DollarSign, Send, ArrowLeft } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { findUserById } from '../../data/users';
import { createCollaborationRequest, getRequestsFromInvestor } from '../../data/collaborationRequests';

export const EntrepreneurProfile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  
  // Fetch entrepreneur data
  const entrepreneur = findUserById(id || '');
  
  if (!entrepreneur || entrepreneur.role !== 'entrepreneur') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Entrepreneur not found</h2>
        <p className="text-gray-600 mb-6">The entrepreneur profile you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard/entrepreneur">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
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
      window.location.reload();
    }
  };
  
  return (
    <div className="space-y-6">
      <Link to={isInvestor ? "/entrepreneurs" : "/dashboard/entrepreneur"} className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-500">
        <ArrowLeft size={16} className="mr-1" />
        Back
      </Link>

      {/* Profile header */}
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar src={entrepreneur.avatarUrl} alt={entrepreneur.name} size="xl" />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{entrepreneur.name}</h1>
              <div className="flex items-center text-gray-600 mt-1">
                <Building2 size={18} className="mr-2" />
                <span className="font-medium text-lg">Founder at {entrepreneur.startupName}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <Badge variant="primary">{entrepreneur.industry}</Badge>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin size={16} className="mr-1" />
                  {entrepreneur.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar size={16} className="mr-1" />
                  Founded {entrepreneur.foundedYear}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users size={16} className="mr-1" />
                  {entrepreneur.teamSize} team members
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              {!isCurrentUser && (
                <>
                  <Link to={`/chat/${entrepreneur.id}`} className="flex-1 md:flex-none">
                    <Button variant="outline" fullWidth className="flex items-center justify-center gap-2">
                      <MessageCircle size={18} />
                      Message
                    </Button>
                  </Link>
                  
                  {isInvestor && (
                    <Button 
                      variant="primary" 
                      className="flex-1 md:flex-none"
                      disabled={hasRequestedCollaboration}
                      onClick={handleSendRequest}
                    >
                      {hasRequestedCollaboration ? 'Request Sent' : 'Request Collaboration'}
                    </Button>
                  )}
                </>
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
                {entrepreneur.bio}
              </p>
            </CardBody>
          </Card>
          
          {/* Startup Description */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Startup Overview</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 underline decoration-primary-200 underline-offset-4">Problem Statement</h4>
                  <p className="text-gray-700">
                    {entrepreneur.pitchSummary.split('.')[0]}.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 underline decoration-primary-200 underline-offset-4">Solution</h4>
                  <p className="text-gray-700">
                    {entrepreneur.pitchSummary}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 underline decoration-primary-200 underline-offset-4">Market Opportunity</h4>
                  <p className="text-gray-700">
                    The {entrepreneur.industry} market is experiencing significant growth, with our solution addressing key pain points in this expanding segment.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 underline decoration-primary-200 underline-offset-4">Competitive Advantage</h4>
                  <p className="text-gray-700">
                    Unlike our competitors, we offer a unique approach that combines innovative technology with deep industry expertise.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Team */}
          <Card>
            <CardHeader className="border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900">Team</h3>
              <Badge variant="secondary">{entrepreneur.teamSize} members</Badge>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <Avatar size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{entrepreneur.name}</p>
                    <p className="text-xs text-gray-500">Founder & CEO</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <Avatar size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Alex Johnson</p>
                    <p className="text-xs text-gray-500">CTO</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                  <Avatar size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Jessica Chen</p>
                    <p className="text-xs text-gray-500">Head of Product</p>
                  </div>
                </div>
                
                {entrepreneur.teamSize > 3 && (
                  <div className="flex items-center justify-center p-3 border border-dashed border-gray-200 rounded-lg text-xs text-gray-500">
                    + {entrepreneur.teamSize - 3} more team members
                  </div>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          {/* Funding Details */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Funding</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 italic">Current Round</span>
                  <div className="flex items-center font-bold text-primary-700">
                    <DollarSign size={16} />
                    {entrepreneur.fundingNeeded}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 italic">Valuation</span>
                  <span className="font-medium">$8M - $12M</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 italic">Previous Funding</span>
                  <span className="font-medium">$750K Seed (2022)</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Funding Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 font-medium">Pre-seed</span>
                      <Badge variant="success" size="sm">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 font-medium">Seed</span>
                      <Badge variant="success" size="sm">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-700 font-medium">Series A</span>
                      <Badge variant="warning" size="sm">In Progress</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Documents */}
          <Card>
            <CardHeader className="border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Documents</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-50 p-2 rounded text-red-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Pitch Deck</p>
                      <p className="text-xs text-gray-500">Updated 2 months ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-2 rounded text-blue-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Business Plan</p>
                      <p className="text-xs text-gray-500">Updated 1 month ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded text-green-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Financial Projections</p>
                      <p className="text-xs text-gray-500">Updated 2 weeks ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              </div>
              
              {!isCurrentUser && isInvestor && (
                <div className="mt-6 bg-primary-50 p-4 rounded-lg border border-primary-100">
                  <p className="text-xs text-primary-800 italic mb-4">
                    Request access to detailed documents and financials by sending a collaboration request.
                  </p>
                  
                  {!hasRequestedCollaboration ? (
                    <Button variant="primary" fullWidth size="sm" onClick={handleSendRequest}>
                      Request Collaboration
                    </Button>
                  ) : (
                    <Button variant="primary" fullWidth size="sm" disabled>
                      Request Sent
                    </Button>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
