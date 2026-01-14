// ---------------------------------------------------------------------
// <copyright file="Register.jsx" company="CargoFirst">
// Copyright (c) CargoFirst. All rights reserved.
// </copyright>
// ---------------------------------------------------------------------

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../store/slices/authSlice';
import { registerUser } from '../operations/authOperations';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { fi } from 'zod/v4/locales';

function Register() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError('');
    try {
      setLoading(true);
      const result = await registerUser(data);
      dispatch(setCredentials({ token: result.token, user: result.user }));
      navigate('/dashboard');
    } catch (error) {
      console.log('Register error:', error);
      setError(error?.response?.data?.message||'Registration failed. Please try again.');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-base">Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm text-center border border-destructive/20">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  {...methods.register('name', { required: 'Name is required' })}
                />
                {methods.formState.errors.name && (
                  <p className="text-sm text-destructive">{methods.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...methods.register('email', { required: 'Email is required' })}
                />
                {methods.formState.errors.email && (
                  <p className="text-sm text-destructive">{methods.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  {...methods.register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
                {methods.formState.errors.password && (
                  <p className="text-sm text-destructive">{methods.formState.errors.password.message}</p>
                )}
              </div>

               <button
                type="submit"
                disabled={loading}
                className={`
    w-full 
    bg-blue-600 
    text-white 
    py-2.5 
    text-sm
    font-semibold
    opacity
    transition-all 
    duration-300 
    
    ${!loading && "hover:scale-[1.01]"}
    ease-in-out 
    rounded-md
    flex 
    items-center 
    justify-center 
    gap-3
   disabled:cursor-not-allowed disabled:bg-blue-500 disabled:opacity-60' 
     
  `}
              >
                {loading ? (

                  <div role="status" className='flex items-center gap-2'>
                    <svg aria-hidden="true" class="w-5 h-5  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="tracking-wide">Processing..</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>
          </FormProvider>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
