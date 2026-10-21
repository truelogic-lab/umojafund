import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('admin@umojafund.co.ke');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // --- TEMPORARY MOCK LOGIN (NO API) ---
    setTimeout(() => {
      if (email === 'admin@umojafund.co.ke' && password === 'admin123') {
        localStorage.setItem('admin_session', 'true');
        navigate('/admin', { replace: true });
      } else {
        setError('Invalid admin credentials. Access denied.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1f12] font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a472a] rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1a472a] rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden mb-4 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Umoja Admin</h2>
          <p className="text-[10px] font-semibold tracking-widest text-green-400 uppercase mt-1">System Control Portal</p>
        </div>

        <div className="bg-[#0f2e1b] border border-[#1a472a] rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#1a472a]">
            <ShieldAlert className="w-5 h-5 text-green-400" />
            <p className="text-xs text-green-100 font-medium">Restricted Area. Authorized Personnel Only.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-green-100 mb-2">Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-green-500" />
                </div>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-3 py-3 bg-[#0a1f12] border border-[#1a472a] rounded-xl text-white focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-green-100 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-green-500" />
                </div>
                <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-10 pr-10 py-3 bg-[#0a1f12] border border-[#1a472a] rounded-xl text-white focus:ring-2 focus:ring-green-500 text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className={`w-full py-3 rounded-xl text-sm font-bold text-[#0a1f12] transition-colors ${isLoading ? 'bg-green-600/50' : 'bg-green-400 hover:bg-green-300'}`}>
              {isLoading ? 'Verifying...' : 'Secure Login'}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-[10px] text-green-200/50">Demo: admin@umojafund.co.ke / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
