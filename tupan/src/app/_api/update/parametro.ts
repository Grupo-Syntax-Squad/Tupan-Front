import { api_route } from '..';

interface Parametro {
  id: number;
  nome: string;
  fator: string;
  offset: string;
  unidade: string;
  nome_json: string;
  criado: string;
  modificado: string;
}

export const atualizarParametro = async (
  parametro: Parametro
): Promise<any> => {
  try {
    const response = await fetch(`${api_route}/parametros/${parametro.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parametro),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o parâmetro: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Parametro[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
