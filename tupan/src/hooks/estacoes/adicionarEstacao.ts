import { useState } from "react";
import { criarEstacao } from "@/app/_api/post/estacoes";
import { criarEndereco } from "@/app/_api/post/enderecos";

export const useCreateEstacao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitEstacaoComEndereco = async (
    estacao: { nome: string; topico: string; ativo: boolean; criado: string; modificado: string; },
    endereco: { id: number, logradouro: string; bairro: string; cidade: string; estado: string; numero: number; complemento: string; cep: string; latitude: number; longitude: number }
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      const enderecoCriado = await criarEndereco(endereco);
      const enderecoId = enderecoCriado.id;
  
      const result = await criarEstacao(estacao, enderecoId);
  
      setSuccess("Estação criada com sucesso!");
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
  

  return { submitEstacaoComEndereco, loading, error, success };
};
