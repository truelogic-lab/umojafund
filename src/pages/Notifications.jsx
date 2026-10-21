import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Check, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { useNotifications } from '../context/NotificationContext';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { refreshUnread } = useNotifications();

  const loadNotifications = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await api.getNotifications();
      setNotifications(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load notifications.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications(notifications.map((n) => ({ ...n, is_read: true })));
      refreshUnread();
    } catch {
      /* no-op */
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      refreshUnread();
    } catch {
      /* no-op */
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.deleteNotification(id);
      setNotifications(notifications.filter((n) => n.id !== id));
      refreshUnread();
    } catch {
      /* no-op */
    }
  };

  const filtered = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'transactions')
      return n.type === 'TRANSACTION' || n.type === 'PAYOUT';
    if (activeTab === 'alerts') return n.type === 'SECURITY' || n.type === 'SYSTEM';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-[#dc2626] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Stay updated on your account activity.</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-sm font-bold text-[#dc2626] hover:bg-[#fef2f2] px-3 py-2 rounded-lg transition-colors"
          >
            <Check className="w-4 h-4" /> Mark all as read
          </button>
        )}
      </div>

      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-[#dc2626] text-[#dc2626]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'transactions'
              ? 'border-[#dc2626] text-[#dc2626]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'alerts'
              ? 'border-[#dc2626] text-[#dc2626]'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Alerts & Updates
        </button>
      </div>

      <div className="space-y-1">
        {isLoading && (
          <div className="py-12 text-center text-gray-500 text-sm">
            Loading notifications...
          </div>
        )}

        {!isLoading && error && (
          <div className="py-8 flex flex-col items-center text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications here.</p>
            <p className="text-sm text-gray-400">We'll alert you when something new happens.</p>
          </div>
        )}

        {!isLoading &&
          !error &&
          filtered.map((notif) => (
            <div
              key={notif.id}
              className={`group relative flex items-start gap-3 p-4 rounded-xl transition-colors ${
                notif.is_read
                  ? 'bg-transparent hover:bg-gray-50'
                  : 'bg-[#fef2f2]/50 hover:bg-[#fef2f2]'
              }`}
            >
              <div className="mt-2 shrink-0 w-2 flex justify-center">
                {!notif.is_read && <div className="w-2 h-2 bg-[#dc2626] rounded-full" />}
              </div>

              <div className="flex-1 min-w-0 pr-16">
                {notif.link ? (
                  <Link
                    to={notif.link}
                    onClick={() => !notif.is_read && markAsRead(notif.id)}
                    className="block"
                  >
                    <p
                      className={`text-sm ${
                        notif.is_read ? 'font-semibold text-gray-700' : 'font-bold text-gray-900'
                      }`}
                    >
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wide">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </Link>
                ) : (
                  <div
                    onClick={() => !notif.is_read && markAsRead(notif.id)}
                    className="cursor-pointer"
                  >
                    <p
                      className={`text-sm ${
                        notif.is_read ? 'font-semibold text-gray-700' : 'font-bold text-gray-900'
                      }`}
                    >
                      {notif.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                    <p className="text-[10px] text-gray-400 mt-2 font-medium uppercase tracking-wide">
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                {!notif.is_read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notif.id)}
                  className="p-1.5 text-gray-400 hover:text-[#dc2626] hover:bg-[#fef2f2] rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notifications;
