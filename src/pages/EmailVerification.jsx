import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

const EmailVerification = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="mb-4">
          We've sent a verification email to <strong>{user?.email}</strong>.
          Please check your inbox and click the verification link to complete your registration.
        </p>
        <Button onClick={() => window.location.reload()}>
          I've Verified My Email
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
