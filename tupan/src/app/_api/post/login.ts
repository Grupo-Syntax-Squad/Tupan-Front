import { api_route } from "..";

interface Usuario {
    email: string;
    password: number;
  }
  
  export const Login = async (login: Usuario): Promise<any> => {
    try {
      const response = await fetch(`${api_route}api-token-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
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