import { useState, useEffect } from 'react';
import { obterCategoriaPorId, obterCategorias} from '@/app/_api/get/categorias';
import { useToken } from '../token';

interface Categoria {
    id: number;
    unidade: string;
    nome: string;
    ativo: boolean;
    criado: string;
    modificado: string; 
}

export const useGetCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchCategorias = async () => {
    console.log('Iniciando busca de categorias');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterCategorias(token);
        console.log('Categorias obtidos com sucesso:', result);
        setCategorias(result);
      } else {
        throw new Error('Token não disponível');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter categorias:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter categorias');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchCategorias');
    fetchCategorias();
  }, [token]);

  return { categorias, loading, error, refetch: fetchCategorias };
};

export const useGetCategoriaById = (id: number) => {
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchCategoria = async () => {
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterCategoriaPorId(id);
        console.log('Categoria obtido com sucesso:', result);
        setCategoria(result);
      } else {
        setError('token não encontrado!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter categoria:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter categoria');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
        fetchCategoria();
    } else {
      console.error('ID não disponível, abortando fetch do categoria');
    }
  }, [id, token]);

  return { categoria, loading, error, refetch: fetchCategoria };
};
