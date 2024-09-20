'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import storage from '@/utils/storage';
import Loader from '@/components/CommonComponents/Loader';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = () => {
      const fetchedToken = storage.getToken();

      if (fetchedToken) {
        if (pathname === '/login/') {
          router.replace('/');
        }
      } else {
        if (pathname !== '/login/') {
          router.replace('/login/');
        }
      }
      setIsLoading(false);
    };

    getToken();
  }, [pathname, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
