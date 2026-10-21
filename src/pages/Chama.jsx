import React, { useState, useEffect } from 'react';
import { Users, Target, ShieldCheck, Calendar, TrendingUp, Award, RefreshCw, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const formatKes = (minor) =>
  ((minor || 0) / 100).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const Chama = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.getChamaDetails();
      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Could not load your chama details. Try again in a moment.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
        <div className="h-40 bg-gray-200 rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-200 rounded-2xl" />
          <div className="h-24 bg-gray-200 rounded-2xl" />
          <div className="h-24 bg-gray-200 rounded-2xl" />
          <div className="h-24 bg-gray-200 rounded-2xl" />
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
        <AlertCircle className="w-10 h-10 mb-3" />
        <h3 className="font-bold text-lg">Unable to load chama details</h3>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={load}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    );
  }

  const chama = data?.chama;
  const members = data?.members || [];
  const activities = data?.activities || [];

  if (!chama) {
    return (
      <div className="max-w-5xl mx-auto mt-10 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No chama yet</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          You are not yet part of a chama. Once you join one, its details will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Chama</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your group, view members, and track the collective pool.
          </p>
        </div>
        <button
          onClick={load}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 self-start"
        >
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="h-32 sm:h-40 bg-[#450a0a] relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {chama.verified ? 'Verified Group' : 'Pending Verification'}
          </div>
        </div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-10 sm:-mt-12 mb-4 gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white p-1.5 rounded-2xl shadow-md shrink-0">
              <div className="w-full h-full bg-[#fef2f2] rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#dc2626]" />
              </div>
            </div>
            {chama.next_payout_date && (
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Next payout: {chama.next_payout_date}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{chama.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Created {chama.created_date} • {chama.member_count} Active Members
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626] mb-2">
            <TrendingUp className="w-4 h-4" />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Total Pool Value</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            KSh {formatKes(chama.pool_value_minor)}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-[#f8f4fb] rounded-full flex items-center justify-center text-[#9333ea] mb-2">
            <Target className="w-4 h-4" />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Monthly Target</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            KSh {formatKes(chama.monthly_target_minor)}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706] mb-2">
            <Calendar className="w-4 h-4" />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Next Payout</p>
          <p className="text-lg sm:text-xl font-bold text-[#dc2626]">
            {chama.next_payout_days != null ? `${chama.next_payout_days} days` : 'Not scheduled'}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
            <Award className="w-4 h-4" />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">My Share</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            KSh {formatKes(chama.my_share_minor)}
          </p>
        </div>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('members')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'members'
              ? 'border-[#dc2626] text-[#dc2626]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Members Status
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'activity'
              ? 'border-[#dc2626] text-[#dc2626]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Group Activity
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
        {activeTab === 'members' && (
          <div className="space-y-4">
            <h4 className="font-bold text-gray-900">This Month's Contributions</h4>
            {members.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No member data available yet.
              </p>
            ) : (
              members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      member.status === 'Paid'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {member.status}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <h4 className="font-bold text-gray-900">Recent Group Activity</h4>
            {activities.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">
                No recent activity yet.
              </p>
            ) : (
              <div className="flex flex-col gap-5 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-[#dc2626] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-[#dc2626] rounded-full" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">
                        <span className="font-semibold">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chama;
