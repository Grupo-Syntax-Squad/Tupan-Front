'use client';

import { useEffect, useState } from 'react';
import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela-estacoes';
import { Formulario } from '@/components/formulario-estacoes';
import Link from 'next/link';
import { Botao } from '@/components/botao/botao';
import { useGetEstacoes } from '@/hooks/estacoes/receberEstacao';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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
];

export default function Estacoes() {
  const { estacoes, loading, error, refetch } = useGetEstacoes();
  
  // Estado para gerenciar o modal e a estação selecionada
  const [showModal, setShowModal] = useState(false);
  const [selectedEstacao, setSelectedEstacao] = useState(null);
  const [contagemAtivas, setContagemAtivas] = useState(0);
  const [contagemInativas, setContagemInativas] = useState(0);

  useEffect(() => {
    if (estacoes.length) {
      const ativas = estacoes.filter((estacao) => estacao.ativo).length;
      const inativas = estacoes.length - ativas;

      setContagemAtivas(ativas);
      setContagemInativas(inativas);
    }
  }, [estacoes]);

  const openModal = (estacao) => {
    setSelectedEstacao(estacao);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEstacao(null);
    setShowModal(false);
  };

  const toggleAtivo = (id, currentStatus) => {
    // Lógica para ativar/desativar a estação
    console.log(`Toggling status of station with ID ${id} to ${!currentStatus}`);
  };

  const dados = estacoes.map((estacao) => ({
    nome: estacao.nome,
    date: new Date(estacao.criado).toLocaleDateString(),
    status: 'Ativado',
  }));

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path="Estações" />

        <div className="flex gap-4">

          {estacoes.length === 0 && !loading && !error ? (
            <>
              <div className="flex justify-center p-5">
                <p className="text-xl">Nenhuma estação cadastrada</p>
              </div>
              <div className="flex-col">
                <Link href="/cadastro-estacoes" className="flex-col">
                  <Botao
                    type="button"
                    corTexto="text-black"
                    corFundo="bg-gray-300"
                    label="Cadastrar Estação"
                  />
                </Link>
              </div>
            </>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-3 px-4 border-b text-left">Id</th>
                  <th className="py-3 px-4 border-b text-left">Nome</th>
                  <th className="py-3 px-4 border-b text-left">Tópico</th>
                  <th className="py-3 px-4 border-b text-left">
                    Data de criação
                  </th>
                  <th className="py-3 px-4 border-b text-left">
                    Data de atualização
                  </th>
                  <th className="py-3 px-4 border-b text-left">Ativo</th>
                  <th className="py-3 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                {estacoes
                  .sort((a, b) => a.id - b.id)
                  .map((estacao) => (
                    <tr
                      key={estacao.id}
                      className="hover:bg-gray-100"
                      onClick={() => openModal(estacao)}
                    >
                      <td className="py-3 px-4 border-b font-bold">
                        {estacao.id}
                      </td>
                      <td className="py-3 px-4 border-b">{estacao.nome}</td>
                      <td className="py-3 px-4 border-b">{estacao.topico}</td>
                      <td className="py-3 px-4 border-b">
                        {new Date(estacao.criado).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {new Date(estacao.modificado).toLocaleDateString(
                          'pt-BR'
                        )}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {estacao.ativo ? 'Sim' : 'Não'}
                      </td>
                      <td>
                        {estacao.ativo ? (
                          <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAtivo(estacao.id, true);
                            }}
                          >
                            Desativar
                          </button>
                        ) : (
                          <button
                            className="bg-green-500 text-white px-3 py-1 rounded"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAtivo(estacao.id, false);
                            }}
                          >
                            Ativar
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* Modal */}
          {showModal && (
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
          )}
        </section>
      </div>
    </div>
  );
}
