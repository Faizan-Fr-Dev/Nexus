import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Bell, Calendar, Clock, TrendingUp, AlertCircle, PlusCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';
import { getUpcomingMeetings } from '../../data/meetings';

export const EntrepreneurDashboard = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);

      // Load upcoming meetings
      const meetings = getUpcomingMeetings(user.id);
      setUpcomingMeetings(meetings);
    }
  }, [user]);

  const handleRequestStatusUpdate = (requestId, status) => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Welcome, {user.name}</h1>
          <p className="text-sm md:text-base text-gray-500 font-medium">Here's what's happening with your startup today</p>
        </div>

        <Link
          to="/investors"
          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle size={18} className="mr-2" />
          Find Investors
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-yellow-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending Requests</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">{pendingRequests.length}</h3>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Bell size={24} className="text-yellow-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Connections</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Users size={24} className="text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Upcoming Meetings</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">
                  {upcomingMeetings.length}
                </h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Calendar size={24} className="text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-white/50 backdrop-blur-sm">
          <CardBody className="p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Wallet Balance</p>
                <h3 className="text-3xl font-black text-gray-900 mt-2">$25,430</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <TrendingUp size={24} className="text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration requests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-gray-900">Collaboration Requests</h2>
              <Badge variant="warning">{pendingRequests.length} pending</Badge>
            </div>

            {collaborationRequests.length > 0 ? (
              <div className="space-y-4">
                {collaborationRequests.map(request => (
                  <CollaborationRequestCard
                    key={request.id}
                    request={request}
                    onStatusUpdate={handleRequestStatusUpdate}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-white/50 border-dashed border-2">
                <CardBody className="text-center py-16">
                  <div className="mx-auto h-16 w-16 bg-gray-50 flex items-center justify-center rounded-full text-gray-300 mb-4">
                    <AlertCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No collaboration requests yet</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto italic">
                    When investors are interested in your startup, their requests will appear here.
                  </p>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Confirmed Meetings Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
              <Link to="/schedule" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">
                Manage Schedule
              </Link>
            </div>

            {upcomingMeetings.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {upcomingMeetings.map(meeting => (
                    <div key={meeting.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-50 rounded-xl flex flex-col items-center justify-center text-primary-600 shrink-0 border border-primary-100">
                          <span className="text-[10px] font-black uppercase">{new Date(meeting.start).toLocaleDateString([], { month: 'short' })}</span>
                          <span className="text-lg font-black leading-none">{new Date(meeting.start).getDate()}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{meeting.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              <Clock size={12} />
                              {new Date(meeting.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <Badge variant="info" className="text-[8px] px-1.5 py-0">Confirmed</Badge>
                          </div>
                        </div>
                      </div>
                      <Link to="/schedule">
                        <Button variant="ghost" size="xs" className="font-bold">Details</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-sm text-gray-500 font-medium">No confirmed meetings scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Recommended investors */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold text-gray-900">Recommended</h2>
            <Link to="/investors" className="text-xs font-black text-primary-600 uppercase tracking-widest hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {recommendedInvestors.map(investor => (
              <InvestorCard key={investor.id} investor={investor} compact />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
