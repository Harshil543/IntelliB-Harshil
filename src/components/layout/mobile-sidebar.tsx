'use client';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/constants/navdata.constants';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { DashboardNav } from './DashboardNav';
import { LogoutModal } from '../CommonComponents/logout.modal';
import toast from 'react-hot-toast';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';

type SidebarProps = {
  className?: string;
  data: any;
};

export default function MobileSidebar({ className, data }: SidebarProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const handleLogout = () => {
    storage.clearToken();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between !px-0"
        >
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
          <div className="px-5">
            <button
              className={
                'flex w-full items-center justify-center rounded-3xl bg-primary px-4 py-2 text-background'
              }
              onClick={() => setIsLogoutModalOpen(true)} // Open the modal on button click
            >
              {'Logout'}
            </button>
          </div>
        </SheetContent>
      </Sheet>

      <LogoutModal
        modalOpen={isLogoutModalOpen} // Pass the modal state
        onClose={() => setIsLogoutModalOpen(false)} // Close the modal
        onPress={handleLogout} // Logout function
      />
    </>
  );
}
