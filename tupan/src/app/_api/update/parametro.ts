import { api_route } from '..';
import { useToken } from '@/hooks/token';

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

export const atualizarParametro = async (parametro: Parametro): Promise<any> => {
  try {
    const token = useToken(); 
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

    const response = await fetch(`${api_route}/parametros/${parametro.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parametro),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o parâmetro: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Parametro[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
