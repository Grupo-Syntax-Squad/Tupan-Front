"use client";
//componentes
import { MenuLateral } from "@/components/menu/lateral";
import { NavTop } from "@/components/nav-top";
import { Formulario } from '@/components/formularios/alertas/formulario-alertas';
import { Tabela } from "@/components/tabela/tabela-alertas";
import { Botao } from "@/components/botao/botao";

//hooks
import { useGetAlertas } from "@/hooks/alertas/receberAlerta";

//utils
import Link from 'next/link';

export default function Alertas() {

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
    { nome: "Logout", path: "/logout", icone: "bx bx-log-out" },
  ];

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop path="Estações" nome="" />

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
      </div>
    </div>
  );
}

