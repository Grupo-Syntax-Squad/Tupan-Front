import { api_route } from '..';

export const deletarUsuario = async (id: number,token: string): Promise<void> => {
  try {
    const response = await fetch(`${api_route}/usuarios/${id}`, {
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
