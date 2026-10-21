import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [unread, setUnread] = useState(0);

  const refreshUnread = useCallback(async () => {
    if (!isAuthenticated) {
      setUnread(0);
      return;
    }
    try {
      const res = await api.getUnreadCount();
      setUnread(res.data.unread);
    } catch {
      setUnread(0);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshUnread();
    if (!isAuthenticated) return;
    const interval = setInterval(refreshUnread, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, refreshUnread]);

  return (
    <NotificationContext.Provider value={{ unread, refreshUnread }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
