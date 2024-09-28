import { api_route } from "..";

interface Parametro {
    nome: string;
    fator: number;
    offset: number; 
    unidade: string;
    nome_json: string;
  }
  
  export const criarParametro = async (parametro: Parametro): Promise<any> => {
    try {
      const response = await fetch(`${api_route}parametros`, {
        method: "POST",
        headers: {
          "Authorization": `Token 336a2fafc45127faa82798d1e9b9e6583a062373`,
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