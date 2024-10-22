import { useState, useEffect } from 'react';
import { obterMedicoes, obterMedicaoPorId } from '@/app/_api/get/medicoes';
import { useToken } from '../token';

interface Medicao {
  id: number;
  timestamp: number;
  timestamp_convertido: string;
  dados: string;
  estacao_parametro: {
    id: number;
    nome: string;
    endereco: {
      id: number;
      logradouro: string;
      barrio: string;
      cidade: string;
      estado: string;
      numero: string;
      cep: string;
      complemento: string;
      latitude: string;
      longitude: string;
      criado: string;
      modificado: string;
    };
    topico: string;
    ativo: boolean;
    parametros: [0];
    criado: string;
    modificado: string;
  };
  parametro: {
    id: number;
    nome: string;
    fator: string;
    offset: string;
    nome_json: string;
    descricao: string;
    categoria: number;
    criado: string;
    modificado: string;
  };
}

export const useGetMedicoes = () => {
  const [medicoes, setMedicoes] = useState<Medicao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchMedicoes = async () => {
    console.log('Iniciando busca de medições');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterMedicoes(token);
        console.log('Medições obtidas com sucesso:', result);
        setMedicoes(result);
      } else {
        throw new Error('Token não disponível');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter medições:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter as medições');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchMedicoes');
    fetchMedicoes();
  }, [token]);

  return { medicoes, loading, error, refetch: fetchMedicoes };
};

export const useGetMedicoesById = (id: number) => {
  const [medicao, setMedicao] = useState<Medicao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchMedicao = async () => {
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterMedicaoPorId(id);
        console.log('Medição obtida com sucesso:', result);
        setMedicao(result);
      } else {
        setError('token não encontrado!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter medição:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter medição');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMedicao();
    } else {
      console.error('ID não disponível, abortando fetch da medição');
    }
  }, [id, token]);

  return { medicao, loading, error, refetch: fetchMedicao };
};
