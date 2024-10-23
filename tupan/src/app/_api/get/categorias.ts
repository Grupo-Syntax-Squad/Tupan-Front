import { useToken } from "@/hooks/token";
import { api_route } from "..";

interface Categoria {
    id: number;
    unidade: string;
    nome: string;
    ativo: boolean;
    criado: string;
    modificado: string; 
}

export const obterCategorias = async (token: string): Promise<Categoria[]> => {
  try {
    const response = await fetch(`${api_route}categorias`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter categorias: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Categoria[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterCategoriaPorId = async (id: number): Promise<Categoria> => {
  const token = useToken(); 

  if (!token) {
    throw new Error("Token não encontrado. Por favor, faça login.");
  }

  try {
    const token =  useToken()
    const response = await fetch(`${api_route}categorias/${id}`, {
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
    return data as Categoria;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
