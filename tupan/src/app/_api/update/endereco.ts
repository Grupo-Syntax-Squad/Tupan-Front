import { api_route } from '..';

interface Endereco {
  id: number,
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

export const atualizarEndereco = async (
  endereco: Endereco
): Promise<any> => {
  try {
    const response = await fetch(`${api_route}enderecos/${endereco.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token 2948c11eaf985f44737d8fa84db99846e8197fae`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(endereco),
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar o Endereço: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Endereco[];
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
