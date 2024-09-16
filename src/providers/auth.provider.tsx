'use client';
import Loader from '@/components/CommonComponents/Loader';
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
  console.log('token', token);

  useEffect(() => {
    const getToken = () => {
      const fetchedToken = storage.getToken();

      setToken(fetchedToken || null);
      setIsLoading(false);
    };
    getToken();
  }, [token, router]);

  useEffect(() => {
    if (token === null) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [token, router]);

  useEffect(() => {
    if (!isLoading && typeof window !== 'undefined') {
      if (!token) {
        router.push('/login');
      }
    }
  }, [isLoading, token, router]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthProvider;
