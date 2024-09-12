'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, LogOut } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { DashboardNav } from './DashboardNav';
import { navItems } from '@/constants/navdata.constants';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import storage from '@/utils/storage';

type SidebarProps = {
  className?: string;
  data: any;
};

export default function Sidebar({ className, data }: SidebarProps) {
  const router = useRouter();
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  console.log('data', data.data.role);
  const menuItems = data?.data?.role === 'super_admin' ? navItems?.admin : [];

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  const handleLogout = () => {
    storage.clearToken();
    router.push('/login');
  };
  return (
    <nav
      className={cn(
        `relative flex h-screen flex-col justify-between bg-background pb-10`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />

      <div className="space-y-4 py-4">
        <div className="py-2 pl-3">
          <div className="mt-3 space-y-1">
            <Image src={logo} height={90} alt="Logo" />
            <DashboardNav items={menuItems} />
          </div>
        </div>
      </div>

      <button
        className={cn(
          'flex items-center justify-center rounded-3xl bg-primary py-2 text-background',
          !isMinimized ? 'mx-10 px-4' : 'mx-3 rounded-full'
        )}
        onClick={handleLogout}
      >
        {!isMinimized ? 'Logout' : <LogOut className="h-5 w-5" />}
      </button>
    </nav>
  );
}
