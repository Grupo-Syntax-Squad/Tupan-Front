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
    const response = await fetch(`${api_route}enderecos`, {
      method: "POST",
      headers: {
        "Authorization": `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
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
