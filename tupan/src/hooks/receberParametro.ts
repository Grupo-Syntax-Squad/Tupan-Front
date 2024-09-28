import { useState, useEffect } from 'react';
import { obterParametros } from '@/app/_api/get/parametros';

interface Parametro {
    id: number;
    nome: string;
    fator: string;
    offset: string;
    unidade: string;
    nome_json: string;
    criado: string;
    modificado: string;
  }
  
export const useGetParametros = () => {
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchParametros = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await obterParametros();
      setParametros(result);
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

  useEffect(() => {
    fetchParametros();
  }, []);

  return { parametros, loading, error, refetch: fetchParametros };
};
