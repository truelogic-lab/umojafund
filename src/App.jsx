import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Public
const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

// Member
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/DashboardHome'));
const Contribute = lazy(() => import('./pages/Contribute'));
const Profile = lazy(() => import('./pages/Profile'));
const Chama = lazy(() => import('./pages/Chama'));
const Payouts = lazy(() => import('./pages/Payouts'));
const Goals = lazy(() => import('./pages/Goals'));
const Contributions = lazy(() => import('./pages/Contributions'));
const Settings = lazy(() => import('./pages/Settings'));
const Rewards = lazy(() => import('./pages/Rewards'));
const Notifications = lazy(() => import('./pages/Notifications'));

// Admin - from the new admin folder
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-[#dc2626] rounded-full animate-spin"></div>
  </div>
);

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <LoadingFallback />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const AdminProtectedRoute = () => {
  const isAdminLoggedIn = localStorage.getItem('admin_session') === 'true';
  if (!isAdminLoggedIn) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Member */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="contribute" element={<Contribute />} />
                <Route path="contributions" element={<Contributions />} />
                <Route path="payouts" element={<Payouts />} />
                <Route path="chama" element={<Chama />} />
                <Route path="goals" element={<Goals />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
              </Route>
            </Route>

            {/* Admin Login (Standalone) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Admin Protected */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                {/* We'll add more admin pages later inside src/admin/pages */}
              </Route>
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
