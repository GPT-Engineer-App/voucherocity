import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Implement forgot password logic here
    console.log('Forgot password for:', data.email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
