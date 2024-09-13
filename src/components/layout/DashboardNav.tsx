import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { useSidebar } from '@/hooks/useSidebar';
import { Icon } from '@iconify/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '../ui/tooltip';

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const router = useRouter();
  const { isMinimized } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  if (!items.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 pt-10">
      <TooltipProvider>
        {items.map((item, index) => {
          // const itemicon = item.icon ? item.icon : Icons.arrowRight;
          const isSubmenuOpen = openSubmenus[item.label as string];

          return (
            <div key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      'flex cursor-pointer items-center gap-2 overflow-hidden py-2 text-sm font-medium hover:border-r-2 hover:border-black hover:text-black',
                      path === item.href
                        ? 'border-r-2 border-black text-black'
                        : 'transparent'
                    )}
                    onClick={() => {
                      if (item.children) {
                        toggleSubmenu(item.label as string);
                      } else if (item.href) {
                        router.push(item.href);
                        if (setOpen) setOpen(false);
                      }
                    }}
                  >
                    <Icon icon={item?.icon} className={`ml-3 size-5`} />
                    {/* <Icon className={`ml-3 size-5`} icon={itemicon} /> */}
                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className="mr-5 truncate">{item.title}</span>
                    ) : (
                      ''
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  align="center"
                  side="right"
                  sideOffset={8}
                  className={!isMinimized ? 'hidden' : 'inline-block'}
                >
                  {item.title}
                </TooltipContent>
              </Tooltip>

              {/* Render submenu items if they exist and are toggled open */}
              {item.children && isSubmenuOpen && (
                <div className="ml-6">
                  {item.children.map((child: any, childIndex: any) => (
                    <Link
                      key={childIndex}
                      href={child.disabled ? '/' : child.href}
                      className={cn(
                        'flex items-center gap-2 py-2 text-sm font-medium hover:text-black',
                        path === child.href
                          ? 'text-black'
                          : 'text-muted-foreground',
                        child.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      <Icons.arrowRight className={`ml-3 size-5`} />
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-5 truncate">{child.title}</span>
                      ) : (
                        ''
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
