'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { DashboardNav } from './DashboardNav';
import { navItems } from '@/constants/navdata.constants';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/assets/images/logo.jpeg';
import { color } from '@/utils/theme';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  const handleLogout = () => {
    console.log('logout');
    router.push('/login');
  };
  return (
    <nav
      className={cn(
        `relative flex h-screen flex-col justify-between border-r bg-white pb-10`,
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
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
      <Button
        children="Logout"
        className="mx-10 rounded-3xl"
        style={{ backgroundColor: color.primaryColor }}
        onClick={handleLogout}
      />
    </nav>
  );
}
