'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import Sidebar from '@/components/layout/sidebar';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const pathSegments = pathname.split('/').filter(Boolean);

  // Determine which segment to use based on the number of segments
  const headingSegment =
    pathSegments.length > 1
      ? pathSegments[1]
      : pathSegments[0] || 'Main Dashboard';

  const formattedHeading = headingSegment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="fixed hidden md:block">
          <Sidebar />
        </div>
        <div className="block px-10 pt-10 md:hidden">
          <MobileSidebar />
        </div>
        <div className={`h-full w-full p-10 md:ml-72`}>
          <BreadcrumbWithCustomSeparator />
          <Heading>{formattedHeading}</Heading>
          <Heading className="text-md text-muted-foreground">
            Hello Admin
          </Heading>

          {children}
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DashboardLayout;
