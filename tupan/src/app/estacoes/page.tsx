'use client';

import { useEffect, useState } from 'react';
import { MenuLateral } from '@/components/menu/lateral';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela-estacoes';
import { Formulario } from '@/components/formulario-estacoes';
import Link from 'next/link';
import { Botao } from '@/components/botao/botao';
import { useGetEstacoes } from '@/hooks/receberEstacao';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

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
  { label: 'Topico', acessor: 'topico' },
];

export default function Estacoes() {
  const { estacoes, loading, error } = useGetEstacoes();
  
  const [contagemAtivas, setContagemAtivas] = useState(0);
  const [contagemInativas, setContagemInativas] = useState(0);

  const dados = estacoes.map((estacao) => ({
    nome: estacao.nome,
    topico: estacao.topico,
    date: new Date(estacao.criado).toLocaleDateString(),
    status: 'Ativado', 
  }));

  useEffect(() => {
    if (estacoes.length) {
      const ativas = estacoes.filter((estacao) => estacao.ativo).length;
      const inativas = estacoes.length - ativas;

      setContagemAtivas(ativas);
      setContagemInativas(inativas);
    }
  }, [estacoes]);

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
  };

  const handleSubmit = () => {
    // Lógica para refetch dos dados após o cadastro
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

        <div className="flex flex-col gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          
          {estacoes.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Nenhuma estação cadastrada</p>
              <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
            </div>
          ) : (
            <>
              <div className="flex ">
              <div className="flex flex-col gap-4 w-1/2">
                {/* Tabela de estações */}
                <div className="w-full">
                  <Tabela colunas={colunas} dados={dados} />
                </div>

                {/* Gráfico de Pizza */}
                <div className="w-1/3 mx-auto">
                  <h2 className="text-center text-xl mb-4">Distribuição das Estações</h2>
                  <Pie data={dataPie} />
                </div>
              </div>
              <div className="w-full">
                  <h2 className="text-center text-xl mb-4">Cadastrar Nova Estação</h2>
                  <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
