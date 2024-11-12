import { api_route } from "..";

interface Estacao {
  id: number;
  nome: string;
  endereco: {};
  topico: string;
  ativo: boolean;
  criado: string;
  modificado: string;
  endereco_id: number;
}


export const obterEstacoes = async (token: string): Promise<Estacao[]> => {

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const response = await fetch(`${api_route}estacoes`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`, 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter estações: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Estacao[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterEstacaoPorId = async (id: number, token: string): Promise<Estacao> => {

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const response = await fetch(`${api_route}estacoes/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`, // Usando o token dinamicamente
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
};
