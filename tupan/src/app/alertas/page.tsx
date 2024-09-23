"use client";

import { MenuLateral } from "@/components/menu-lateral";
import React from 'react';

const Alertas: React.FC = () => {
  const alertas = [
    { id: 1, titulo: 'Alerta de Chuva Forte', descricao: 'Chuva intensa esperada para hoje à tarde', tipo: 'Climático', data: '2024-09-22' },
    { id: 2, titulo: 'Alerta de Ventos Fortes', descricao: 'Rajadas de vento de até 80km/h', tipo: 'Climático', data: '2024-09-21' },
    { id: 3, titulo: 'Alerta de Alagamento', descricao: 'Possibilidade de alagamento em áreas baixas', tipo: 'Emergência', data: '2024-09-20' },
    { id: 4, titulo: 'Alerta de Tempestade', descricao: 'Tempestade com raios e trovões previstos', tipo: 'Climático', data: '2024-09-19' },
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

      <div className="flex flex-col items-center min-h-screen w-full bg-gray-100">
        <h1 className="text-2xl font-bold mt-10 text-center">Alertas</h1>

        <div className="mt-10 w-3/4">
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className=" text-white" style={{ backgroundColor: '#4e00a9' }}>
              <tr>
                <th className="p-4 text-center">Título</th>
                <th className="p-4 text-center">Descrição</th>
                <th className="p-4 text-center">Tipo</th>
                <th className="p-4 text-center">Data</th>
                <th className="p-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alertas.map((alerta) => (
                <tr key={alerta.id} className="text-center border-b">
                  <td className="p-3">{alerta.titulo}</td>
                  <td className="p-3">{alerta.descricao}</td>
                  <td className="p-3">{alerta.tipo}</td>
                  <td className="p-3">{alerta.data}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
                      aria-label={`Ver detalhes do ${alerta.titulo}`}
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alertas;