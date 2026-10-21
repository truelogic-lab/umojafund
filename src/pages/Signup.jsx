import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    msisdn: '',
    password: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Real-time M-Pesa validation
  const [msisdnStatus, setMsisdnStatus] = useState({ state: 'idle', message: '' });
  const validationTimer = useRef(null);

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: undefined });
    }
  };

  // Debounced live validation of the M-Pesa number
  useEffect(() => {
    const raw = form.msisdn.trim();
    if (!raw) {
      setMsisdnStatus({ state: 'idle', message: '' });
      return;
    }

    setMsisdnStatus({ state: 'checking', message: '' });

    if (validationTimer.current) clearTimeout(validationTimer.current);

    validationTimer.current = setTimeout(async () => {
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/check-msisdn/`, { msisdn: raw });
        if (res.data.valid && res.data.available) {
          setMsisdnStatus({
            state: 'ok',
            message: `✓ ${res.data.normalized} is available`,
          });
        } else if (res.data.valid && !res.data.available) {
          setMsisdnStatus({
            state: 'taken',
            message: res.data.reason || 'This number is already registered.',
          });
        } else {
          setMsisdnStatus({ state: 'error', message: res.data.reason || 'Invalid number.' });
        }
      } catch (err) {
        const reason =
          err.response?.data?.reason ||
          err.response?.data?.msisdn?.[0] ||
          'Invalid Kenyan number.';
        setMsisdnStatus({ state: 'error', message: reason });
      }
    }, 400);

    return () => {
      if (validationTimer.current) clearTimeout(validationTimer.current);
    };
  }, [form.msisdn]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setFieldErrors({});

    if (msisdnStatus.state === 'taken' || msisdnStatus.state === 'error') {
      setGeneralError('Please fix the M-Pesa number before continuing.');
      return;
    }

    setIsLoading(true);

    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === 'object' && !data.detail) {
        const normalized = {};
        Object.entries(data).forEach(([key, value]) => {
          normalized[key] = Array.isArray(value) ? value[0] : String(value);
        });
        setFieldErrors(normalized);
      } else {
        setGeneralError(data?.detail || 'Signup failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const msisdnBorder =
    msisdnStatus.state === 'ok'
      ? 'border-green-400 focus:ring-green-500 focus:border-green-500'
      : msisdnStatus.state === 'taken' || msisdnStatus.state === 'error'
      ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
      : 'border-gray-300';

  return (
    <div className="min-h-screen flex flex-row-reverse bg-white font-sans">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#450a0a] overflow-hidden">
        <img src="/how-it-work.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#450a0a] via-[#450a0a]/50 to-transparent" />
        <div className="relative z-10 flex flex-col justify-end p-12 w-full h-full text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-[#dc2626]">
              <img src="/logo.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Umoja Fund</h2>
              <p className="text-[10px] font-semibold tracking-widest text-gray-300 uppercase">Together We Grow</p>
            </div>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">Start your journey to greater futures.</h1>
          <p className="text-gray-300 text-sm max-w-md">Join over 100,000 Kenyans saving together. It only takes a minute.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden mb-3 shadow-sm border border-gray-100">
              <img src="/logo.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Umoja Fund</h2>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
            <p className="text-sm text-gray-500 mt-2">
              Your first registered M-Pesa number becomes your primary account number.
            </p>
          </div>

          {generalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {generalError}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={handleChange('full_name')}
                  placeholder="Amina Wanjiku"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 sm:text-sm bg-white ${
                    fieldErrors.full_name
                      ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#dc2626] focus:border-[#dc2626]'
                  }`}
                />
              </div>
              {fieldErrors.full_name && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="amina@example.com"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:ring-2 sm:text-sm bg-white ${
                    fieldErrors.email
                      ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#dc2626] focus:border-[#dc2626]'
                  }`}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                M-Pesa Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  required
                  value={form.msisdn}
                  onChange={handleChange('msisdn')}
                  placeholder="0712 345 678 or 0112 345 678"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 sm:text-sm bg-white ${msisdnBorder}`}
                />
                {msisdnStatus.state === 'ok' && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
                {(msisdnStatus.state === 'taken' || msisdnStatus.state === 'error') && (
                  <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                )}
              </div>
              {msisdnStatus.message && (
                <p
                  className={`text-xs mt-1 ${
                    msisdnStatus.state === 'ok'
                      ? 'text-green-600'
                      : msisdnStatus.state === 'checking'
                      ? 'text-gray-500'
                      : 'text-red-600'
                  }`}
                >
                  {msisdnStatus.message}
                </p>
              )}
              <p className="text-[10px] text-gray-400 mt-1">
                Must start with 07 or 01. This becomes your primary number.
              </p>
              {fieldErrors.msisdn && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.msisdn}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={8}
                  value={form.password}
                  onChange={handleChange('password')}
                  placeholder="At least 8 characters"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:ring-2 sm:text-sm bg-white ${
                    fieldErrors.password
                      ? 'border-red-400 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-[#dc2626] focus:border-[#dc2626]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-start mt-4">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-[#dc2626] focus:ring-[#dc2626] border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="font-semibold text-[#dc2626] hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-[#dc2626] hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || msisdnStatus.state === 'taken' || msisdnStatus.state === 'error'}
              className={`w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-white transition-colors mt-6 ${
                isLoading || msisdnStatus.state === 'taken' || msisdnStatus.state === 'error'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#dc2626] hover:bg-[#b91c1c]'
              }`}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#dc2626] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
