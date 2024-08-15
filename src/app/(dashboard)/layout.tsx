import Sidebar from "@/components/CommonComponents/Sidebar";
import TanstackProvider from "@/providers/tanstack-provider";
import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <TanstackProvider>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="md:ml-64  w-full h-full p-10">{children}</div>
      </div>
    </TanstackProvider>
  );
};

export default DashboardLayout;
