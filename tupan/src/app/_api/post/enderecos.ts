import { api_route } from '..';

interface Endereco {
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
  cep: string;
  latitude: string;
  longitude: string;
}

export const criarEndereco = async (endereco: Endereco, token: any): Promise<any> => {

  try {
    if (!token) {
      throw new Error('Token não encontrado. Por favor, faça login.');
    }

    const responseEndereco = await fetch(`${api_route}enderecos`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(endereco),
    });

    if (!responseEndereco.ok) {
      throw new Error(`Erro ao criar o endereço: ${responseEndereco.statusText}`);
    }

    return await responseEndereco.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};