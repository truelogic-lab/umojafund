import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          api.setAuthToken(token);
          const response = await api.getProfile();
          setUser(response.data);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          api.setAuthToken(null);
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    const tokenResponse = await api.login({ email, password });
    const { access, refresh } = tokenResponse.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    api.setAuthToken(access);

    const userResponse = await api.getProfile();
    setUser(userResponse.data);
    return userResponse.data;
  };

  const register = async (data) => {
    const response = await api.register(data);
    const { access, refresh, user: newUser } = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    api.setAuthToken(access);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    api.setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
