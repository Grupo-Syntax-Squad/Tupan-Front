import { useState } from "react";
import { criarEndereco } from "@/app/_api/post/enderecos";

export const useCreateEndereco = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitEndereco = async (endereco: { id: number; logradouro: string; bairro: string; cidade: string; estado: string; numero: string; complemento: string; cep: string; latitude: string; longitude: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarEndereco(endereco);
      setSuccess("Endereço criado com sucesso!");
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

  return { submitEndereco, loading, error, success };
};