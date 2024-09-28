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

export const obterParametros = async (): Promise<Parametro[]> => {
  try {
    const response = await fetch(`${api_route}parametros`, {
      method: "GET",
      headers: {
        "Authorization": `Token 336a2fafc45127faa82798d1e9b9e6583a062373`,
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
  try {
    const response = await fetch(`${api_route}parametros/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token 336a2fafc45127faa82798d1e9b9e6583a062373`,
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
}
