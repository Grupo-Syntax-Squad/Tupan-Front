"use client";

import axios from 'axios';
import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import { Botao } from "@/components/botao";
import FormatadorData from "@/components/formatadorData";
import React, { useState, useEffect } from "react";

const VisualizarUsuarios: React.FC = () => {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Função para buscar todos os usuários
  const fetchUsuarios = (token: string) => {
    axios
      .get("http://localhost:8000/usuarios/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setUsuarios(response.data);
        setError(null); // Limpa os erros
      })
      .catch((error) => {
        console.error("Erro ao carregar os usuários:", error);
        setError("Erro ao carregar os usuários.");
      });
  };

  // Verifica se já existe um token no localStorage e faz a requisição
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("id");

    if (storedToken) {
      setToken(storedToken);
      fetchUsuarios(storedToken); // Busca todos os usuários
    } else {
      setError("Token não encontrado, por favor faça login.");
    }

    if (storedId) {
      const usuarioFiltrado = usuarios.find(user => user.id === Number(storedId));
      setUsuario(usuarioFiltrado);
    }
  }, [usuarios]);

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/", icone: "bx bx-log-out" },
  ];

  const handleDelete = async () => {
    if (usuario) {
      try {
        await axios.delete(`http://localhost:8000/usuarios/${usuario.id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log("Usuário deletado com sucesso.");
      } catch (error) {
        console.error("Erro ao deletar o usuário:", error);
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path="Usuário" />

        <div className="flex flex-col items-center">
          <section className="flex justify-center items-center h-screen w-screen bg-white">
            <div className="flex gap-10">
              <div className="max-w-md flex flex-col">
                {error && <p className="text-red-500">{error}</p>}
                {usuario ? (
                  <>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={usuario.email}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="data-atualizacao" className="block text-sm font-medium text-gray-700">
                        Data da última atualização
                      </label>
                      <input
                        id="data-atualizacao"
                        name="data-atualizacao"
                        type="text"
                        value={usuario.alterado ? new Date(usuario.alterado).toLocaleDateString() : ""}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                      />
                    </div>


                    <div>
                      <label htmlFor="ID" className="block text-sm font-medium text-gray-700">
                        ID
                      </label>
                      <input
                        id="ID"
                        name="ID"
                        type="text"
                        value={usuario.id}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="data-atualizacao" className="block text-sm font-medium text-gray-700">
                        Data de criação
                      </label>
                      <input
                        id="data-criacao"
                        name="data-criacao"
                        type="text"
                        value={usuario.criacao ? new Date(usuario.criacao).toLocaleDateString() : ""} 
                        className="mt-1 mb-5 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                      />

                    </div>


                    <Botao
                      type="button"
                      corTexto="text-white"
                      corFundo="bg-red-600"
                      label="Deletar Usuário"
                      onClick={handleDelete}
                    />
                  </>
                ) : (
                  <p>Carregando informações do usuário...</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VisualizarUsuarios;
