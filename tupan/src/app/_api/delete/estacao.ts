import { api_route } from '..';
import { useToken } from '@/hooks/token';

export const deletarEstacao = async (id: number): Promise<void> => {
  const token = useToken();
  try {
    const response = await fetch(`${api_route}/estacoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar a estação: ${response.statusText}`);
    }

    console.log('Estação deletada com sucesso');
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
