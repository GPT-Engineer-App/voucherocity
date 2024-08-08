import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendEmailVerification } from '../utils/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mfaRequired, setMfaRequired] = useState(false);
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
      // Check if MFA is required (this would be determined by your backend)
      const mfaRequired = Math.random() < 0.5; // 50% chance for demo purposes
      if (mfaRequired) {
        setMfaRequired(true);
        navigate('/mfa-verification');
        return;
      }
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
      const userData = { id: '2', name, email, role: 'user', emailVerified: false };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      await sendEmailVerification(email);
      toast.success('Registered successfully. Please check your email to verify your account.');
      navigate('/email-verification');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const verifyEmail = async (token) => {
    try {
      // Simulating API call to verify email
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedUser = { ...user, emailVerified: true };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Email verified successfully');
      navigate('/');
    } catch (error) {
      toast.error('Email verification failed');
    }
  };

  const verifyMFA = async (code) => {
    try {
      // Simulating API call to verify MFA code
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Assuming the code is correct for demo purposes
      const userData = { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setMfaRequired(false);
      toast.success('MFA verified successfully');
      navigate('/');
    } catch (error) {
      toast.error('MFA verification failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, mfaRequired, verifyMFA }}>
      {children}
    </AuthContext.Provider>
  );
};
