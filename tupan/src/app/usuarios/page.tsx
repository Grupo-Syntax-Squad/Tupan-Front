"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import TokenVerificacao from "@/hooks/verificacaoToken";
import React, { useState } from "react";
import axios from "axios";

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Função para buscar os usuários
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

  // Callback quando o token é válido
  const handleTokenValid = (token: string) => {
    setToken(token);
    fetchUsuarios(token);
  };

  // Callback quando o token é inválido
  const handleTokenInvalid = () => {
    setError("Token não encontrado, por favor faça login.");
  };

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/logout", icone: "bx bx-log-out" },
  ];

  return (
    <div className="w-screen flex bg-gray-100">
      <TokenVerificacao onTokenValid={handleTokenValid} onTokenInvalid={handleTokenInvalid} />
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuários" path="Usuários" />
        <div className="flex flex-col items-center">
          <div className="mt-10 w-3/4 flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}
            {usuarios.length > 0 ? (
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="text-white" style={{ backgroundColor: "#4e00a9" }}>
                  <tr>
                    <th className="p-4 text-center">ID</th>
                    <th className="p-4 text-center">Email</th>
                    <th className="p-4 text-center">Data de criação</th>
                    <th className="p-4 text-center">Data de atualização</th>
                    <th className="p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario: any) => (
                    <tr key={usuario.id} className="text-center border-b">
                      <td className="p-3">{usuario.id}</td>
                      <td className="p-3">{usuario.email}</td>
                      <td className="p-3">{usuario.criacao}</td>
                      <td className="p-3">{usuario.alterado}</td>
                      <td className="p-3">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 m-2"
                          aria-label={`Ver detalhes do ${usuario.id}`}
                        >
                          Ver Detalhes
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                          onClick={() => deleteUsuario(usuario.id)}
                        >
                          Deletar Usuário
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum usuário encontrado.</p>
            )}
          </div>
          <div className="space-x-20">
            <a
              href="/cadastro-usuario"
              className="w-64 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4 inline-block text-center"
            >
              Cadastrar novo Usuário
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
