'use client';

import React from 'react';
import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import { LoginForm } from '@/components/forms/login.form';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

const Login = () => {
  return (
    <AuthWrapper>
      <div className="flex h-full w-full justify-center bg-background p-4 align-middle lg:p-8">
        <div className="sm:w[90%] mt-[10%] flex flex-col justify-start space-y-2 align-middle lg:w-[50%]">
          <div className="mb-10 flex flex-col items-center space-y-2">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm">For business, band or celebrity.</p>
          </div>
          <LoginForm />

          <div className="my-3 flex items-center justify-between align-middle text-xs">
            <div className="flex justify-center align-middle">
              <Checkbox />
              &nbsp;&nbsp;I agree to all the&nbsp;
              <Link href={'#'} className="text-slate-500">
                Terms
              </Link>
              &nbsp;and&nbsp;
              <Link href={'#'} className="text-slate-500">
                Privacy Policy
              </Link>
            </div>
            <Link href={'/reset-password'}>
              <p className="text-sm text-slate-500 underline">
                Forgot password?
              </p>
            </Link>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Login;
