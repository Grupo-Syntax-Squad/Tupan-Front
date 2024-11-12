'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasToken } from '@/hooks/token';
import Loading from './loading';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasToken()) {
        router.push('/login');
      } else {
        setIsTokenChecked(true);
      }
    }, 5000); 

    return () => clearTimeout(timeoutId); 
  }, [pathname, router]);

  if (!isTokenChecked) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
