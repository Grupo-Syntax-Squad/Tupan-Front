import { useState } from "react";
import { criarEstacao } from "../../app/_api/post/estacoes";
import { criarEndereco } from "../../app/_api/post/enderecos";
import { useToken } from "../token";

interface Estacao {
  nome: string;
  topico: string;
  ativo: boolean;
  parametros: number[];
}

interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
  cep: string;
  latitude: string;
  longitude: string;
}

export const useCreateEstacao = () => {
  const token = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const submitEstacao = async (estacao: Omit<Estacao, 'endereco'>, endereco: Endereco) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      console.log('Iniciando criação do endereço:', endereco);
      const enderecoCriado = await criarEndereco(endereco, token);
      console.log('Endereço criado:', enderecoCriado);

      if(!enderecoCriado.id) {
        throw new Error('Erro ao criar o endereço');
      }
      const enderecoId = enderecoCriado.id;
      const estacaoComEndereco = { ...estacao, endereco: enderecoId };
      console.log('Criando estação com endereço:', estacaoComEndereco);
      const result = await criarEstacao(estacaoComEndereco, token);
      console.log('Estação criada:', result);
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
  

  return { submitEstacao, loading, error, success };
};
