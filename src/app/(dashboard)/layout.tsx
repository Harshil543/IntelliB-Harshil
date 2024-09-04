'use client';

import { usePathname, useRouter } from 'next/navigation';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import Sidebar from '@/components/layout/sidebar';
import React, { ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Topbar from '@/components/layout/Topbar';
import axios from 'axios';
import { useSidebar } from '@/hooks/useSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

interface UserData {
  firstName: string;
  lastName: string;
  // Add any other fields you expect from the API response
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

  const [data, setData] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get<UserData>(
          `${process.env.NEXT_PUBLIC_API_URL}/user`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="fixed hidden md:block">
          <Sidebar />
        </div>
        <div className="block px-10 pt-10 md:hidden">
          <MobileSidebar />
        </div>
        <div
          className={`h-full w-full p-10 ${isMinimized ? 'md:ml-16' : 'md:ml-72'} `}
        >
          <div className="flex justify-between align-middle">
            <BreadcrumbWithCustomSeparator />
            <Topbar />
          </div>
          <Heading>{formattedHeading}</Heading>
          <Heading className="text-md text-muted-foreground">
            Hello {`${data?.firstName} ${data?.lastName}`}
          </Heading>

          {children}
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DashboardLayout;
