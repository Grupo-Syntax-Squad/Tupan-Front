import { api_route } from '..';
import { useToken } from '@/hooks/token';

interface Estacao {
  id: number;
  nome: string;
  topico:string,
  ativo:boolean,
  criado: string;
  modificado: string;
}

export const atualizarEstacao = async (estacao: Estacao): Promise<any> => {
  const token = useToken();
  try {
    const response = await fetch(`${api_route}estacoes/${estacao.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estacao),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar a estação: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Estacao[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
