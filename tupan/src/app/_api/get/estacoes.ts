import { api_route } from "..";

interface Estacao {
  id: number;
  nome: string;
  topico: string;
  ativo: boolean;
  criado: string;
  modificado: string;
  endereco_id: number;
}

// Função para obter o token armazenado no localStorage
const obterToken = (): string | null => {
  return localStorage.getItem("token");
};

export const obterEstacoes = async (): Promise<Estacao[]> => {
  const token = obterToken(); // Obtendo o token armazenado

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const response = await fetch(`${api_route}estacoes`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`, // Usando o token dinamicamente
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

export const obterEstacaoPorId = async (id: number): Promise<Estacao> => {
  const token = obterToken(); // Obtendo o token armazenado

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
