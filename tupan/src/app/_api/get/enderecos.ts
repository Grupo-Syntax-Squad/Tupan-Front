import { api_route } from "..";

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
  try {
    const response = await fetch(`${api_route}enderecos`, {
      method: "GET",
      headers: {
        "Authorization": `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
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
  try {
    const response = await fetch(`${api_route}enderecos/${id}`, {
      method: "GET",
      headers: {
        "Authorization": `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
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
