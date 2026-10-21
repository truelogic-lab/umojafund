import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, CreditCard, ArrowRightLeft, BarChart3, 
  Settings, LogOut, Bell, Search, ChevronDown, Menu, X, Home
} from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Members', path: '/admin/members', icon: <Users className="w-5 h-5" /> },
    { name: 'Contributions', path: '/admin/contributions', icon: <CreditCard className="w-5 h-5" /> },
    { name: 'Payouts', path: '/admin/payouts', icon: <ArrowRightLeft className="w-5 h-5" /> },
    { name: 'Transactions', path: '/admin/transactions', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Chama Groups', path: '/admin/chamas', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', path: '/admin/reports', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#0f2e1b] text-white flex flex-col transition-all duration-300 ease-in-out shrink-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
      `}>
        <div className={`flex items-center h-16 px-4 border-b border-white/10 shrink-0 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link to="/admin" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shrink-0">
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-sm font-bold leading-none tracking-tight">Umoja Admin</span>
                <span className="text-[7px] text-green-300 font-semibold tracking-[0.2em] mt-1 uppercase">System Control</span>
              </div>
            )}
          </Link>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsMobileOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.name} to={item.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
                  ${isActive ? 'bg-[#1a472a] text-white shadow-sm' : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                title={isCollapsed ? item.name : ''}
              >
                <div className={`shrink-0 ${isActive ? 'text-green-400' : 'text-gray-400 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={handleLogout} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 shrink-0" /> 
            {!isCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative min-w-0">
        <header className="bg-white px-4 sm:px-6 h-16 flex justify-between items-center border-b border-gray-200 shrink-0 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button className="lg:hidden text-gray-500 hover:text-gray-900 p-1" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <button className="hidden lg:flex text-gray-500 hover:text-gray-900 p-1" onClick={() => setIsCollapsed(!isCollapsed)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search members, transactions..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-[#1a472a] transition-all" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50">
              Oct 1, 2025 – Oct 15, 2025 <ChevronDown className="w-3.5 h-3.5" />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
            <div className="relative">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-[#1a472a] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">A</div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-gray-900 leading-none">Admin</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">System Administrator</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
              </button>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                    <Link to="/admin/settings" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Settings className="w-4 h-4 text-gray-400" /> Account Settings
                    </Link>
                    <Link to="/" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                      <Home className="w-4 h-4 text-gray-400" /> Public Site
                    </Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
