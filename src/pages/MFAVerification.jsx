import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MFAVerification = () => {
  const [code, setCode] = useState('');
  const { verifyMFA } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyMFA(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">MFA Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter MFA Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Verify</Button>
        </form>
      </div>
    </div>
  );
};

export default MFAVerification;
