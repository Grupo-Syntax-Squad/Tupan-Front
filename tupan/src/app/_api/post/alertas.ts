import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Alerta {
    nome: string;
    condicao: string;
    ativo: boolean; 
  }
  
  export const criarAlerta = async (alerta: Alerta): Promise<any> => {
    const token = useToken()
    try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

      const response = await fetch(`${api_route}alertas`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alerta),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar o alerta: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };