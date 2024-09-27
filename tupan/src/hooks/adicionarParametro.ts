import { useState } from "react";
import { criarParametro } from "@/app/_api/post/parametros";

export const useCreateParametro = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitParametro = async (parametro: { nome: string; fator: 0; offset: 0; unidade: string; nome_json: string; }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarParametro(parametro);
      setSuccess("Parâmetro criado com sucesso!");
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

  return { submitParametro, loading, error, success };
};