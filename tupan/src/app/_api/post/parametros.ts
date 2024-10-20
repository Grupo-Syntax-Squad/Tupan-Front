import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Parametro {
    nome: string;
    fator: number;
    offset: number; 
    unidade: string;
    nome_json: string;
  }
  
  export const criarParametro = async (parametro: Parametro): Promise<any> => {
    const token = useToken()
    try {

    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }
    
      const response = await fetch(`${api_route}parametros`, {
        method: "POST",
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametro),
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao criar o parâmetro: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Erro na requisição:", error);
      throw error; 
    }
  };