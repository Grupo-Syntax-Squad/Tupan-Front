import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Categoria {
    unidade: string;
    nome: string;
    ativo: boolean; 
  }
  
  export const criarCategoria = async (categoria: Categoria): Promise<any> => {
    const token = useToken()
    try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

      const response = await fetch(`${api_route}categorias`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoria),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar a categoria: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };