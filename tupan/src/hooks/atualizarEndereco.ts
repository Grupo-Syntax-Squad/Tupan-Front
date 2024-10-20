import { useState } from "react";
import { atualizarEndereco } from "@/app/_api/update/endereco";
import { obterEnderecoPorId } from "@/app/_api/get/enderecos";

export const useUpdateEndereco = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DadosEndereco = async (id: number) => {
    console.log("Iniciando busca de endereço com id:", id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await obterEnderecoPorId(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao obter dados do endereço:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao obter endereço");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateEndereco = async (endereco: {
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
  }) => {
    const dados = await DadosEndereco(endereco.id);

    if (!dados) {
      console.error('Não foi possível obter os dados do endereço');
      throw new Error('Não foi possível obter os dados do endereço');
    }

    endereco.logradouro = endereco.logradouro || dados.logradouro;
    endereco.bairro = endereco.bairro || dados.bairro;
    endereco.cidade = endereco.cidade || dados.cidade;
    endereco.estado = endereco.estado || dados.estado;
    endereco.numero = endereco.numero || dados.numero;
    endereco.complemento = endereco.complemento || dados.complemento;
    endereco.cep = endereco.cep || dados.cep;
    endereco.latitude = endereco.latitude || dados.latitude;
    endereco.longitude = endereco.longitude || dados.longitude;


    if (endereco.id !== dados.id) {
      console.error("Erro: O id do endereço não corresponde ao id da requisição");
      return new Error('O id do endereço não corresponde ao id da requisição');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await atualizarEndereco(endereco);
      setSuccess("Endereço atualizado com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao atualizar o endereço:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao atualizar o ednereço");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateEndereco, loading, error, success };
};
