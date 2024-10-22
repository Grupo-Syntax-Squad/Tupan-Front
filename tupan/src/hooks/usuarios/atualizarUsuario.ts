import { useState } from "react";
import { atualizarUsuario } from "@/app/_api/update/usuarios";
import { obterUsuarioPorId } from "@/app/_api/get/usuarios";

export const useUpdateUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const DadosUsuario = async (id: number) => {
    console.log("Iniciando busca de usuario com id:", id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await obterUsuarioPorId(id);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao obter dados do usuario:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao obter usuario");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUsuario = async (usuario: {
    id: number;
    email: string;
    password: string;
    modificado: string;
    criado: string;
  }) => {
    const dados = await DadosUsuario(usuario.id);

    if (!dados) {
      console.error('Não foi possível obter os dados do usuario');
      throw new Error('Não foi possível obter os dados do usuario');
    }

    usuario.email = usuario.email || dados.email;
    usuario.password = usuario.password || dados.password;
    usuario.criado = dados.criado;

    if (usuario.id !== dados.id) {
      console.error("Erro: O id do usuario não corresponde ao id da requisição");
      return new Error('O id do usuario não corresponde ao id da requisição');
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await atualizarUsuario(usuario);
      setSuccess("Usuario atualizado com sucesso!");
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao atualizar o usuario:", error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao atualizar o usuario");
        setError('Erro desconhecido');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateUsuario, loading, error, success };
};
