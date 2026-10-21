import React from 'react';
import { Gift, Star, Trophy, ShieldCheck, Smartphone, Zap } from 'lucide-react';

const Rewards = () => {
  const rewards = [
    { id: 1, title: 'KSh 50 Airtime', points: 500, icon: <Smartphone className="w-6 h-6 text-blue-500" />, available: true },
    { id: 2, title: 'Free Withdrawal Fee', points: 800, icon: <Zap className="w-6 h-6 text-amber-500" />, available: true },
    { id: 3, title: 'KSh 200 M-Pesa Cash', points: 2000, icon: <Gift className="w-6 h-6 text-green-500" />, available: false },
    { id: 4, title: 'Premium Badge', points: 5000, icon: <ShieldCheck className="w-6 h-6 text-purple-500" />, available: false },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Rewards & Points</h2>
        <p className="text-sm text-gray-500 mt-1">Earn points as you save and redeem exclusive perks.</p>
      </div>

      <div className="bg-gradient-to-r from-[#dc2626] to-[#991b1b] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-lg flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        <div className="relative z-10 text-center sm:text-left">
          <p className="text-[#fecaca] text-sm font-medium mb-1">Your Points Balance</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <Star className="w-8 h-8 text-[#fbbf24] fill-[#fbbf24]" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white">1,250</h2>
          </div>
          <p className="text-white/80 text-xs">You are 750 points away from the next tier!</p>
        </div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center min-w-[140px]">
          <Trophy className="w-8 h-8 text-[#fbbf24] mb-2" />
          <p className="text-white text-sm font-bold">Silver Tier</p>
          <div className="w-full bg-black/20 rounded-full h-1.5 mt-2">
            <div className="bg-[#fbbf24] h-1.5 rounded-full" style={{ width: '62%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-bold text-gray-900">How to Earn Points</h3>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Daily Contribution</p>
              <p className="text-xs text-gray-500 mt-1">Earn 10 points for every day you contribute.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626] shrink-0">
              <Star className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Refer a Friend</p>
              <p className="text-xs text-gray-500 mt-1">Get 100 points when a friend joins using your code.</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-gray-900">Redeem Rewards</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                    {reward.icon}
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{reward.title}</h4>
                  <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                    <Star className="w-3 h-3 text-[#fbbf24] fill-[#fbbf24]" /> {reward.points} points
                  </div>
                </div>
                <button 
                  disabled={!reward.available}
                  className={`w-full mt-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                    reward.available ? 'bg-[#fef2f2] text-[#dc2626] hover:bg-[#fee2e2]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {reward.available ? 'Redeem Now' : 'Not Enough Points'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
