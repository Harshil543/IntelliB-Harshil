'use client';

import { usePathname } from 'next/navigation';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import Sidebar from '@/components/layout/sidebar';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Topbar from '@/components/layout/Topbar';
import { useSidebar } from '@/hooks/useSidebar';
import AuthProvider from '@/providers/auth.provider';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/user.service';
import MobileSidebar from '@/components/layout/mobile-sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isMinimized } = useSidebar();

  const pathSegments = pathname.split('/').filter(Boolean);

  // Determine which segment to use based on the number of segments
  const headingSegment =
    pathSegments.length > 1
      ? pathSegments[1]
      : pathSegments[0] || 'Main Dashboard';

  const formattedHeading = headingSegment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="fixed hidden md:block">
          <Sidebar data={data} />
        </div>
        <div className="block px-10 pt-10 md:hidden">
          <MobileSidebar data={data} />
        </div>
        <div
          className={`h-full w-full p-10 ${isMinimized ? 'md:ml-16' : 'md:ml-72'} `}
        >
          <div className="flex justify-between align-middle">
            <BreadcrumbWithCustomSeparator />
            <Topbar data={data} />
          </div>
          <Heading>{formattedHeading}</Heading>
          <Heading className="text-md text-muted-foreground">
            Hello, {data?.data?.firstName}&nbsp;{data?.data?.lastName}
          </Heading>

          <AuthProvider>{children} </AuthProvider>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DashboardLayout;
