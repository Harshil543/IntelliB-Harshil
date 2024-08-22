import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import Sidebar from '@/components/layout/sidebar';
import TanstackProvider from '@/providers/tanstack.provider';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <TanstackProvider>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="block px-10 pt-10 md:hidden">
          <MobileSidebar />
        </div>
        <div className="h-full w-full p-10">{children}</div>
      </div>
    </TanstackProvider>
  );
};

export default DashboardLayout;
