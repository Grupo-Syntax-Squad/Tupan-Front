import { useState, useEffect } from 'react';
import { obterAlertaPorId, obterAlertas } from '@/app/_api/get/alertas';
import { useToken } from '../token';

interface Alerta {
    id: number;
    nome: string;
    condicao: string;
    estacao_parametro: number;
    criado: string;
    modificado: string;
    ativo: boolean; 
}

export const useGetAlertas = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchAlertas = async () => {
    console.log('Iniciando busca de alertas');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterAlertas(token);
        console.log('Alertas obtidos com sucesso:', result);
        setAlertas(result);
      } else {
        throw new Error('Token não disponível');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter alertas:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter alertas');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchAlertas');
    fetchAlertas();
  }, [token]);

  return { alertas, loading, error, refetch: fetchAlertas };
};

export const useGetAlertaById = (id: number) => {
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchAlerta = async () => {
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterAlertaPorId(id);
        console.log('Alerta obtido com sucesso:', result);
        setAlerta(result);
      } else {
        setError('token não encontrado!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter alerta:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter alerta');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAlerta();
    } else {
      console.error('ID não disponível, abortando fetch do alerta');
    }
  }, [id, token]);

  return { alerta, loading, error, refetch: fetchAlerta };
};
