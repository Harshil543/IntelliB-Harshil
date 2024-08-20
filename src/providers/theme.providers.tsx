'use client';
import ThemeProvider from '@/components/layout/ThemeToggle/theme-provider';
import React from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
};
export default Providers;
