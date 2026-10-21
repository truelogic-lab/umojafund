import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        try {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          localStorage.setItem('access_token', res.data.access);
          apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
          return apiClient(originalRequest);
        } catch {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/#/login';
        }
      }
    }
    return Promise.reject(error);
  },
);

export const api = {
  setAuthToken: (token) => {
    if (token) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete apiClient.defaults.headers.common.Authorization;
    }
  },

  login: (credentials) => apiClient.post('/auth/login/', credentials),
  register: (data) => apiClient.post('/auth/register/', data),
  getProfile: () => apiClient.get('/me/'),

  getDashboardSummary: () => apiClient.get('/dashboard/summary/'),
  getChamaDetails: () => apiClient.get('/chama/'),
  getTransactions: () => apiClient.get('/contributions/'),
  initiateContribution: (data) => apiClient.post('/contributions/initiate/', data),

  getNotifications: () => apiClient.get('/notifications/'),
  getUnreadCount: () => apiClient.get('/notifications/unread/'),
  markNotificationRead: (id) => apiClient.post('/notifications/' + id + '/read/'),
  markAllNotificationsRead: () => apiClient.post('/notifications/mark-all-read/'),
  deleteNotification: (id) => apiClient.delete('/notifications/' + id + '/'),
};

export default apiClient;
