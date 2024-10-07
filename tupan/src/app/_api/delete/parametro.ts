import { api_route } from '..';

export const deletarParametro = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${api_route}/parametros/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
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
