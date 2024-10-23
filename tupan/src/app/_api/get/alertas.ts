import { useToken } from "@/hooks/token";
import { api_route } from "..";

interface Alerta {
    id: number;
    nome: string;
    condicao: string;
    estacao_parametro: number;
    criado: string;
    modificado: string;
    ativo: boolean; 
  }

export const obterAlertas = async (token: string): Promise<Alerta[]> => {
  try {
    const response = await fetch(`${api_route}alertas`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter alertas: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Alerta[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterAlertaPorId = async (id: number): Promise<Alerta> => {
  const token = useToken(); 

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const token =  useToken()
    const response = await fetch(`${api_route}alertas/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao obter categoria: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Alerta;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
