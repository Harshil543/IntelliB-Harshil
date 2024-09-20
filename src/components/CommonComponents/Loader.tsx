// components/Loader.tsx

import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex h-[70vh] items-center justify-center align-middle">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary"></div>
    </div>
  );
};

export default Loader;
