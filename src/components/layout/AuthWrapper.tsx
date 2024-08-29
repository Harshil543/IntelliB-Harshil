import React from 'react';
import authImage from '@assets/images/auth_layout.png';
import Image from 'next/image';

interface AuthWrapperProps {
  children: React.ReactNode; // Define the type for children
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="relative hidden h-full flex-col justify-between p-10 text-center align-middle text-background dark:border-r lg:flex">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          TRANSACTION THAT ARE FAST AND EASY WITH TENANT
        </div>
        <div className="relative z-20 m-auto">
          <Image
            src={authImage}
            className="w-[80%]"
            alt="Auth Layout IntelliB"
          />
        </div>
        <div></div>
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
