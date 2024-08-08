import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">CashTransact</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, {user?.name}</span>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
    </header>
  );
};

export default Header;
