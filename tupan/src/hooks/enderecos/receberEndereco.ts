import { useState, useEffect } from 'react';
import { obterEnderecoPorId, obterEnderecos} from '@/app/_api/get/enderecos';

interface Endereco {
  id: any;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: number;
  complemento: string;
  cep: string;
  latitude: number;
  longitude: number;
}

export const useGetEnderecos = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEnderecos = async () => {
    console.log('Iniciando busca de endereços');
    setLoading(true);
    setError(null);

    try {
      const result = await obterEnderecos();
      console.log('Endereços obtidos com sucesso:', result);
      setEnderecos(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter endereços:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter endereços');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchEnderecos');
    fetchEnderecos();
  }, []);

  return { enderecos, loading, error, refetch: fetchEnderecos };
};

export const useGetEnderecoById = (id: number) => {
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEndereco = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await obterEnderecoPorId(id);
      console.log('Endereço obtido com sucesso:', result);
      setEndereco(result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter endereço:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter endereço');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEndereco();
    } else {
      console.error('ID não disponível, abortando fetch do Endereço');
    }
  }, [id]);

  return { endereco, loading, error, refetch: fetchEndereco };
};
