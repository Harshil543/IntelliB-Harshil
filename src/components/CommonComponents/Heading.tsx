// components/CommonComponents/Heading.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  className?: string; // Optional to allow additional styling
}

const Heading: React.FC<HeadingProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'font-dm-sans text-left text-2xl font-bold leading-[42px] tracking-tight text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Heading;
