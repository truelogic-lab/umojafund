import React, { useEffect, useState } from 'react';
import { CheckCircle2, Wallet, AlertCircle, Clock } from 'lucide-react';
import { api } from '../services/api';

const formatKes = (minor) =>
  ((minor || 0) / 100).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Payouts = () => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getDashboardSummary();
        setSummary(res.data.balances);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load payouts.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="max-w-5xl mx-auto py-12 text-center text-gray-500 text-sm">Loading payouts...</div>;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex flex-col items-center text-center">
        <AlertCircle className="w-10 h-10 mb-3" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payouts</h2>
          <p className="text-sm text-gray-500 mt-1">Your historical payouts from the Umoja Fund pool.</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3 w-fit">
          <div className="w-10 h-10 bg-[#fef2f2] rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-[#dc2626]" />
          </div>
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Paid Out</p>
            <p className="text-lg font-bold text-gray-900">KSh {formatKes(summary?.paid_out_minor)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-[#e6f4eb] rounded-full flex items-center justify-center text-[#0f7a4d] mb-3">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Confirmed Payouts</p>
          <p className="text-2xl font-bold text-gray-900">KSh {formatKes(summary?.paid_out_minor)}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706] mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs text-gray-500 mb-1">Pending Payout</p>
          <p className="text-2xl font-bold text-gray-900">KSh {formatKes(summary?.pending_payout_minor)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-4">Payout History</h3>
        {summary?.paid_out_minor > 0 ? (
          <div className="py-2 text-sm text-gray-600">
            Your payouts are recorded in the ledger and will appear here once displayed from the API.
          </div>
        ) : (
          <div className="py-8 text-center">
            <Wallet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-600">No payouts yet.</p>
            <p className="text-xs text-gray-400 mt-1">Payouts are processed at the end of each fund period.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payouts;
