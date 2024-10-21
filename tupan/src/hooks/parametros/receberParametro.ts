import { useState, useEffect } from 'react';
import {
  obterParametroPorId,
  obterParametros,
} from '@/app/_api/get/parametros';

interface Parametro {
  id: number;
  nome: string;
  fator: string;
  offset: string;
  unidade: string;
  nome_json: string;
  criado: string;
  modificado: string;
  descricao?: string;
  status?: string;
}

export const useGetParametros = () => {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParametros = async () => {
    console.log('Iniciando busca de parâmetros');
    setLoading(true);
    setError(null);

    try {
      const result = await obterParametros();
      console.log('Parâmetros obtidos com sucesso:', result);
      setParametros(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter parâmetros:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter parâmetros');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchParametros');
    fetchParametros();
  }, []);

  return { parametros, loading, error, refetch: fetchParametros };
};

export const useGetParametroById = (id: number) => {
  const [parametro, setParametro] = useState<Parametro | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParametro = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await obterParametroPorId(id);
      console.log('Parâmetro obtido com sucesso:', result);
      setParametro(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter parâmetro:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter parâmetro');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchParametro();
    } else {
      console.error('ID não disponível, abortando fetch do parâmetro');
    }
  }, [id]);

  return { parametro, loading, error, refetch: fetchParametro };
};
