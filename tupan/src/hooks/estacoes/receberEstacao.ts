'use client';

import { useState, useEffect } from 'react';
import { obterEstacaoPorId, obterEstacoes } from '@/app/_api/get/estacoes';
import { useToken } from '../token';

interface Estacao {
  id: number;
  ativo: boolean;
  nome: string;
  endereco: {};
  parametros: [];
  topico: string;
  criado: string;
  modificado: string;
}

export const useGetEstacoes = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchEstacoes = async () => {
    console.log('Iniciando busca de estações');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterEstacoes(token);
        console.log('Estações obtidas com sucesso:', result);
        setEstacoes(result);
      } else {
        console.log(token);
        setError('Token não disponível');
      }
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
    // Chamando fetchParametros apenas se o token estiver disponível
    if (token) {
      console.log('useEffect: Chamando fetchEstacoes');
      fetchEstacoes();
    } else {
      console.warn(
        'Token não disponível no useEffect, não chamando fetchEstacoes'
      );
    }
  }, [token]);

  return { estacoes, loading, error, refetch: fetchEstacoes };
};

export const useGetEstacaoById = (id: number, token: string | null) => {
  const [estacao, setEstacao] = useState<Estacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEstacao = async () => {
    console.log(`Iniciando busca de estação com ID: ${id}`);
    setLoading(true);
    setError(null);
    console.log('token', token);

    try {
      if (token) {
        const result = await obterEstacaoPorId(id, token);
        console.log('Estação obtida com sucesso:', result);
        setEstacao(result);
      } else {
        console.warn('Token não disponível na função fetchEstacao');
        setError('Token não disponível');
      }
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
    if (id && token) {
      fetchEstacao();
    } else if (!token || !token) {
      console.error('ID ou token não disponível, abortando fetch da estação');
    }
  }, [id, token]);

  return { estacao, loading, error, refetch: fetchEstacao };
};
