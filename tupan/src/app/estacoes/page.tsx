'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { tempICON, UmidadeIcon, VentoICON, chuvaICON } from '../../../public/export';

export default function Estacoes() {
  const [estacoes, setEstacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  interface Estacao {
    id: number;
    nome: string;
    temperatura: number;
    umidade: number;
    vento: number;
    chuva: number;
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
        console.log('Dados recebidos:', data);
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

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="mx-auto w-2/4 p-10 bg-white shadow-lg rounded-lg">
        <h1 className="flex justify-center text-2xl">
              <span>Estações</span>
            </h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-left">Nome</th>
            <th className="py-3 px-4 border-b text-left">Tópico</th>
            <th className="py-3 px-4 border-b text-left">Ativo</th>
          </tr>
        </thead>
        <tbody>
          {estacoes.map((estacao, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-3 px-4 border-b">{estacao.nome}</td>
              <td className="py-3 px-4 border-b">{estacao.topico}</td>
              <td className="py-3 px-4 border-b">{estacao.ativo ? 'Sim' : 'Não'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
