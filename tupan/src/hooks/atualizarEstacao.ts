import { useState } from "react";
import { atualizarEstacao } from "@/app/_api/update/estacao";
import { obterEstacaoPorId } from "@/app/_api/get/estacoes";

export const useUpdateEstacao = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DadosEstacao = async (id: number) => {
    console.log("Iniciando busca de estação com id:", id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await obterEstacaoPorId(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao obter dados da estaçãoo:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao obter estação");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateEstacao = async (estacao: {
    id: number;
    nome: string;
    topico:string,
    ativo:boolean,
    criado: string;
    modificado: string;
  }) => {
    const dados = await DadosEstacao(estacao.id);

    if (!dados) {
      console.error('Não foi possível obter os dados da estação');
      throw new Error('Não foi possível obter os dados da estação');
    }

    estacao.nome = estacao.nome || dados.nome;
    estacao.topico = estacao.topico || dados.topico;
    estacao.criado = dados.criado;
    if (estacao.id !== dados.id) {
      console.error("Erro: O id da estação não corresponde ao id da requisição");
      return new Error('O id da estação não corresponde ao id da requisição');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await atualizarEstacao(estacao);
      setSuccess("Estação atualizada com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao atualizar a estação:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao atualizar a estação");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateEstacao, loading, error, success };
};
