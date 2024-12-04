'use client';

//componentes
import { MenuLateral } from '@/components/menu/lateral';
import { Formulario } from '@/components/formularios/estacoes/formulario-estacoes';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela/tabela-estacoes';
import { Botao } from '@/components/botao/botao';

//hooks
import { useGetEstacoes } from '@/hooks/estacoes/receberEstacao';

//utils
import Link from 'next/link';
import { useState } from 'react';

export default function Estacoes() {
  const { estacoes, loading, error, refetch } = useGetEstacoes();
  const [isModalVisible, setModalVisible] = useState(false);

  const colunas = [
    { acessor: 'nome', label: 'Nome' },
    { acessor: 'status', label: 'Status' },
    { acessor: 'endereco', label: 'Endereço' },
  ];

  const dados = estacoes.map((estacao) => ({
    nome: estacao.nome,
    status: estacao.ativo ? 'Ativo' : 'Inativo',
    endereco: estacao.endereco
      ? `${estacao.endereco.logradouro}, ${estacao.endereco.numero}, ${estacao.endereco.bairro}, ${estacao.endereco.cidade} - ${estacao.endereco.estado}`
      : 'Endereço não disponível',
  }));

  const handleSubmit = () => {
    refetch();
  };

  const menuData = [
    { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
    { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
    { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
    { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
    { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
    { nome: 'Logout', path: '/login', icone: 'bx bx-log-out' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop path="Estações" nome="" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {estacoes.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem estações cadastradas!</p>
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
                <Formulario
                  onSubmit={handleSubmit}
                  dados={{}}
                  initialStatus={true}
                />
              </div>
            </>
          )}
        </div>
        {/* Botão com interrogação */}
        <div className="flex justify-end pr-4">
          {/* Botão flutuante no canto da tela */}
          <button
            onClick={() => setModalVisible(true)}
            className="fixed bottom-4 right-4 text-white bg-blue-500 hover:bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg"
          >
            ?
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg text-center max-w-md">
            <h2 className="text-lg font-bold mb-4">Estações</h2>
            <p>
              Aqui você pode cadastrar uma nova estação e visualizar as estações já existentes. Ao cadastrar, preencha os dados da estação e sua localização, não se esqueça dos campos obrigatórios. Para editá-las, basta clicar no botão Editar na tabela à esquerda.
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
