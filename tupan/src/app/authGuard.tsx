'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { hasToken } from '@/hooks/token';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Verificando após 5 segundos');
      if (!hasToken()) {
        router.push('/login');
      }
    }, 5000); // Aguardar 5 segundos antes de verificar

    return () => clearTimeout(timeoutId); // Limpa o timeout caso o componente seja desmontado ou a rota mude antes dos 5 segundos
  }, [pathname, router]);

  return <>{children}</>;
};

export default AuthGuard;
