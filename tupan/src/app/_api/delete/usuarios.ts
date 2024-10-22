import { api_route } from '..';
import { useToken } from '@/hooks/token';

export const deletarUsuario = async (id: number): Promise<void> => {
  const token = useToken(); 

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }

  try {
    const response = await fetch(`${api_route}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao deletar o usuario: ${response.statusText}`);
    }

    console.log('Usuario deletado com sucesso');
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
