import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Historico {
    timestamp: number;
    timestamp_convertido: string;
    alerta: number; 
  }
  
  export const criarHistorico = async (historico: Historico): Promise<any> => {
    const token = useToken()
    try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

      const response = await fetch(`${api_route}historicos`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(historico),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao publicar o histórico: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };