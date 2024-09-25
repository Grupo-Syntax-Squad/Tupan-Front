"use client";

import React from "react";
import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";

const CadastroAlerta: React.FC = () => {
  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/", icone: "bx bx-log-out" },
  ];

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path="Novo Alerta" />

        <div className="flex items-center justify-center flex-grow">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Novo alerta</h1>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Estação</label>
                <select className="w-full px-3 py-2 border rounded">
                  <option value="">Selecione uma estação</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Parâmetro</label>
                <select className="w-full px-3 py-2 border rounded">
                  <option value="">Selecione um parâmetro</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Nome do alerta</label>
                <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Digite o nome do alerta" />
              </div>

              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700">Condição</label>
                  <select className="w-full px-3 py-2 border rounded">
                    <option value="">Selecione uma opção</option>
                    <option value="maior">Maior que</option>
                    <option value="menor">Menor que</option>
                  </select>
                </div>

                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700">Valor</label>
                  <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Digite o valor" />
                </div>
              </div>

              <div className="flex justify-between">
                <button type="button" className="px-4 py-2 border rounded text-gray-700">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroAlerta;
