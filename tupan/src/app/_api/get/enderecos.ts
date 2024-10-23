import { api_route } from "..";
import { useToken } from "@/hooks/token";

interface Endereco {
  id: number;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: number;
  complemento: string;
  cep: string;
  latitude: number;
  longitude: number;
}

export const obterEnderecos = async (): Promise<Endereco[]> => {
  const token = useToken();
  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }
  try {
    const response = await fetch(`${api_route}enderecos`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao obter endereços: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Endereco[];
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export const obterEnderecoPorId = async (id: number): Promise<Endereco> => {
  const token = useToken();
  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }
  try {
    const response = await fetch(`${api_route}enderecos/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      }, 
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao obter endereço: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Endereco;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
}
