import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, CreditCard, Users, Gift, User, Settings, LogOut, Bell, Menu, X, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const PayoutIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
  </svg>
);

const ContributionIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
  </svg>
);

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { unread } = useNotifications();

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Contribute', path: '/dashboard/contribute', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'My Contributions', path: '/dashboard/contributions', icon: <ContributionIcon className="w-5 h-5" /> },
    { name: 'Payouts', path: '/dashboard/payouts', icon: <PayoutIcon className="w-5 h-5" /> },
    { name: 'My Chama', path: '/dashboard/chama', icon: <Users className="w-5 h-5" /> },
    { name: 'Goals', path: '/dashboard/goals', icon: <Target className="w-5 h-5" /> },
    { name: 'Rewards', path: '/dashboard/rewards', icon: <Gift className="w-5 h-5" /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">

      {/* ============ MOBILE DRAWER ============ */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#450a0a] text-white z-[70] lg:hidden flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 shrink-0">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-none">Umoja Fund</span>
              <span className="text-[7px] text-gray-400 font-semibold tracking-[0.2em] mt-1 uppercase">Together We Grow</span>
            </div>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-300 hover:text-white rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 bg-[#dc2626]/20 mx-4 mt-4 p-3 rounded-xl border border-[#dc2626]/30">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user?.full_name || 'Member'}</p>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-gray-300">
                {user?.msisdn_verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm mb-1 transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#dc2626] text-white'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* ============ DESKTOP SIDEBAR ============ */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#450a0a] text-white py-6 px-4 shrink-0">
        <Link to="/dashboard" className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none tracking-tight">Umoja Fund</span>
            <span className="text-[7px] text-gray-400 font-semibold tracking-[0.2em] mt-1 uppercase">Together We Grow</span>
          </div>
        </Link>

        <div className="flex items-center gap-3 bg-[#dc2626]/20 p-2 rounded-xl mb-6 border border-[#dc2626]/30">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex items-center justify-center shrink-0">
            <User className="w-6 h-6 text-gray-500" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{user?.full_name || 'Member'}</p>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] text-gray-300">
                {user?.msisdn_verified ? 'Verified' : 'Unverified'}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                location.pathname === item.path ? 'bg-[#dc2626] text-white' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {item.icon} {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-gray-300 hover:bg-white/5 px-4 py-3 rounded-xl font-medium text-sm transition-colors mt-auto border-t border-white/10 pt-4"
          >
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </nav>
      </aside>

      {/* ============ MAIN CONTENT ============ */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">

        <header className="bg-white px-4 sm:px-6 py-4 flex justify-between items-center border-b border-gray-100 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-gray-700 p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Hello, {user?.full_name?.split(' ')[0] || 'Member'} 👋
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block mt-0.5">Together we build a better tomorrow.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/dashboard/notifications"
              className="relative p-2 bg-[#fef2f2] rounded-full text-[#dc2626] hover:bg-[#fee2e2] transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-[#dc2626] text-white text-[10px] font-bold rounded-full border-2 border-white px-1">
                  {unread > 99 ? '99+' : unread}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard/profile"
              className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden shrink-0 border border-gray-300"
            >
              <User className="w-full h-full text-gray-400" />
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
          <Outlet />
        </div>

        {/* ============ BOTTOM NAV ============ */}
        <nav
          className={`lg:hidden fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 pb-safe z-[55] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-full' : 'translate-y-0'
          }`}
        >
          <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard' ? 'text-[#dc2626]' : 'text-gray-400'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link to="/dashboard/contribute" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard/contribute' ? 'text-[#dc2626]' : 'text-gray-400'}`}>
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] font-medium">Contribute</span>
          </Link>
          <Link to="/dashboard/chama" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard/chama' ? 'text-[#dc2626]' : 'text-gray-400'}`}>
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium">Chama</span>
          </Link>
          <Link to="/dashboard/payouts" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard/payouts' ? 'text-[#dc2626]' : 'text-gray-400'}`}>
            <PayoutIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Payouts</span>
          </Link>
          <Link to="/dashboard/profile" className={`flex flex-col items-center gap-1 ${location.pathname === '/dashboard/profile' ? 'text-[#dc2626]' : 'text-gray-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
      </main>
    </div>
  );
};

export default DashboardLayout;
