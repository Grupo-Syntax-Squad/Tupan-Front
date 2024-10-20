"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { NavTop } from "@/components/nav-top";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importar o plugin

// Registrar os componentes necessários
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels // Registrar o plugin
);

interface Alerta {
  id: number;
  nome: string;
  condicao: string;
  ativo: boolean;
  estacao_parametro_id: number;
  criado: string; // Adicionei isso, pois você usou 'criado' na tabela
}

const Alertas: React.FC = () => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [mostrarAtivos, setMostrarAtivos] = useState<boolean>(true); // Estado para controlar a visibilidade

  // Função para buscar os alertas da API
  const fetchAlertas = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8000/alertas", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setAlertas(response.data); // Ajuste conforme o retorno da API
      console.log(response.data);
      setError(null); // Limpa erros
    } catch (error) {
      console.error("Erro ao buscar os alertas:", error);
      setError("Erro ao carregar os alertas.");
    }
  };

  // Verifica se já existe um token no localStorage e faz a requisição
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchAlertas(storedToken);
    } else {
      setError("Token não encontrado, por favor faça login.");
    }
  }, []);

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/logout", icone: "bx bx-log-out" },
  ];

  // Função para preparar os dados do gráfico de pizza
  const prepareDoughnutData = () => {
    const totalAtivos = alertas.filter(alerta => alerta.ativo).length;
    const totalInativos = alertas.length - totalAtivos;

    return {
      labels: ['Ativos', 'Inativos'],
      datasets: [
        {
          label: 'Quantidade de Alertas',
          data: [totalAtivos, totalInativos],
          backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        formatter: (value: number, context: any) => {
          const total = context.chart.data.datasets[0].data.reduce((acc: number, val: number) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
        color: '#000',
      },
    },
  };

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Alertas" path="Alertas" />

        <div className="flex flex-col items-center">
          <div className="mt-10 w-3/4 flex flex-col items-center">
            {error && <p className="text-red-500">{error}</p>}

            <button
              onClick={() => setMostrarAtivos(prev => !prev)} // Alterna o estado
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
            >
              {mostrarAtivos ? 'Mostrar Alertas Inativos' : 'Ocultar Alertas Inativos'}
            </button>

            {alertas.length > 0 ? (
              <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className=" text-white" style={{ backgroundColor: '#4e00a9' }}>
                  <tr>
                    <th className="p-4 text-center">ID</th>
                    <th className="p-4 text-center">Nome</th>
                    <th className="p-4 text-center">Condição</th>
                    <th className="p-4 text-center">Ativo</th>
                    <th className="p-4 text-center">Emissão do alerta</th>
                    <th className="p-4 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alertas
                    .filter(alerta => mostrarAtivos ? alerta.ativo : true) // Filtra os alertas
                    .map((alerta) => (
                      <tr key={alerta.id} className="text-center border-b">
                        <td className="p-3">{alerta.id}</td>
                        <td className="p-3">{alerta.nome}</td>
                        <td className="p-3">{alerta.condicao}</td>
                        <td className="p-3">{alerta.ativo ? "Sim" : "Não"}</td>
                        <td className="p-3">{alerta.criado}</td>
                        <td className="p-3">
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md m-2 hover:bg-blue-800"
                            aria-label={`Ver detalhes do ${alerta.nome}`}
                          >
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p>Nenhum alerta encontrado.</p>
            )}
          </div>
          <div className="flex">
            <div className="mt-10 ">
              {alertas.length > 0 && (
                <Doughnut data={prepareDoughnutData()} options={doughnutOptions} />
              )}
            </div>
          </div>
          <div className="space-x-20">
            <a
              href="/cadastro-alerta"
              className="w-64 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-4 inline-block text-center"
            >
              Cadastrar novo alerta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alertas;
