import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., by checking local storage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Implement login logic here
    // For now, we'll just set a dummy user
    const dummyUser = { id: 1, email, name: 'John Doe' };
    setUser(dummyUser);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const register = async (email, password) => {
    // Implement registration logic here
    // For now, we'll just set a dummy user
    const dummyUser = { id: 1, email, name: 'John Doe' };
    setUser(dummyUser);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
