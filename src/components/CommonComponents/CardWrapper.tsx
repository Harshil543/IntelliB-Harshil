import React from 'react';

interface CardWrapperProps {
  children: React.ReactNode; // Define the type for children
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="sm: my-5 h-fit w-full rounded-xl bg-background p-5 lg:p-10">
      {children}
    </div>
  );
};

export default CardWrapper;
