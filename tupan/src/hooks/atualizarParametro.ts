import { useState } from "react";
import { atualizarParametro } from "@/app/_api/update/parametro";
import { obterParametroPorId } from "@/app/_api/get/parametros";

export const useUpdateParametro = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DadosParametro = async (id: number) => {
    console.log("Iniciando busca de parâmetro com id:", id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await obterParametroPorId(id);
      console.log("Dados obtidos para o parâmetro:", result);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao obter dados do parâmetro:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao obter parâmetro");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateParametro = async (parametro: {
    id: number;
    nome: string;
    fator: string;
    offset: string;
    unidade: string;
    nome_json: string;
    modificado: string;
    criado: string;
  }) => {
    console.log("Iniciando atualização do parâmetro:", parametro);
    const dados = await DadosParametro(parametro.id);

    if (!dados) {
      console.error('Não foi possível obter os dados do parâmetro');
      throw new Error('Não foi possível obter os dados do parâmetro');
    }

    parametro.nome = parametro.nome || dados.nome;
    parametro.fator = parametro.fator || dados.fator;
    parametro.offset = parametro.offset || dados.offset;
    parametro.unidade = parametro.unidade || dados.unidade;
    parametro.nome_json = parametro.nome_json || dados.nome_json;
    parametro.criado = dados.criado;

    if (parametro.id !== dados.id) {
      console.error("Erro: O id do parâmetro não corresponde ao id da requisição");
      return new Error('O id do parâmetro não corresponde ao id da requisição');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await atualizarParametro(parametro);
      console.log("Parâmetro atualizado com sucesso:", result);
      setSuccess("Parâmetro atualizado com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao atualizar o parâmetro:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao atualizar o parâmetro");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateParametro, loading, error, success };
};
