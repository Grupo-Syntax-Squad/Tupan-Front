import { api_route } from "..";
import { criarEndereco } from "@/app/_api/post/enderecos";
import { useToken } from "@/hooks/token";

interface Estacao {
  nome: string;
  topico: string;
  ativo: boolean;
  criado: string;
  modificado: string;
}

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

// Remova o segundo parâmetro 'endereco' porque ele já foi tratado antes
export const criarEstacao = async (estacao: Estacao, enderecoId: number): Promise<any> => {
  const token = useToken()

  if (!token) {
    throw new Error('Token não encontrado. Por favor, faça login.');
  }
  console.log('Função criarEstacao foi chamada');
  try {
    const estacaoComEndereco = { ...estacao, endereco: enderecoId }; 

    console.log('Payload enviado:', estacaoComEndereco);

    const response = await fetch(`${api_route}estacoes`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(estacaoComEndereco),
    });

    console.log('Resposta da API ao criar a estação:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao criar a estação:', errorData);
      throw new Error(`Erro ao criar a estação: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
