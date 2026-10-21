import React from 'react';
import { Users, CreditCard, ArrowRightLeft, Clock, TrendingUp, FileText, Settings, UserPlus } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';

const AdminDashboard = () => {
  const contributionData = [
    { name: 'Oct 9', amount: 150000 }, { name: 'Oct 10', amount: 180000 },
    { name: 'Oct 11', amount: 170000 }, { name: 'Oct 12', amount: 250000 },
    { name: 'Oct 13', amount: 280000 }, { name: 'Oct 14', amount: 260000 },
    { name: 'Oct 15', amount: 350000 },
  ];

  const memberGrowthData = [
    { name: 'Sep 30', count: 30000 }, { name: 'Oct 3', count: 45000 },
    { name: 'Oct 6', count: 50000 }, { name: 'Oct 9', count: 60000 },
    { name: 'Oct 12', count: 85000 }, { name: 'Oct 15', count: 100482 },
  ];

  const payoutData = [
    { name: 'Completed', value: 1760400, color: '#10b981' },
    { name: 'Pending', value: 420000, color: '#f59e0b' },
    { name: 'Failed', value: 0, color: '#ef4444' },
  ];

  const recentTransactions = [
    { id: 1, name: 'Mercy Wanjiru', type: 'Contribution', amount: 2.00, status: 'Completed', time: '09:42 AM', color: 'bg-green-100 text-green-700' },
    { id: 2, name: 'Kevin Otieno', type: 'Payout', amount: 60.00, status: 'Completed', time: '09:31 AM', color: 'bg-purple-100 text-purple-700' },
    { id: 3, name: 'Aisha Njeri', type: 'Contribution', amount: 2.00, status: 'Completed', time: '08:55 AM', color: 'bg-green-100 text-green-700' },
  ];

  const activities = [
    { id: 1, text: 'New member registered: Faith Njeri', time: '2m ago' },
    { id: 2, text: 'Payout processed for 1,250 members', time: '8m ago' },
    { id: 3, text: 'Contribution received: KSh 2.00 from James Kamau', time: '12m ago' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, Admin 👋</h2>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening with Umoja Fund today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 bg-[#e6f4eb] rounded-full flex items-center justify-center text-[#1a472a]"><Users className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +2,350</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Total Members</p>
          <p className="text-2xl font-bold text-gray-900">100,482</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 bg-[#e6f4eb] rounded-full flex items-center justify-center text-[#1a472a]"><CreditCard className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +18%</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Total Contributions</p>
          <p className="text-2xl font-bold text-gray-900">KSh 2,845,600</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 bg-[#e6f4eb] rounded-full flex items-center justify-center text-[#1a472a]"><ArrowRightLeft className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12%</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Total Payouts</p>
          <p className="text-2xl font-bold text-gray-900">KSh 1,980,400</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706]"><Clock className="w-5 h-5" /></div>
            <span className="text-xs font-medium text-gray-500">12,450 members</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Pending Payouts</p>
          <p className="text-2xl font-bold text-gray-900">KSh 420,000</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gray-400" /> Contributions Overview</h3>
            <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 text-gray-600 bg-gray-50"><option>Last 7 Days</option></select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} tickFormatter={(value) => `KSh ${value / 1000}k`} />
                <Tooltip formatter={(value) => [`KSh ${value.toLocaleString()}`, 'Amount']} />
                <Line type="monotone" dataKey="amount" stroke="#1a472a" strokeWidth={2} dot={{ r: 4, fill: '#1a472a' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-gray-900 mb-2">Payout Distribution</h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={payoutData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                    {payoutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => `KSh ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-xl font-bold text-gray-900">KSh 1.98M</p>
              <p className="text-[10px] text-gray-500">Total Paid</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 flex justify-between items-center border-b border-gray-50">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400" /> Recent Transactions</h3>
            <a href="#" className="text-xs text-[#1a472a] font-bold hover:underline">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider">
                <tr><th className="px-5 py-3">Member</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Amount</th><th className="px-5 py-3">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">{tx.name.charAt(0)}</div>
                        <div><p className="text-xs font-bold text-gray-900">{tx.name}</p><p className="text-[10px] text-gray-500">{tx.time}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-md ${tx.color}`}>{tx.type}</span></td>
                    <td className="px-5 py-3 text-xs font-bold text-gray-900">KSh {tx.amount.toFixed(2)}</td>
                    <td className="px-5 py-3"><span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">{tx.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-[#e6f4eb] rounded-xl group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a472a] shadow-sm group-hover:bg-[#1a472a] group-hover:text-white"><UserPlus className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold">Add Member</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-[#e6f4eb] rounded-xl group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a472a] shadow-sm group-hover:bg-[#1a472a] group-hover:text-white"><ArrowRightLeft className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold">Payouts</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-[#e6f4eb] rounded-xl group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a472a] shadow-sm group-hover:bg-[#1a472a] group-hover:text-white"><FileText className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold">Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 hover:bg-[#e6f4eb] rounded-xl group">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#1a472a] shadow-sm group-hover:bg-[#1a472a] group-hover:text-white"><Settings className="w-4 h-4" /></div>
              <span className="text-[10px] font-bold">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
