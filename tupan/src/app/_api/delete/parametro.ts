import { api_route } from '..';

export const deletarParametro = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${api_route}/parametros/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token 336a2fafc45127faa82798d1e9b9e6583a062373`,
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
