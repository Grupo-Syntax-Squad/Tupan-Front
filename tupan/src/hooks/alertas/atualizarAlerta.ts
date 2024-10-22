import { useState } from "react";
import { atualizarAlerta } from "@/app/_api/update/alertas";
import { obterAlertaPorId } from "@/app/_api/get/alertas";

export const useUpdateAlerta = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DadosAlerta = async (id: number) => {
    console.log("Iniciando busca de alerta com id:", id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await obterAlertaPorId(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao obter dados do alerta:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao obter alerta");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateAlerta = async (alerta: {
    id: number;
    nome: string;
    condicao: string;
    estacao_parametro: number;
    criado: string;
    modificado: string;
    ativo: boolean; 
  }) => {
    const dados = await DadosAlerta(alerta.id);

    if (!dados) {
      console.error('Não foi possível obter os dados do alerta');
      throw new Error('Não foi possível obter os dados do alerta');
    }

    alerta.nome = alerta.nome || dados.nome;
    alerta.condicao = alerta.condicao || dados.condicao;
    alerta.estacao_parametro = alerta.estacao_parametro || dados.estacao_parametro;
    alerta.ativo = alerta.ativo || dados.ativo;
    alerta.criado = dados.criado;

    if (alerta.id !== dados.id) {
      console.error("Erro: O id do alerta não corresponde ao id da requisição");
      return new Error('O id do alerta não corresponde ao id da requisição');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await atualizarAlerta(alerta);
      setSuccess("Alerta atualizado com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao atualizar o alerta:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao atualizar o alerta");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateAlerta, loading, error, success };
};
