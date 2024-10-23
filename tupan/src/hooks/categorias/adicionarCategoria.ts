import { useState } from "react";
import { criarCategoria } from "@/app/_api/post/categorias";

export const useCreateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitCategoria = async (categoria: { unidade: string; nome: string; ativo: boolean; }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarCategoria(categoria);
      setSuccess("Categoria criado com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { submitCategoria, loading, error, success };
};