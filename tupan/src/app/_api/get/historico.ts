import { api_route } from "..";

interface Historico {
  id: number;
  timestamp: number;
  timestamp_convertido: string;
  alerta: number;
  criado: string;
  modificado: string;
  dias?: number;
}

export const obterHistoricos = async (token: string): Promise<Historico[]> => {
  try {
    const response = await fetch(`${api_route}historicos`, {
      // `${api_route}historicos?${dias}`
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter históricos: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Historico[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

