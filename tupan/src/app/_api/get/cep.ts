export interface Endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }
  
  export async function fetchEndereco(cep: string): Promise<Endereco | null> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
  
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar o CEP: ${response.status}`);
      }
  
      const data: Endereco = await response.json();
      
      if ('erro' in data) {
        console.log('CEP não encontrado');
        return null;
      }
  
      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }
  