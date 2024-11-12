import { api_route } from '..';

interface Estacao {
  nome: string;
  endereco: number;
  topico: string;
  ativo: boolean;
  parametros: Number[];
}

export const criarEstacao = async (estacao: Estacao, token: any): Promise<any> => {
  try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

    const responseEstacao = await fetch(`${api_route}estacoes`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estacao),
    });

    if (!responseEstacao.ok) {
      throw new Error(`Erro ao criar a estação: ${responseEstacao.statusText}`);
    }

    return await responseEstacao.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};