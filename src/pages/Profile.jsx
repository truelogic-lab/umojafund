import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Edit,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    setProfileData({
      ...profileData,
      full_name: formData.get('full_name'),
      email: formData.get('email'),
    });

    setIsEditModalOpen(false);
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // No fallback — if the user has no msisdn, we show "Not set"
  const displayMsisdn = user?.msisdn || null;
  const isVerified = user?.msisdn_verified === true;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal information and account preferences.
        </p>
      </div>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{successMsg}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="h-32 sm:h-48 bg-[#450a0a] relative">
          <img
            src="/hero.png"
            alt=""
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-12 sm:-mt-16 gap-4">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-1.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border border-gray-100">
                <User className="w-10 h-10 sm:w-14 sm:h-14 text-gray-400" />
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                to="/dashboard/settings"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" /> Settings
              </Link>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#dc2626] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-[#b91c1c] transition-colors shadow-sm"
              >
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              {profileData.full_name || 'Unnamed Member'}
              {isVerified && (
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-green-200">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Member since {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-[#fef2f2] rounded-2xl p-4 border border-[#fee2e2]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#dc2626] mb-2 shadow-sm">
            <Wallet className="w-4 h-4" />
          </div>
          <p className="text-xs text-gray-500 mb-0.5">Total Saved</p>
          <p className="text-lg font-bold text-gray-900">See dashboard</p>
        </div>
        <div className="bg-[#f8f4fb] rounded-2xl p-4 border border-[#efe5f7]">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#9333ea] mb-2 shadow-sm">
            <Users className="w-4 h-4" />
          </div>
          <p className="text-xs text-gray-500 mb-0.5">My Chama</p>
          <p className="text-lg font-bold text-gray-900">Nairobi Youth</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100 col-span-2 sm:col-span-1">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 mb-2 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs text-gray-500 mb-0.5">Account Status</p>
          <p className="text-lg font-bold text-green-700">
            {isVerified ? 'Verified' : 'Unverified'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h4 className="font-bold text-gray-900">Personal Information</h4>
        </div>

        <div className="divide-y divide-gray-100">
          <div className="p-5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                <p className="text-sm font-semibold text-gray-900">
                  {profileData.email || 'Not set'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-[#dc2626] sm:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Edit
            </button>
          </div>

          <div className="p-5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">M-Pesa Number</p>
                {displayMsisdn ? (
                  <p className="text-sm font-semibold text-gray-900 tracking-wide">
                    {displayMsisdn}
                  </p>
                ) : (
                  <p className="text-sm font-semibold text-amber-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    No number linked
                  </p>
                )}
              </div>
            </div>
            <Link
              to="/dashboard/settings"
              className="text-xs font-bold text-[#dc2626] sm:opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Manage
            </Link>
          </div>

          <div className="p-5 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Location</p>
                <p className="text-sm font-semibold text-gray-900">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <Link
          to="/dashboard/contributions"
          className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#dc2626]">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Transaction History</p>
              <p className="text-xs text-gray-500">
                View all your contributions and payouts
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Link>

        <Link
          to="/dashboard/settings"
          className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Account Settings</p>
              <p className="text-xs text-gray-500">
                Manage security, notifications, and preferences
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </Link>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-[#dc2626]" /> Edit Profile
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  name="full_name"
                  type="text"
                  defaultValue={profileData.full_name}
                  required
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={profileData.email}
                  required
                  className="block w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#dc2626] text-sm bg-white"
                />
              </div>
              <p className="text-[10px] text-gray-400">
                The M-Pesa number cannot be edited here. Use Account Settings to start a
                verification process for a new number.
              </p>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-sm font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-colors mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
