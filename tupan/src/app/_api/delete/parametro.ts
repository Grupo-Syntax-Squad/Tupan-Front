import { api_route } from '..';
import { useToken } from '@/hooks/token';

export const deletarParametro = async (id: number): Promise<void> => {
  const token = useToken(); 

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }

  try {
    const response = await fetch(`${api_route}/parametros/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o parâmetro: ${response.statusText}`);
    }

    console.log('Parâmetro deletado com sucesso');
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
