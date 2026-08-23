import axios from 'axios';
import { addLog } from '../utils/logger';
import { safeStorage } from '../utils/safeStorage';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If hosted live (e.g. Vercel) or opened on mobile via IP
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://ashu-port.onrender.com/api';
  }
  return 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization Bearer Token header to every request if present
API.interceptors.request.use(
  (config) => {
    // If request data is FormData, remove default application/json header so Axios auto-generates multipart/form-data with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    addLog('INFO', 'NETWORK', `API Req: ${config.method?.toUpperCase()} ${config.url}`, {
      fullUrl: `${config.baseURL}${config.url}`,
      headers: config.headers,
    });

    const userInfo = safeStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {}
    }
    return config;
  },
  (error) => {
    addLog('ERROR', 'NETWORK', `API Req Error: ${error.message}`, error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired / invalid tokens
API.interceptors.response.use(
  (response) => {
    addLog('SUCCESS', 'NETWORK', `API Res: ${response.config.method?.toUpperCase()} ${response.config.url} [${response.status}]`, {
      dataCount: Array.isArray(response.data?.data) ? response.data.data.length : null,
      status: response.status,
    });
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : 'NO_RESPONSE';
    const errorMsg = error.response?.data?.message || error.message || 'Network Request Failed';
    addLog('ERROR', 'NETWORK', `API Res Error [${status}]: ${errorMsg}`, {
      url: error.config?.url,
      code: error.code,
      response: error.response?.data,
    });

    if (error.response && error.response.status === 401) {
      safeStorage.removeItem('userInfo');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;

