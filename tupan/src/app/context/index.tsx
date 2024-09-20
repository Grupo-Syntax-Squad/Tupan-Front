"use client"
import { createContext, useState, useContext, ReactNode } from "react";


type ContextoDinamicoType = {
  state: Record<string, unknown>; // armazenar vários valores
  setValue: (key: string, value: unknown) => void; // atualizar um valor específico
};

// Criar o contexto com valor inicial vazio
const ContextoDinamico = createContext<ContextoDinamicoType | undefined>(undefined);

// Componente provedor do contexto
export default function ContextoDinamicoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Record<string, unknown>>({}); // começa vazio

  // atualizar um valor dinâmico no contexto
  const setValue = (key: string, value: unknown) => {
    setState((prevState) => ({
      ...prevState, // Manter o estado atual
      [key]: value, // mudar valor chave especificada
    }));
  };

  return (
    <ContextoDinamico.Provider value={{ state, setValue }}>
      {children}
    </ContextoDinamico.Provider>
  );
}

// Hook para acessar o contexto facilmente
export function useDynamicContext() {
  const context = useContext(ContextoDinamico);
  if (!context) {
    throw new Error("useDynamicContext deve ser usado dentro de um DynamicContextProvider");
  }
  return context;
}
