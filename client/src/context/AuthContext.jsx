import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { safeStorage } from '../utils/safeStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = safeStorage.getItem('userInfo');
    if (!saved) return null;
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        safeStorage.setItem('userInfo', JSON.stringify(userData));
        setLoading(false);
        return { success: true };
      }
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    setUser(null);
    safeStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAdmin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
