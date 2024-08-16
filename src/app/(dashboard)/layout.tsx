import Sidebar from '@/components/CommonComponents/Sidebar';

import TanstackProvider from '@/providers/tanstack-provider';
import React, { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <TanstackProvider>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="h-full w-full p-10 md:ml-64">{children}</div>
      </div>
    </TanstackProvider>
  );
};

export default DashboardLayout;
