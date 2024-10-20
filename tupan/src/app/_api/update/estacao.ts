import { api_route } from '..';

interface Estacao {
  id: number;
  nome: string;
  topico:string,
  ativo:boolean,
  criado: string;
  modificado: string;
}

export const atualizarEstacao = async (
  estacao: Estacao
): Promise<any> => {
  try {
    const response = await fetch(`${api_route}estacoes/${estacao.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estacao),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar a estação: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Estacao[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
