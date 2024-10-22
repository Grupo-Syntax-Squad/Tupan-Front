import { useState } from "react";
import { criarHistorico } from "@/app/_api/post/historico";

export const useCreateHistorico = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitHistorico = async (historico: { timestamp: number; timestamp_convertido: string; alerta: number; }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarHistorico(historico);
      setSuccess("Novo registro de histórico adicionado com sucesso!");
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

  return { submitHistorico, loading, error, success };
};