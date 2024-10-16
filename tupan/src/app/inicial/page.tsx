'use client';

import { MenuLateral } from '@/components/menu-lateral';
import { NavTop } from '@/components/nav-top';
import GraficoPrincipal from '@/components/graficos/barra';
import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import('../../components/mapa/index'), {
  ssr: false,
});

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/logout', icone: 'bx bx-log-out' },
];

export default function Inicial () {
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

        <section className="flex p-4 m-4 rounded">

          <Mapa lat={51.505} lng={-0.09} zoom={13} />

        </section>
        <section className="flex p-3 m-4 rounded">

        <GraficoPrincipal
            titulo="Exemplo gráfico temperatura"
            legenda="Fatec Prof. Jessen Vidal"
          />

        </section>
      </div>
    </div>
  );
}
