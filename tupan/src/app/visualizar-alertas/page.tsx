"use client";

import { MenuLateral } from "@/components/menu/lateral";
import { NavTop } from "@/components/nav-top";
import React, { useEffect, useState } from "react";
import { Alerta } from "@/components/alertas";



const DetalheAlerta: React.FC = () => {
  const [alerta, setAlerta] = useState<Alerta | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para obter o ID a partir da URL
  const getIdFromUrl = () => {
    const url = window.location.href;
    const id = url.split("/").pop(); // Extrai o último segmento da URL
    return id;
  };

  useEffect(() => {
    const id = getIdFromUrl();

    if (id) {
      const fetchAlerta = async () => {
        try {
          const response = await fetch(`/alertas/${id}`);
          const data = await response.json();
          setAlerta(data);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao buscar o alerta:", error);
        }
      };

      fetchAlerta();
    }
  }, []);

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/", icone: "bx bx-log-out" },
  ];

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!alerta) {
    return <p>Alerta não encontrado</p>;
  }

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path={`Alertas / ${alerta.nome}`} />

        <div className="flex flex-col items-center mt-10">
          <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Detalhes do Alerta</h1>
            <p><strong>ID:</strong> {alerta.id}</p>
            <p><strong>Nome:</strong> {alerta.nome}</p>
            <p><strong>Condição:</strong> {alerta.condicao}</p>
            <p><strong>Ativo:</strong> {alerta.ativo ? "Sim" : "Não"}</p>
            <p><strong>Estação Parâmetro ID:</strong> {alerta.estacao_parametro_id}</p>

            <a
              href="/alertas"
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Voltar para lista de alertas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalheAlerta;
