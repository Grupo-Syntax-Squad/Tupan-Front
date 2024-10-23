import { api_route } from '..';
import { useToken } from '@/hooks/token';

interface Alerta {
  id: number,
  nome: string;
  condicao: string;
  ativo: boolean;
}

export const atualizarAlerta = async (alerta: Alerta): Promise<any> => {
  const token = useToken();
  try {
    const response = await fetch(`${api_route}alertas/${alerta.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alerta),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o Alerta: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Alerta[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
