import { useState } from "react";
import { criarUsuario } from "@/app/_api/post/usuarios";
import { useToken } from "../token";

export const useCreateUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const token = useToken();

  const submitUsuario = async (usuario: { email: string; password: string; }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await criarUsuario(usuario, token);
      setSuccess("Usuario registrado com sucesso!");
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

  return { submitUsuario, loading, error, success };
};