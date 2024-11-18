'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasToken } from '@/hooks/token';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false); 
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Somente no lado do cliente
      setIsClient(true);
      const timeoutId = setTimeout(() => {
        if (!hasToken()) {
          router.push('/login');
        }
      }, 5000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, router]);

  if (!isClient) {
    return null;  
  }

  return <>{children}</>;
};

export default AuthGuard;
