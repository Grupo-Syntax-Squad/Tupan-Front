import { api_route } from '..';
import { useToken } from '@/hooks/token';

interface Usuario {
  id: number;
  email: string;
  password: string;
}

export const atualizarUsuario = async (usuario: Usuario): Promise<any> => {
  try {
    const token = useToken(); 
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

    const response = await fetch(`${api_route}/usuarios/${usuario.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o usuario: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Usuario[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
