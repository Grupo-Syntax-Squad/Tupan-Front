import { useState, useEffect } from 'react';
import {
  obterEstacaoPorId,
  obterEstacoes,
} from '@/app/_api/get/estacoes';

interface Estacao {
  id: number;
  nome: string;
  topico:string,
  ativo:boolean,
  criado: string;
  modificado: string;
  endereco_id: number;
}

export const useGetEstacoes = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstacoes = async () => {
    console.log('Iniciando busca de estações');
    setLoading(true);
    setError(null);

    try {
      const result = await obterEstacoes();
      console.log('Estações obtidas com sucesso:', result);
      setEstacoes(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter estações:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter estações');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchEstacoes');
    fetchEstacoes();
  }, []);

  return { estacoes, loading, error, refetch: fetchEstacoes };
};

export const useGetEstacaoById = (id: number) => {
  const [estacao, setEstacao] = useState<Estacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstacao = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await obterEstacaoPorId(id);
      console.log('Estação obtida com sucesso:', result);
      setEstacao(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter estação:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter estação');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEstacao();
    } else {
      console.error('ID não disponível, abortando fetch da estação');
    }
  }, [id]);

  return { estacao, loading, error, refetch: fetchEstacao };
};
