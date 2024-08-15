"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { menuItems } from "@/lib/menu-list";

interface SidebarItem {
  title: string;
  path?: string;
  children?: SidebarItem[];
}

const Sidebar = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = (title: string) => {
    setOpen(open === title ? null : title);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Small Devices */}
      <div className="md:hidden p-4">
        <button onClick={toggleSidebar}>
          <Icon icon="mdi:menu" width="24" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 w-64 transform  justify-between ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0`}
      >
        <ul>
          {menuItems.map((item: SidebarItem) => (
            <li key={item.title} className="mb-4">
              {item.children ? (
                <>
                  <button
                    className="flex items-center justify-between w-full text-left"
                    onClick={() => toggleOpen(item.title)}
                  >
                    <span
                      className={`${
                        open === item.title ? "font-bold" : ""
                      } hover:text-black`}
                    >
                      {item.title}
                    </span>
                    {open === item.title ? (
                      <Icon icon="mdi:chevron-down" className="ml-2" />
                    ) : (
                      <Icon icon="mdi:chevron-right" className="ml-2" />
                    )}
                  </button>
                  {open === item.title && (
                    <ul className="pl-4 mt-2">
                      {item.children.map((child) => (
                        <li key={child.title}>
                          <Link
                            href={child.path!}
                            onClick={handleLinkClick} // Close sidebar on link click
                            className={`block py-2 ${
                              pathname === child.path
                                ? "text-black font-bold"
                                : "hover:text-black"
                            }`}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.path!}
                  onClick={handleLinkClick} // Close sidebar on link click
                  className={`block py-2 ${
                    pathname === item.path
                      ? "text-black font-bold"
                      : "hover:text-black"
                  }`}
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for Small Devices */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-blackcity-50 md:hidden"
          onClick={toggleSidebar} // Close sidebar when overlay is clicked
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
