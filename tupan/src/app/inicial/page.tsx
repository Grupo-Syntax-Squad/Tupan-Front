'use client';

import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { LineChart, BarChart, ColumnChart } from '@/components/graficos/export';
import { useSetToken, useToken } from '@/hooks/token';
import { useState } from 'react';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/login', icone: 'bx bx-log-out' },
];

export default function Inicial() {
  console.log('começou');
  useSetToken();

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <div className="w-screen flex bg-gray-100 overflow-x-hidden">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-screen flex flex-col overflow-x-hidden">
        <NavTop nome="Página Inicial" path="" />

        <section className="flex p-3 m-4 rounded">
          <LineChart
            titulo="Gráfico de temperatura"
            id="line"
            legenda="Fatec Prof. Jessen Vidal"
          />
        </section>

        <section className="grid grid-cols-2 p-3 m-4 rounded">
          <BarChart
            titulo="Gráfico de temperatura"
            id="bar"
            legenda="Fatec Prof. Jessen Vidal"
          />

          <ColumnChart
            titulo="Gráfico de temperatura"
            id="col"
            legenda="Fatec Prof. Jessen Vidal"
          />
        </section>
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
            <h2 className="text-lg font-bold mb-4">Página Inicial</h2>
            <p>
              Esta é o <span className="font-bold text-blue-600">Dashboard</span>. Aqui você visualiza gráficos com dados das estações em tempo real! É possível filtrar os dados dos gráficos por estação ou período clicando nos campos abaixo de gráfico. Use os ícones no menu lateral para navegar pelo sistema.
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
  );
}
