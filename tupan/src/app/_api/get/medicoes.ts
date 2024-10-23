import { useToken } from '@/hooks/token';
import { api_route } from '..';

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

export const obterMedicoes = async (token: string): Promise<Medicao[]> => {
  try {
    const response = await fetch(`${api_route}medicoes`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter medições: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Medicao[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

export const obterMedicaoPorId = async (id: number): Promise<Medicao> => {
  const token = useToken();

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }

  try {
    const token = useToken();
    const response = await fetch(`${api_route}medicoes/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter medição: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Medicao;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
