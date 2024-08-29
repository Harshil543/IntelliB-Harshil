'use client';

import React from 'react';

import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import CompanyRegisterForm from '@/components/forms/company-register.form';

const RegisterCompany = () => {
  return (
    <AuthWrapper>
      <div className="flex h-full w-full overflow-auto bg-background lg:p-8">
        <div className="m-auto flex w-[90%] flex-col">
          <div className="mb-10 flex flex-col">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Company Profile
            </h1>
            <p className="text-sm">For business, band or celebrity.</p>
          </div>

          <CompanyRegisterForm />
        </div>
      </div>
    </AuthWrapper>
  );
};

export default RegisterCompany;
