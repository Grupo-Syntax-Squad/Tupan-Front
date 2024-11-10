
import type { Metadata } from 'next';
import '../styles/globals.css';
import ContextoDinamicoProvider from './context';
import 'flowbite/dist/flowbite.min.css';
import AuthGuard from '@/app/authGuard'
import favicon from '../../public/assets/favicon.ico';

export const metadata: Metadata = {
  title: 'Tupã',
  description: 'Tupã',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href={favicon.src} />
      </head> <body>
        <ContextoDinamicoProvider>
          <AuthGuard>{children}</AuthGuard>
        </ContextoDinamicoProvider>
      </body>
    </html>
  );
}