'use client';

import { useEffect, useState } from 'react';
import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela-estacoes';
import { Formulario } from '@/components/formulario-estacoes';
import Link from 'next/link';
import { Botao } from '@/components/botao';
import { useGetEstacoes } from '@/hooks/receberEstacao';
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

import dynamic from 'next/dynamic';

export default function Estacoes() {
  const { estacoes, loading, error } = useGetEstacoes();
  
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


  const dataPie = {
    labels: ['Ativas', 'Inativas'],
    datasets: [
      {
        data: [contagemAtivas, contagemInativas],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderColor: ['#4CAF50', '#F44336'],
        borderWidth: 1,
      },
    ],

  const Mapa = dynamic(() => import('../../components/mapa/index'), {
    ssr: false,
  });

  const updateEstacao = async () => {
    if (!selectedEstacao) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/estacoes/${selectedEstacao.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token 1112a98d58500b7a165191fc56b2a9c1513413e8`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEstacao),
      });

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

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path="Estações" />

        <div className="flex gap-4">

          <div className="flex flex-col gap-10 mt-6">
            {/* Tabela de estações */}
            <div className="w-full">
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
        <section className="mx-auto w-full p-10 bg-white shadow-lg rounded-lg">

          <h1 className="flex justify-start text-2xl">
            <span>Estações</span>
          </h1>

          <Mapa lat={51.505} lng={-0.09} zoom={13} />


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
                            {new Date(estacao.modificado).toLocaleDateString('pt-BR')}
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
            </div>

            <div className="flex justify-center">
              <Link href="/cadastro-estacoes">
                <Botao
                  type="button"
                  corTexto="text-white"
                  corFundo="bg-green-500"
                  label="Cadastrar Estação"
                />
              </Link>
            </div>



            {/* Gráfico de Pizza */}
            <div className="w-1/4 mx-auto">
              <h2 className="text-center text-xl mb-4">Distribuição das Estações</h2>
              <Pie data={dataPie} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
