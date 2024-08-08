import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
      // Implement actual login logic here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Login failed');
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const register = async (email, password, name) => {
    try {
      // Implement actual registration logic here
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) throw new Error('Registration failed');
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success('Registered successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const verifyMFA = async (code) => {
    try {
      // Implement MFA verification logic here
      const response = await fetch('/api/verify-mfa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, code }),
      });
      if (!response.ok) throw new Error('MFA verification failed');
      toast.success('MFA verified successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, verifyMFA, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
