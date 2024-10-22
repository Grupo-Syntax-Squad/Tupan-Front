import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Usuario {
    email: string;
    password: string;
  }
  
  export const criarUsuario = async (usuario: Usuario): Promise<any> => {
    const token = useToken()
    try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

      const response = await fetch(`${api_route}usuarios`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar o usuario: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };