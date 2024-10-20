"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { Botao } from "@/components/botao";
import { NavTop } from "@/components/nav-top";
import React, { useState, useEffect } from "react";
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
                        <div className="flex items-end space-x-5 justify-items-end">
                          <Link href={`/usuarios/${usuario.id}`} className="flex-col">
                            <Botao
                              type="button"
                              corTexto="text-white"
                              corFundo="bg-blue-500"
                              label={`ver Detalhes`}
                            />
                          </Link>
    
                      
                          <Botao
                            type="button"
                            corTexto="text-white"
                            corFundo="bg-red-600"
                            label="Deletar Usuario"
                            onClick={() => deleteUsuario(usuario.id)}
                          />
                        </div>
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
                <Link href="/cadastro-usuario" className="flex-col m-5">
                  <Botao
                    type="button"
                    corTexto="text-black"
                    corFundo="bg-green-300"
                    label="Cadastrar Usuario"
                  />
                </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
