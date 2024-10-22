import { useState, useEffect } from 'react';
import { obterHistoricos } from '@/app/_api/get/historico';
import { useToken } from '../token';

interface Historico {
    id: number;
    timestamp: number;
    timestamp_convertido: string;
    alerta: number;
    criado: string;
    modificado: string;
    dias?: number;
}

export const useGetHistoricos = () => {
  const [historicos, setHistoricos] = useState<Historico[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchHistoricos = async () => {
    console.log('Iniciando busca de historicos');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterHistoricos(token);
        console.log('Historicos obtidos com sucesso:', result);
        setHistoricos(result);
      } else {
        throw new Error('Token não disponível');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter historicos:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter historicos');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchHistoricos');
    fetchHistoricos();
  }, [token]);

  return { historicos, loading, error, refetch: fetchHistoricos };
};
