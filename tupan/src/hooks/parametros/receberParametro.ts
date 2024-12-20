import { useState, useEffect } from 'react';
import { obterParametroPorId, obterParametros } from '@/app/_api/get/parametros';
import { useToken } from '../token';

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
  const token = useToken();

  const fetchParametros = async () => {
    console.log('Iniciando busca de parâmetros');
    setLoading(true);
    setError(null);

    try {
      // Verificando se o token está disponível
      if (token) {
        console.log('Token disponível:', token);
        const result = await obterParametros(token);
        console.log('Parâmetros obtidos com sucesso:', result);
        setParametros(result);
      } else {
        throw new Error('Token não disponível');
      }
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
    // Chamando fetchParametros apenas se o token estiver disponível
    if (token) {
      console.log('useEffect: Chamando fetchParametros');
      fetchParametros();
    } else {
      console.warn('Token não disponível no useEffect, não chamando fetchParametros');
    }
  }, [token]);

  return { parametros, loading, error, refetch: fetchParametros };
};

export const useGetParametroById = (id: number) => {
  const [parametro, setParametro] = useState<Parametro | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchParametro = async () => {
    console.log(`Iniciando busca de parâmetro com ID: ${id}`);
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterParametroPorId(id, token);
        console.log('Parâmetro obtido com sucesso:', result);
        setParametro(result);
      } else {
        setError('Token não encontrado!');
      }
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
    // Verificando se o ID está disponível antes de chamar a função
    if (id) {
      fetchParametro();
    } else {
      console.error('ID não disponível, abortando fetch do parâmetro');
    }
  }, [id, token]);

  return { parametro, loading, error, refetch: fetchParametro };
};
