"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import React, { useState, useEffect } from "react";

const Usuarios: React.FC = () => {
  
  // const [usuarios, setUsuarios] = useState({});

  // useEffect(() => {
  //   axios.get(`usuarios/${id}`).then(response => { 
  //     setUsuarios(response.data.usuarios);

  //   });
  // }, []);
  const usuarios = [
    { id: 1, usuario: 'fulano', email: 'exemploEmail@gmail.com', dataCriacao: '2024-09-19', dataUpdate: '2024-09-22' },
    { id: 2, usuario: 'ciclano', email: 'exemploEmail2@gmail.com', dataCriacao: '2024-09-19', dataUpdate: '2024-09-21' },
    { id: 3, usuario: 'beltrano', email: 'exemploEmail33@gmail.com', dataCriacao: '2024-09-19', dataUpdate: '2024-09-20' }
  ];

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
          <div className="mt-10 w-3/4 flex flex-col items-center">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className=" text-white" style={{ backgroundColor: '#4e00a9' }}>
                <tr>
                  <th className="p-4 text-center">Nome</th>
                  <th className="p-4 text-center">Email</th>
                  <th className="p-4 text-center">Data de criação</th>
                  <th className="p-4 text-center">Data de atualização</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuarios) => (
                  <tr key={usuarios.id} className="text-center border-b">
                    <td className="p-3">{usuarios.usuario}</td>
                    <td className="p-3">{usuarios.email}</td>
                    <td className="p-3">{usuarios.dataCriacao}</td>
                    <td className="p-3">{usuarios.dataUpdate}</td>
                    <td className="p-3">
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 m-2 "
                        aria-label={`Ver detalhes do ${usuarios.id}`}
                      >
                        Ver Detalhes
                      </button>

                      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800">
                        deletar usuario
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-x-20">          
            <a
                href="/cadastro-usuario"
                className="w-64 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4 inline-block text-center">
                Cadastrar novo Usuario
              </a>
          </div>
          </div>
        </div>

    </div>
  );
};

export default Usuarios;