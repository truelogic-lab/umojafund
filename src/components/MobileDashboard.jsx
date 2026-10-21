import React from 'react';
import { Home, CreditCard, Clock, Users, Gift, User, Settings, HelpCircle, LogOut, Bell, Eye, ArrowUpRight, ArrowDownLeft, Zap, Target } from 'lucide-react';

const MobileDashboard = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans">
      <aside className="hidden lg:flex flex-col w-64 bg-[#450a0a] text-white py-6 px-4">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-cover"
              onContextMenu={(e) => e.preventDefault()}
              style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight">Umoja Fund</span>
            <span className="text-[7px] text-gray-400 font-semibold tracking-[0.2em] mt-1 uppercase">Together We Grow</span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#dc2626]/20 p-2 rounded-xl mb-6 border border-[#dc2626]/30">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center shrink-0">
             <User className="w-6 h-6 text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-semibold">Amina Wanjiku</p>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              <span className="text-[10px] text-gray-300">Verified</span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          <a href="#" className="flex items-center gap-3 bg-[#dc2626] text-white px-4 py-3 rounded-xl font-medium text-sm">
            <Home className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <CreditCard className="w-5 h-5" /> Contribute
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <Clock className="w-5 h-5" /> My Contributions
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <ArrowUpRight className="w-5 h-5" /> Payouts
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <Users className="w-5 h-5" /> My Chama
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <Target className="w-5 h-5" /> Goals
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <Gift className="w-5 h-5" /> Rewards
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <User className="w-5 h-5" /> Profile
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <Settings className="w-5 h-5" /> Settings
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors">
            <HelpCircle className="w-5 h-5" /> Help & Support
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors mt-auto border-t border-white/10 pt-4">
            <LogOut className="w-5 h-5" /> Log Out
          </a>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Good Morning, Amina 👋</h1>
            <p className="text-sm text-gray-500 mt-1">Together we build a better tomorrow.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 bg-[#fef2f2] rounded-full text-[#dc2626]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
               <img 
                 src="/logo.jpg" 
                 alt="User Avatar" 
                 className="w-full h-full object-cover"
                 onContextMenu={(e) => e.preventDefault()}
                 style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none', pointerEvents: 'none' }}
               />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-24 lg:pb-6">
          
          <div className="bg-[#dc2626] rounded-3xl p-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[#fecaca] text-sm font-medium flex items-center gap-2">Total Balance <Eye className="w-4 h-4 cursor-pointer" /></p>
                  <h2 className="text-4xl font-bold text-white mt-1">KSh 120.00</h2>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors">
                  View Details
                </button>
              </div>
              <p className="text-[#fecaca] text-xs">Your contributions are growing!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="w-8 h-8 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626] mb-3">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Personal Savings</p>
              <p className="text-xl font-bold text-gray-900">KSh 60.00</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="w-8 h-8 bg-[#f8f4fb] rounded-full flex items-center justify-center text-[#9333ea] mb-3">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Chama Pool Share</p>
              <p className="text-xl font-bold text-gray-900">KSh 45.00</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <div className="w-8 h-8 bg-[#fef3c7] rounded-full flex items-center justify-center text-[#d97706] mb-3">
                <Gift className="w-4 h-4" />
              </div>
              <p className="text-sm text-gray-500 mb-1">Pending Payout</p>
              <p className="text-xl font-bold text-gray-900">KSh 15.00</p>
            </div>
          </div>

          <div className="bg-[#fef2f2] rounded-2xl p-5 border border-[#fee2e2]">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#dc2626]" />
                <span className="font-semibold text-gray-900 text-sm">Monthly Contribution Progress</span>
              </div>
              <span className="text-xs text-gray-500 font-medium">Day 12 of 30</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div className="bg-[#dc2626] h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>KSh 24.00 contributed</span>
              <span>KSh 60.00 target</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#dc2626] rounded-full flex items-center justify-center text-white shadow-md shadow-[#dc2626]/30">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">Contribute</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">Withdraw</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">My Chama</span>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">Set Goal</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-900">Recent Transactions</h3>
              <a href="#" className="text-sm text-[#dc2626] font-semibold hover:underline">View All</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#fee2e2] rounded-full flex items-center justify-center text-[#dc2626]">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Daily Contribution</p>
                    <p className="text-xs text-gray-500">Today, 08:32 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#dc2626]">+ KSh 2.00</p>
                  <span className="text-[10px] bg-[#fee2e2] text-[#dc2626] px-2 py-0.5 rounded-full font-medium">Completed</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f8f4fb] rounded-full flex items-center justify-center text-[#9333ea]">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Chama Payout</p>
                    <p className="text-xs text-gray-500">Yesterday, 11:20 AM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#dc2626]">+ KSh 15.00</p>
                  <span className="text-[10px] bg-[#fee2e2] text-[#dc2626] px-2 py-0.5 rounded-full font-medium">Completed</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Withdrawal (M-Pesa)</p>
                    <p className="text-xs text-gray-500">18 Oct 2025, 04:15 PM</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-500">- KSh 500.00</p>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">Completed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fef2f2] rounded-2xl p-5 border border-[#fee2e2] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Your Future Matters</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Save more, grow more, achieve more together.</p>
            </div>
            <button className="bg-[#dc2626] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#b91c1c] transition-colors">
              Set a Goal
            </button>
          </div>
        </div>
        
        <nav className="lg:hidden bg-white border-t border-gray-200 flex justify-around py-3">
          <a href="#" className="flex flex-col items-center gap-1 text-[#dc2626]">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-medium">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#dc2626]">
            <CreditCard className="w-6 h-6" />
            <span className="text-[10px] font-medium">Contribute</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#dc2626]">
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium">Chama</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#dc2626]">
            <ArrowUpRight className="w-6 h-6" />
            <span className="text-[10px] font-medium">Payouts</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#dc2626]">
            <Settings className="w-6 h-6" />
            <span className="text-[10px] font-medium">More</span>
          </a>
        </nav>
      </main>
    </div>
  );
};

export default MobileDashboard;
