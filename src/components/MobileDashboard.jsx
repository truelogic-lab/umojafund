import React from 'react';
import { Link } from 'react-router-dom';

const MobileDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Use the dashboard</h1>
        <p className="text-sm text-gray-600 mb-6">
          This legacy component is no longer used. The member dashboard lives at /dashboard.
        </p>
        <Link to="/dashboard" className="inline-block bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-5 py-2.5 rounded-lg">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};

export default MobileDashboard;
