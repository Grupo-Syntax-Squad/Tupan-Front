import { api_route } from "..";

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

// Função para obter o token armazenado
const obterToken = (): string | null => {
  return localStorage.getItem("token");
};

export const obterParametros = async (): Promise<Parametro[]> => {
  const token = obterToken(); // Obtendo o token armazenado

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const response = await fetch(`${api_route}parametros`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`, // Usando o token dinamicamente
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter parâmetros: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Parametro[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterParametroPorId = async (id: number): Promise<Parametro> => {
  const token = obterToken(); // Obtendo o token armazenado

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const response = await fetch(`${api_route}parametros/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`, // Usando o token dinamicamente
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao obter parâmetro: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Parametro;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
