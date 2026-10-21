import React, { useState, useEffect } from 'react';
import { Eye, ArrowDownLeft, Users, Gift, Zap, ArrowUpRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const BriefcaseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
  </svg>
);

const GoalIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
  </svg>
);

const CoinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const formatKes = (minor) => {
  const value = (minor || 0) / 100;
  return value.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [summaryRes, contribRes] = await Promise.all([
          api.getDashboardSummary(),
          api.getTransactions(),
        ]);
        setData(summaryRes.data);
        setContributions(contribRes.data.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="h-40 bg-gray-200 rounded-3xl" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-28 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
          <div className="h-28 bg-gray-200 rounded-2xl" />
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-10 h-10 mb-3" />
        <h3 className="font-bold text-lg">Unable to load data</h3>
        <p className="text-sm mt-1">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Retry</button>
      </div>
    );
  }

  const balances = data?.balances || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-[#dc2626] rounded-3xl p-6 relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[#fecaca] text-sm font-medium flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5" />
                Total Confirmed Contributions
                <Eye className="w-4 h-4 cursor-pointer ml-1" />
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                KSh {formatKes(balances.total_contributions_minor)}
              </h2>
            </div>
          </div>
          <p className="text-[#fecaca] text-xs">Your contributions are growing!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626] mb-2 sm:mb-3">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Paid Out</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            KSh {formatKes(balances.paid_out_minor)}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-[#f8f4fb] rounded-full flex items-center justify-center text-[#9333ea] mb-2 sm:mb-3">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Chama Pool Share</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">KSh {formatKes(balances.chama_share_minor)}</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center col-span-2 lg:col-span-1">
          <div className="w-8 h-8 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706] mb-2 sm:mb-3">
            <Gift className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-0.5">Pending Payout</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            KSh {formatKes(balances.pending_payout_minor)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 sm:gap-4">
        <Link to="/dashboard/contribute" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#dc2626] rounded-full flex items-center justify-center text-white shadow-md shadow-[#dc2626]/30">
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">Contribute</span>
        </Link>
        <Link to="/dashboard/payouts" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">Withdraw</span>
        </Link>
        <Link to="/dashboard/chama" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">My Chama</span>
        </Link>
        <Link to="/dashboard/goals" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
            <GoalIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-gray-700 text-center">Set Goal</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-900">Recent Contributions</h3>
          <Link to="/dashboard/contributions" className="text-sm text-[#dc2626] font-semibold hover:underline">View All</Link>
        </div>

        <div className="flex flex-col gap-4">
          {contributions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No contributions yet. Make your first contribution to get started.</p>
          ) : (
            contributions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#fee2e2] text-[#dc2626]">
                    <CoinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {tx.status === 'CONFIRMED' ? 'Confirmed contribution' : 'Pending contribution'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tx.confirmed_at ? new Date(tx.confirmed_at).toLocaleString() : new Date(tx.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#dc2626]">+ KSh {formatKes(tx.amount_minor)}</p>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      tx.status === 'CONFIRMED'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
