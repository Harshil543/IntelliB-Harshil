'use client';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import Sidebar from '@/components/layout/sidebar';
import { useSidebar } from '@/hooks/useSidebar';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="fixed hidden md:block">
          <Sidebar />
        </div>
        <div className="block px-10 pt-10 md:hidden">
          <MobileSidebar />
        </div>
        <div className={`h-full w-full p-10 md:ml-72`}>{children}</div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DashboardLayout;
