import { useState } from "react";
import { useCreateParametro } from "@/app/_api/post/parametros";
import { usePopConfirmacao } from "./visivel";

interface Parametro {
  nome: string;
  fator: number;
  offset: number;
  escala: string;
  medida: string;
  descricao: string;
  status: string;
  nome_json: string;
}

export const useAdicionarParametro = () => {
  const { criarParametro, loading, error, success } = useCreateParametro();
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();

  const handleAdicionarParametro = async (parametro: Parametro) => {
    const data = await criarParametro(parametro);
    if (data) {
      showPopConfirmacao("Parâmetro adicionado com sucesso!");
    }
  };

  return {
    handleAdicionarParametro,
    loading,
    error,
    success,
    isVisible,
    mensagem,
    hidePopConfirmacao,
  };
};
