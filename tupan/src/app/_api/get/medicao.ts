import { api_route } from "..";

interface Medicao {
  id: number;
  timestamp: number;
  timestamp_convertido: string;
  dados: string;
  estacao_parametro: number;
}

export const obterMedicao = async (): Promise<Medicao[]> => {
  try {
    const response = await fetch(`${api_route}medicoes`, {
      method: "GET",
      headers: {
        "Authorization": `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
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
        "Authorization": `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
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
