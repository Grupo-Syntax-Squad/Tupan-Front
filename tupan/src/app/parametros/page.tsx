'use client';

import { useState } from 'react';

//components
import { MenuLateral } from '@/components/menu/lateral';
import { Tabela } from '@/components/tabela/tabela-parametros';
import { Formulario } from '@/components/formularios/parametros/formulario-parametros';
import { NavTop } from '@/components/nav-top';

//hooks
import { useControleAcesso } from '@/hooks/secao/controleAcesso';
import { useGetParametros } from '@/hooks/parametros/receberParametro';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/logout', icone: 'bx bx-log-out' },
];

const colunas = [
  { label: 'Parâmetro', acessor: 'nome' },
  { label: 'Data de Criação', acessor: 'date' },
  { label: 'Status', acessor: 'status' },
];

export default function Parametros() {
  const controleAcesso = useControleAcesso();
  const { parametros, loading, error, refetch } = useGetParametros();
  const dados = parametros.map((parametro) => ({
    nome: parametro.nome,
    date: new Date(parametro.criado).toLocaleDateString(),
    status: 'Ativado',
  }));

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    refetch();
  };  

  if (controleAcesso === true) {
    window.location.href = '/';
    return null;
  }

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop nome="" path="Parâmetros" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {parametros.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem parâmetros cadastrados!</p>
              <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
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
            <h2 className="text-lg font-bold mb-4">Parâmetros</h2>
            <p>
            Esta é a página de <span className="font-bold text-blue-600">Parâmetros</span>. Aqui você cadastra e visualiza os parâmetros de medição, que podem ter diferentes medidas como temperatura, pressão e umidade. É possível selecionar também a <span className="font-bold text-blue-600">Escala de medição</span>, que pode ser Celsius, Fahrenheit, Kelvin, entre outras.
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
