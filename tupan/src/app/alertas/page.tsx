"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Alerta {
  id: number;
  nome: string;
  condicao: string;
  ativo: boolean;
  estacao_parametro_id: number;
}

const Alertas: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Função para buscar os alertas da API
  const fetchAlertas = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8000/alertas", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAlertas(response.data); // Ajuste conforme o retorno da API
      console.log(response.data)
      setError(null); // Limpa erros
    } catch (error) {
      console.error("Erro ao buscar os alertas:", error);
      setError("Erro ao carregar os alertas.");
    }
  };

  // Verifica se já existe um token no localStorage e faz a requisição
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchAlertas(storedToken);
    } else {
      setError("Token não encontrado, por favor faça login.");
    }
  }, []);

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/logout", icone: "bx bx-log-out" },
  ];

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Alertas" path="Alertas" />

        <div className="flex flex-col items-center">
          <div className="mt-10 w-3/4 flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}

            {alertas.length > 0 ? (
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className=" text-white" style={{ backgroundColor: '#4e00a9' }}>
                  <tr>
                    <th className="p-4 text-center">ID</th>
                    <th className="p-4 text-center">Nome</th>
                    <th className="p-4 text-center">Condição</th>
                    <th className="p-4 text-center">Ativo</th>
                    <th className="p-4 text-center">Estação Parâmetro ID</th>
                    <th className="p-4 text-center">Emissão do alerta</th>
                    <th className="p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alertas.map((alerta) => (
                    <tr key={alerta.id} className="text-center border-b">
                      <td className="p-3">{alerta.id}</td>
                      <td className="p-3">{alerta.nome}</td>
                      <td className="p-3">{alerta.condicao}</td>
                      <td className="p-3">{alerta.ativo ? "Sim" : "Não"}</td>
                      <td className="p-3">{alerta.id}</td>
                      <td className="p-3">{alerta.criado}</td>
                      <td className="p-3">
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                          aria-label={`Ver detalhes do ${alerta.nome}`}
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum alerta encontrado.</p>
            )}
          </div>
          <div className="space-x-20">
            <a
              href="/cadastro-alerta"
              className="w-64 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4 inline-block text-center"
            >
              Cadastrar novo alerta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alertas;
