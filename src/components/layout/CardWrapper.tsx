import React from 'react';
import { Card } from '../ui/card';

interface CardWrapperProps {
  children: React.ReactNode; // Define the type for children
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <Card className="sm: my-5 h-fit w-full rounded-xl bg-background p-5 lg:p-10">
      {children}
    </Card>
  );
};

export default CardWrapper;
