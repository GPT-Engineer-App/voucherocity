import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = { id: '1', name: 'John Doe', email, role: 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const register = async (email, password, name) => {
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = { id: '2', name, email, role: 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Registered successfully');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
