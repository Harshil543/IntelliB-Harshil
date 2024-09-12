'use client';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const getToken = () => {
    const fetchedToken = storage.getToken();
    if (!fetchedToken) {
      router.push('/login');
    }
    setToken(fetchedToken || null);
    setIsLoading(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getToken();
    }
  }, []);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      if (!token) {
        router.push('/login');
      } else {
        router.push('/');
      }
    }
  }, [isLoading, token, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;
