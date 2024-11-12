
import { AppProps } from 'next/app';
import AuthGuard from '@/app/authGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  );
}

export default MyApp;