"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import {deletarUsuario} from '@/app/_api/delete/usuarios'; 
import { Botao } from "@/components/botao";
import Link from "next/link";
import React from "react";

const VisualizarUsuarios: React.FC = () => {
  

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
        <NavTop nome="Usuário" path="Usuário" />

        <div className="flex flex-col items-center">
        <section className="flex justify-center items-center h-screen w-screen bg-white" style={{width:"100%"}}>
        <div className="flex gap-10">
        <div className="max-w-md flex flex-col ">
          
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha              
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="data-atualizacao" className="block text-sm font-medium text-gray-700">
                Data da ultima atualização              
              </label>
              <input
                id="data-atualizacao"
                name="data-atualizacao"
                type="date"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            

            <div>
              <label htmlFor="ID" className="block text-sm font-medium text-gray-700">
                ID              
              </label>
              <input
                id="ID"
                name="ID"
                type="int"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="data-criacao" className="block text-sm font-medium text-gray-700">
                Data criacao              
              </label>
              <input
                id="data-criacao"
                name="data-criacao"
                type="date"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white m-2 py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Atualizar
            </button>

            {/* <button
              type="submit"
              className="bg-red-600 text-white m-2 py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Deletar usuario
            </button> */}
            <Botao
              type="button"
              corTexto="text-white"
              corFundo="bg-red-600"
              label="Deletar Usuario"
              onClick={() => deletarUsuario(usuario.id)}
            />
        </div>
        <div>

      </div>
      </div>
    </section>
          
        </div>
        </div>

    </div>
  );
};

export default VisualizarUsuarios;