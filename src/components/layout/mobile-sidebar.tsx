'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/constants/navdata.constants';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { DashboardNav } from './DashboardNav';

type SidebarProps = {
  className?: string;
  data: any;
};

export default function MobileSidebar({ className, data }: SidebarProps) {
  const [open, setOpen] = useState(false);

  const getMenuItems = () => {
    switch (data?.data?.role) {
      case 'super_admin':
        return navItems?.super_admin;
      case 'system_admin':
        return navItems?.system_admin;
      default:
        return [];
    }
  };
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className={`space-y-4 py-4 ${className}`}>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <DashboardNav
                  items={getMenuItems()}
                  isMobileNav={true}
                  setOpen={setOpen}
                />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
