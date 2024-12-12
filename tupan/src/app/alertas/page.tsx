"use client";

import { useState } from 'react';

//componentes
import { MenuLateral } from "@/components/menu/lateral";
import { NavTop } from "@/components/nav-top";
import { Formulario } from '@/components/formularios/alertas/formulario-alertas';
import { Tabela } from "@/components/tabela/tabela-alertas";

//hooks
import { useControleAcesso } from '@/hooks/secao/controleAcesso';
import { useGetAlertas } from "@/hooks/alertas/receberAlerta";

//utils
import Link from 'next/link';

export default function Alertas() {
  const controleAcesso = useControleAcesso();
  const { alertas, loading, error, refetch } = useGetAlertas();

  const colunas = [
    { acessor: 'nome', label: 'Nome' },
    { acessor: 'status', label: 'Status' },
    { acessor: 'condicao', label: 'Condição' },
  ];
  const dados = alertas.map((alerta) => ({
    nome: alerta.nome,
    status: alerta.ativo ? 'Ativo': 'Inativo',
    condicao: alerta.condicao,
  }));

  const handleSubmit = () => {
    refetch();
  };


  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/login", icone: "bx bx-log-out" },
  ];

  if (controleAcesso === true) {
    window.location.href = '/';
    return null;
  }

  const [isModalVisible, setModalVisible] = useState(false);


  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop path="Alertas" nome="" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {alertas.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem alertas cadastrados!</p>
              <Formulario
                onSubmit={handleSubmit}
                dados={{}}
                initialStatus={true}
              />
            </div>
          ) : (
            <>
              <div className="w-1/2">
                <Tabela colunas={colunas} dados={dados} />
              </div>
              <div className="flex-1">
                <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
              </div>
            </>
          )}
        </div>
        {/* Botão flutuante no canto da tela */}
      <button
        onClick={() => setModalVisible(true)}
        className="fixed bottom-4 right-4 text-white bg-blue-500 hover:bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
      >
        ?
      </button>

      {/* Modal de ajuda */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-lg text-center max-w-md">
            <h2 className="text-lg font-bold mb-4">Alertas</h2>
            <p>
            Esta é a página de <span className="font-bold text-blue-600">Alertas</span>. Aqui você pode gerenciar os alertas que serão acionados. Os alertas são muito importantes para que sejam tomadas ações preventivas em relação a condição da estação. Eles servem para avisar o usuário de que determinada estação está com uma condição espefícica de acordo com o <span className="font-bold text-blue-600">parâmetro</span> escolhido, como por exemplo, temperatura acima de 30ºC ou menor que 10ºC.
            </p>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

