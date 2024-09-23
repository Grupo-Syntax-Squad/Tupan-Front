"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import Link from "next/link"; // Importando o Link do Next.js

const menuData = [
  { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
  { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
  { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
  { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
  { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
  { nome: "Logout", path: "/", icone: "bx bx-log-out" },
];

export default function Inicial() {
  return (
    <div className="w-screen flex bg-gray-100">
      {/* Menu lateral ocupando a lateral esquerda */}
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      {/* Conteúdo principal ocupando o resto da tela */}
      <div className="w-full flex flex-col gap-4">
        {/* Barra superior ocupando a parte superior da tela */}
        <NavTop nome="Página Inicial" path="Inicial" />

        <div className="p-4">
          {/* Conteúdo da página inicial */}
          <h1 className="mt-4 text-5xl font-bold flex justify-center text-gray-600">TUPÃ</h1>
          <p className="mt-4 font-bold text-3xl flex justify-center text-gray-500">Monitoramento de Estação Meteorológica</p>

          {/* Grid de ícones */}
          <div className="flex justify-center mt-40 space-x-40">
            <Link href="/estacoes" className="flex flex-col items-center cursor-pointer">
              <i style={{ fontSize: '60px' }} className="bx bx-home text-gray-400"></i> {/* Ícone de Estações */}
              <span className="mt-2 font-bold text-2xl text-gray-500">Estações</span>
            </Link>
            <Link href="/parametros" className="flex flex-col items-center cursor-pointer">
              <i style={{ fontSize: '60px' }} className="bx bxs-thermometer text-gray-400"></i> {/* Ícone de Parâmetros */}
              <span className="mt-2 font-bold text-2xl text-gray-500">Parâmetros</span>
            </Link>
            <Link href="/alertas" className="flex flex-col items-center cursor-pointer">
              <i style={{ fontSize: '60px' }} className="bx bx-alarm-exclamation text-gray-400"></i> {/* Ícone de Alertas */}
              <span className="mt-2 font-bold text-2xl text-gray-500">Alertas</span>
            </Link>
            <Link href="/usuarios" className="flex flex-col items-center cursor-pointer">
              <i style={{ fontSize: '60px' }} className="bx bx-user text-gray-400"></i> {/* Ícone de Usuários */}
              <span className="mt-2 font-bold text-2xl text-gray-500">Usuários</span>
            </Link>
            <Link href="/educacional" className="flex flex-col items-center cursor-pointer">
              <i style={{ fontSize: '60px' }} className="bx bx-book text-gray-400"></i> {/* Ícone Educacional */}
              <span className="mt-2 font-bold text-2xl text-gray-500">Educacional</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
