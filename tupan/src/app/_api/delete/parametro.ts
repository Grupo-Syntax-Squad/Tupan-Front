import { api_route } from '..';

// Função para obter o token armazenado
const obterToken = (): string | null => {
  return localStorage.getItem('token');
};

export const deletarParametro = async (id: number): Promise<void> => {
  const token = obterToken(); // Obtendo o token armazenado

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }

  try {
    const response = await fetch(`${api_route}/parametros/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`, // Usando o token dinamicamente
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
