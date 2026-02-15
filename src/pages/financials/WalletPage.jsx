import React, { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, RefreshCw, DollarSign, Wallet, Send, Plus } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export const WalletPage = () => {
    const { user } = useAuth();
    const [balance, setBalance] = useState(25430.00);
    const [activeTab, setActiveTab] = useState('overview');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);

    // Mock Transaction Data
    const [transactions, setTransactions] = useState([
        { id: 'tx_1', type: 'received', description: 'Investment from Michael R.', amount: 50000.00, date: '2024-02-14', status: 'completed' },
        { id: 'tx_2', type: 'sent', description: 'Server Infrastructure AWS', amount: 2450.00, date: '2024-02-12', status: 'completed' },
        { id: 'tx_3', type: 'received', description: 'Consulting Fee', amount: 1500.00, date: '2024-02-10', status: 'completed' },
        { id: 'tx_4', type: 'sent', description: 'Legal Services', amount: 5000.00, date: '2024-02-08', status: 'pending' },
    ]);

    const handleDeposited = (amount) => {
        setBalance(prev => prev + parseFloat(amount));
        const newTx = {
            id: `tx_${Date.now()}`,
            type: 'received',
            description: 'Funds Deposit',
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };
        setTransactions([newTx, ...transactions]);
        setShowDepositModal(false);
    };

    const handleWithdrawn = (amount) => {
        if (parseFloat(amount) > balance) return alert("Insufficient funds");
        setBalance(prev => prev - parseFloat(amount));
        const newTx = {
            id: `tx_${Date.now()}`,
            type: 'sent',
            description: 'Withdrawal to Bank Account',
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };
        setTransactions([newTx, ...transactions]);
        setShowWithdrawModal(false);
    };

    const handleTransfer = (amount, recipient) => {
        if (parseFloat(amount) > balance) return alert("Insufficient funds");
        setBalance(prev => prev - parseFloat(amount));
        const newTx = {
            id: `tx_${Date.now()}`,
            type: 'sent',
            description: `Transfer to ${recipient}`,
            amount: parseFloat(amount),
            date: new Date().toISOString().split('T')[0],
            status: 'completed'
        };
        setTransactions([newTx, ...transactions]);
        setShowTransferModal(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Financial Wallet</h1>
                    <p className="text-gray-600">Manage your investments and funds</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowWithdrawModal(true)} leftIcon={<ArrowUpRight size={18} />}>Withdraw</Button>
                    <Button variant="primary" onClick={() => setShowDepositModal(true)} leftIcon={<Plus size={18} />}>Add Funds</Button>
                </div>
            </div>

            {/* Wallet Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Balance Card */}
                <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none shadow-xl col-span-1 md:col-span-2">
                    <CardBody className="p-8 flex flex-col justify-between h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-primary-100 font-medium mb-1">Total Balance</p>
                                <h2 className="text-4xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                            </div>
                            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                <Wallet size={32} className="text-white" />
                            </div>
                        </div>
                        <div className="mt-8 flex gap-8">
                            <div>
                                <p className="text-primary-200 text-sm mb-1">Account Holder</p>
                                <p className="font-semibold text-lg">{user?.name || 'User Name'}</p>
                            </div>
                            <div>
                                <p className="text-primary-200 text-sm mb-1">Account Number</p>
                                <p className="font-mono font-semibold text-lg">**** **** **** 4289</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Quick Actions / Stats */}
                <div className="space-y-6">
                    <Card className="flex-1">
                        <CardBody className="p-6 flex items-center gap-4">
                            <div className="p-4 rounded-full bg-green-100 text-green-600">
                                <ArrowDownLeft size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Income (Monthly)</p>
                                <p className="text-xl font-bold text-gray-900">+$12,450.00</p>
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="flex-1">
                        <CardBody className="p-6 flex items-center gap-4">
                            <div className="p-4 rounded-full bg-red-100 text-red-600">
                                <ArrowUpRight size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Expenses (Monthly)</p>
                                <p className="text-xl font-bold text-gray-900">-$3,200.00</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Transactions Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center w-full">
                                <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
                                <Button variant="ghost" size="sm">View All</Button>
                            </div>
                        </CardHeader>
                        <div className="divide-y divide-gray-100">
                            {transactions.map(tx => (
                                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${tx.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {tx.type === 'received' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{tx.description}</p>
                                            <p className="text-sm text-gray-500">{tx.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${tx.type === 'received' ? 'text-green-600' : 'text-gray-900'}`}>
                                            {tx.type === 'received' ? '+' : '-'}${tx.amount.toLocaleString()}
                                        </p>
                                        <Badge variant={tx.status === 'completed' ? 'success' : 'warning'} className="text-[10px] px-1.5 py-0">
                                            {tx.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Transfer Money Simple Form */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <h3 className="text-lg font-bold text-gray-900">Quick Transfer</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="space-y-4">
                                <Input label="Recipient Email" placeholder="email@example.com" fullWidth />
                                <Input label="Amount" type="number" placeholder="0.00" startAdornment={<span className="text-gray-500">$</span>} fullWidth />
                                <Button variant="primary" fullWidth leftIcon={<Send size={18} />}>Send Money</Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Modals (Simple Implementations) */}
            {showDepositModal && (
                <TransactionModal
                    title="Add Funds"
                    onClose={() => setShowDepositModal(false)}
                    onSubmit={handleDeposited}
                    actionLabel="Deposit"
                />
            )}
            {showWithdrawModal && (
                <TransactionModal
                    title="Withdraw Funds"
                    onClose={() => setShowWithdrawModal(false)}
                    onSubmit={handleWithdrawn}
                    actionLabel="Withdraw"
                />
            )}
        </div>
    );
};

// Helper Modal Component
const TransactionModal = ({ title, onClose, onSubmit, actionLabel }) => {
    const [amount, setAmount] = useState('');

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                    fullWidth
                    className="mb-6"
                />
                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={() => onSubmit(amount)}>{actionLabel}</Button>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
