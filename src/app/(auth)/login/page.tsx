'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import { LoginForm } from '@/components/forms/login.form';

const Login = () => {
  return (
    <AuthWrapper>
      <div className="flex h-full w-full justify-center bg-background p-4 align-middle lg:p-8">
        <div className="mt-[10%] flex flex-col justify-start space-y-2 align-middle sm:w-[350px] lg:w-[50%]">
          <div className="mb-10 flex flex-col items-center space-y-2">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm">For business, band or celebrity.</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
