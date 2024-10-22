import { useState, useEffect } from 'react';
import { obterUsuarioPorId, obterUsuarios } from '@/app/_api/get/usuarios';
import { useToken } from '../token';

interface Usuario {
  id: number;
  email: string;
  password: string;
  criado: string;
  modificado?: string;
}

export const useGetUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchUsuarios = async () => {
    console.log('Iniciando busca de usuarios');
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterUsuarios(token);
        console.log('Usuarios obtidos com sucesso:', result);
        setUsuarios(result);
      } else {
        throw new Error('Token não disponível');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter usuarios:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter usuarios');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect: Chamando fetchUsuarios');
    fetchUsuarios();
  }, [token]);

  return { usuarios, loading, error, refetch: fetchUsuarios };
};

export const useGetUsuarioById = (id: number) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useToken();

  const fetchUsuario = async () => {
    setLoading(true);
    setError(null);

    try {
      if (token) {
        const result = await obterUsuarioPorId(id);
        console.log('Usuario obtido com sucesso:', result);
        setUsuario(result);
      } else {
        setError('token não encontrado!');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao obter usuario:', error.message);
        setError(error.message);
      } else {
        console.error('Erro desconhecido ao obter usuario');
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUsuario();
    } else {
      console.error('ID não disponível, abortando fetch do usuario');
    }
  }, [id, token]);

  return { usuario, loading, error, refetch: fetchUsuario };
};
