import { useState } from "react";
import { criarAlerta } from "@/app/_api/post/alertas";
import { useToken } from "../token";

export const useCreateAlerta = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const token = useToken();

  const submitAlerta = async (alerta: { nome: string; condicao: string; ativo: boolean; estacao_parametro: {} }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarAlerta(alerta, token);
      setSuccess("Alerta criado com sucesso!");
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

  return { submitAlerta, loading, error, success };
};