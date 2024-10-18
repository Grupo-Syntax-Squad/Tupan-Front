import { api_route } from "..";

interface Estacao {
  id: number;
  nome: string;
  topico:string,
  ativo:boolean,
  criado: string;
  modificado: string;
  endereco_id: number;
}

export const obterEstacoes = async (): Promise<Estacao[]> => {
  try {
    const response = await fetch(`${api_route}estacoes`, {
      method: "GET",
      headers: {
        "Authorization": `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter estacções: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Estacao[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterEstacaoPorId = async (id: number): Promise<Estacao> => {
  try {
    const response = await fetch(`${api_route}estacoes/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
        "Content-Type": "application/json",
      }, 
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao obter estação: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Estacao;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
