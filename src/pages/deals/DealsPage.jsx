import React, { useState } from 'react';
import { Search, Filter, DollarSign, TrendingUp, Users, Calendar, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';

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
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showFundModal, setShowFundModal] = useState(false);

  const statuses = ['Due Diligence', 'Term Sheet', 'Negotiation', 'Closed', 'Passed'];

  const toggleStatus = (status) => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Due Diligence': return 'primary';
      case 'Term Sheet': return 'secondary';
      case 'Negotiation': return 'warning';
      case 'Closed': return 'success';
      case 'Passed': return 'danger';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Investment Deals</h1>
          <p className="text-gray-600">Track and manage your investment pipeline</p>
        </div>
        <Button variant="primary">Add Deal</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 rounded-lg text-primary-600">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Investment</p>
              <h3 className="text-xl font-bold text-gray-900">$4.3M</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Deals</p>
              <h3 className="text-xl font-bold text-gray-900">8</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Portfolio Companies</p>
              <h3 className="text-xl font-bold text-gray-900">12</h3>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Closed This Month</p>
              <h3 className="text-xl font-bold text-gray-900">2</h3>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full md:w-96">
          <Input
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<Search size={18} className="text-gray-400" />}
            fullWidth
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          <Filter size={18} className="text-gray-500" />
          <div className="flex gap-2">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors whitespace-nowrap ${selectedStatus.includes(status)
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Deals table */}
      <Card>
        <CardHeader border={false}>
          <h2 className="text-lg font-semibold text-gray-900">Active Deals</h2>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Startup</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Equity</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={deal.startup.logo} size="sm" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{deal.startup.name}</p>
                        <p className="text-xs text-gray-500">{deal.startup.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{deal.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{deal.equity}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusVariant(deal.status)}>{deal.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-center flex gap-2 justify-center">
                    <Button variant="ghost" size="sm">View Details</Button>
                    {user?.role === 'investor' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => { setSelectedDeal(deal); setShowFundModal(true); }}
                      >
                        Fund
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Fund Modal */}
      {showFundModal && selectedDeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-2">Fund {selectedDeal.startup.name}</h3>
            <p className="text-gray-500 mb-6">You are about to fund this deal.</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold">{selectedDeal.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Equity:</span>
                <span className="font-bold">{selectedDeal.equity}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowFundModal(false)}>Cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert(`Successfully funded ${selectedDeal.startup.name} for ${selectedDeal.amount}!`);
                  setShowFundModal(false);
                }}
              >
                Confirm Funding
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
