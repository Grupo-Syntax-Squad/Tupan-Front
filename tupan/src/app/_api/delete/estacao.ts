import { api_route } from '..';

export const deletarEstacao = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${api_route}/estacoes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
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
