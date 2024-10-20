'use client';

import { useEffect, useState } from 'react';
import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela-estacoes';
import { Formulario } from '@/components/formulario-estacoes';
import Link from 'next/link';
import { Botao } from '@/components/botao/botao';
import { useGetEstacoes } from '@/hooks/receberEstacao';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/', icone: 'bx bx-log-out' },
];

const colunas = [
  { label: 'estacao', acessor: 'nome' },
  { label: 'Data de Criação', acessor: 'date' },
  { label: 'Status', acessor: 'status' },
  { label: 'Topico', acessor: 'topico' },
];


export default function Estacoes() {
  const [showModal, setShowModal] = useState(false);
  const { estacoes, loading, error, refetch } = useGetEstacoes();


  const dados = estacoes.map((estacao) => ({
    nome: estacao.nome,
    topico: estacao.topico,
    date: new Date(estacao.criado).toLocaleDateString(),
    status: 'Ativado', 
    endereco_id: estacao.endereco_id
  }));

  const handleSubmit = () => {
    refetch();
  };

  return (
    <div className="flex">
      {/* Menu lateral */}
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        {/* NavTop */}
        <NavTop nome="Usuário" path="Estações" />

        <div className="flex gap-4">

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {estacoes.length === 0 && !loading && !error ? (
            <>
              <div className="w-full">
                <p className="text-center">Nenhuma estação cadastrada</p>
                <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
              </div>
              
            </>
          ) : (
            <>
            <div className="w-1/2">
                <Tabela colunas={colunas} dados={dados} />
            </div>

            <div className="flex-1">
                <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
              </div>
            
      
            </>)}

          {/* Modal */}
          {/* {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                <h2 className="text-xl mb-4">Editar Estação</h2>
                <div>
                  <label className="block mb-2">Nome</label>
                  <input
                    type="text"
                    value={selectedEstacao?.nome}
                    onChange={(e) =>
                      setSelectedEstacao({
                        ...selectedEstacao,
                        nome: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-4"
                  />
                </div>
                <div>
                  <label className="block mb-2">Tópico</label>
                  <input
                    type="text"
                    value={selectedEstacao?.topico}
                    onChange={(e) =>
                      setSelectedEstacao({
                        ...selectedEstacao,
                        topico: e.target.value,
                      })
                    }
                    className="border p-2 w-full mb-4"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={updateEstacao}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
