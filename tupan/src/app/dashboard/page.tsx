'use client';

import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { LineChart, BarChart, ColumnChart } from '@/components/graficos/export';
import { useSetToken, useToken } from '@/hooks/token';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/login', icone: 'bx bx-log-out' },
];

export default function Dashboard() {
useSetToken();
  return (
    <div className="w-screen flex bg-gray-100 overflow-x-hidden">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-screen flex flex-col overflow-x-hidden">
        <NavTop nome="" path="Dashboard" />

        <section className="flex p-3 m-4 rounded">
          <LineChart
            titulo="Exemplo gráfico temperatura"
            id="line"
            legenda="Fatec Prof. Jessen Vidal"
          />
        </section>

        <section className="grid grid-cols-2 p-3 m-4 rounded">
          <BarChart
            titulo="Exemplo gráfico temperatura"
            id="bar"
            legenda="Fatec Prof. Jessen Vidal"
          />

          <ColumnChart
            titulo="Exemplo gráfico temperatura"
            id="col"
            legenda="Fatec Prof. Jessen Vidal"
          />
        </section>
      </div>
    </div>
  );
}
