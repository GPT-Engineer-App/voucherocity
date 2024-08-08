import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { register: authRegister } = useAuth();

  const onSubmit = (data) => {
    authRegister(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
          </div>
          <div className="mb-4">
            <Input
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <div className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
