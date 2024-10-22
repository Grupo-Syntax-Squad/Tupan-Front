import { api_route } from "..";

interface Endereco {
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

export const criarEndereco = async (endereco: Endereco): Promise<Endereco> => {
  try {
    const token = localStorage.getItem('token');

    // Verifica se o token está disponível
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

    const response = await fetch(`${api_route}enderecos`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(endereco),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(`Erro ao criar o endereço: ${response.statusText}`);
    }

    return responseData;
  } catch (error) {
    console.error("Erro na requisição do endereço:", error);
    throw error;
  }
};
