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
      <body >
        <ContextoDinamicoProvider>
          {children} {/* Todos os componentes filhos terão acesso ao contexto */}
        </ContextoDinamicoProvider>
      </body>
    </html>
  );
}
