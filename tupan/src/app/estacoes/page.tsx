'use client';

import { useEffect, useState } from 'react';
import { MenuLateral } from '@/components/menu-lateral';
import { NavTop } from '@/components/nav-top';
import Link from 'next/link';
import { Botao } from '@/components/botao';

export default function Estacoes() {
  const [estacoes, setEstacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEstacao, setSelectedEstacao] = useState(null);

  interface Estacao {
    id: number;
    nome: string;
    temperatura: number;
    umidade: number;
    vento: number;
    chuva: number;
    topico: string;
    criado: string;
    modificado: string;
    ativo: boolean;
  }

  useEffect(() => {
    const fetchEstacoes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/estacoes', {
          method: 'GET',
          headers: {
            Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar estações');
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setEstacoes(data);
        } else {
          console.error('A resposta não é um array:', data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEstacoes();
  }, []);

  const openModal = (estacao: Estacao) => {
    setSelectedEstacao(estacao);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEstacao(null);
  };

  const toggleAtivo = async (id: number, ativo: boolean) => {
    const confirmed = window.confirm(
      `Tem certeza que deseja ${ativo ? 'desativar' : 'ativar'} esta estação?`
    );
    if (!confirmed) return;

    try {
      const estacaoAtual = estacoes.find((estacao) => estacao.id === id);

      const body = JSON.stringify({
        ativo: !ativo,
        nome: estacaoAtual.nome,
        endereco: estacaoAtual.endereco,
        topico: estacaoAtual.topico,
      });

      const response = await fetch(`http://127.0.0.1:8000/estacoes/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erro ao atualizar a estação: ${errorData.detail || response.statusText}`
        );
      }

      setEstacoes((prevEstacoes) =>
        prevEstacoes.map((estacao) =>
          estacao.id === id ? { ...estacao, ativo: !ativo } : estacao
        )
      );

      alert(`Estação ${ativo ? 'desativada' : 'ativada'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar a estação:', error);
      alert('Falha ao atualizar a estação.');
    }
  };

  const updateEstacao = async () => {
    if (!selectedEstacao) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/estacoes/${selectedEstacao.id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedEstacao),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Erro ao atualizar a estação: ${errorData.detail || response.statusText}`
        );
      }

      setEstacoes((prevEstacoes) =>
        prevEstacoes.map((estacao) =>
          estacao.id === selectedEstacao.id ? selectedEstacao : estacao
        )
      );

      alert('Estação atualizada com sucesso!');
      closeModal();
    } catch (error) {
      console.error('Erro ao atualizar a estação:', error);
      alert('Falha ao atualizar a estação.');
    }
  };

  const menuData = [
    { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
    { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
    { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
    { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
    { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
    { nome: 'Logout', path: '/', icone: 'bx bx-log-out' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex">
      {/* Menu lateral */}
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        {/* NavTop */}
        <NavTop nome="Usuário" path="Estações" />

        <section className="mx-auto w-full p-10 bg-white shadow-lg rounded-lg">
          <h1 className="flex justify-center text-2xl">
            <span>Estações</span>
          </h1>

          {estacoes.length === 0 ? (
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
