import type { Metadata } from "next";
import "../styles/globals.css";
import ContextoDinamicoProvider from "./context";
import "flowbite/dist/flowbite.min.css";


export const metadata: Metadata = {
  title: "Tupã",
  description: "Tupã",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`min-h-screen m-0 flex flex-row bg-gray-100`}>
        <ContextoDinamicoProvider>
          {children} {/* Todos os componentes filhos terão acesso ao contexto */}
        </ContextoDinamicoProvider>
      </body>
    </html>
  );
}
