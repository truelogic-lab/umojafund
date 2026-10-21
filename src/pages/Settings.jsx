import React, { useState } from 'react';
import { Shield, Bell, LogOut, Smartphone, AlertTriangle, CheckCircle2, X, Lock, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [payoutAlerts, setPayoutAlerts] = useState(true);

  const [activeModal, setActiveModal] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const displayMsisdn = user?.msisdn || null;
  const isVerified = user?.msisdn_verified === true;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeModal = () => setActiveModal(null);

  const handleSuccess = (message) => {
    setSuccessMsg(message);
    setActiveModal(null);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your security, notifications, and account preferences.
        </p>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{successMsg}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
            <Shield className="w-5 h-5 text-[#dc2626]" /> Security & Login
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Change Password</p>
                <p className="text-xs text-gray-500 mt-0.5">Update your login credentials securely.</p>
              </div>
              <button
                onClick={() => setActiveModal('password')}
                className="text-xs font-bold text-[#dc2626] hover:bg-[#fef2f2] px-3 py-1.5 rounded-lg transition-colors"
              >
                Update
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="text-sm font-semibold text-gray-900">M-Pesa Number</p>
                {displayMsisdn ? (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {displayMsisdn}{' '}
                    {isVerified ? (
                      <span className="text-green-600 font-semibold">● Verified</span>
                    ) : (
                      <span className="text-amber-600 font-semibold">● Unverified</span>
                    )}
                  </p>
                ) : (
                  <p className="text-xs text-amber-600 mt-0.5 font-semibold">No number linked</p>
                )}
              </div>
              <button
                onClick={() => navigate('/dashboard/contribute')}
                className="text-xs font-bold text-[#dc2626] hover:bg-[#fef2f2] px-3 py-1.5 rounded-lg transition-colors"
              >
                {displayMsisdn ? 'Manage' : 'Add Number'}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-[#dc2626]" /> Notifications
          </h3>
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-500 mt-0.5">Receive updates about your chama and payouts.</p>
              </div>
              <button
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${emailNotifs ? 'bg-[#dc2626]' : 'bg-gray-200'}`}
              >
                <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${emailNotifs ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="text-sm font-semibold text-gray-900">SMS Notifications</p>
                <p className="text-xs text-gray-500 mt-0.5">Get alerts for daily contributions and payouts.</p>
              </div>
              <button
                onClick={() => setSmsNotifs(!smsNotifs)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${smsNotifs ? 'bg-[#dc2626]' : 'bg-gray-200'}`}
              >
                <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${smsNotifs ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <div>
                <p className="text-sm font-semibold text-gray-900">Payout Alerts</p>
                <p className="text-xs text-gray-500 mt-0.5">Be notified immediately when a payout is processed.</p>
              </div>
              <button
                onClick={() => setPayoutAlerts(!payoutAlerts)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${payoutAlerts ? 'bg-[#dc2626]' : 'bg-gray-200'}`}
              >
                <span className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${payoutAlerts ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-5">
            <Monitor className="w-5 h-5 text-[#dc2626]" /> Active Sessions
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Current Device</p>
                <p className="text-xs text-gray-500">Active now</p>
              </div>
            </div>
            <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2.5 py-1 rounded-full border border-green-100">
              This Device
            </span>
          </div>
        </div>

        <div className="p-6 bg-red-50/30">
          <h3 className="text-lg font-bold text-[#dc2626] flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5" /> Danger Zone
          </h3>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out of Account
          </button>
        </div>
      </div>

      {activeModal === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#dc2626]" /> Change Password
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSuccess('Password updated successfully.');
              }}
              className="p-5 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" required className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" required minLength={8} className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors mt-2">
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
