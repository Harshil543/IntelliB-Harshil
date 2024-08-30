'use client';

import React from 'react';

import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import ResetPasswordFrom from '@/components/forms/reset-password.form';

const ResetPassword = () => {
  return (
    <AuthWrapper>
      <div className="flex h-full w-full justify-center bg-background p-4 align-middle lg:p-8">
        <div className="xs:w-[90%] align-middlesm:w[90%] mt-[10%] flex flex-col justify-start space-y-2 lg:w-[50%]">
          <div className="mb-10 flex flex-col items-center space-y-2">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-sm">For business, band or celebrity.</p>
          </div>
          <ResetPasswordFrom />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
