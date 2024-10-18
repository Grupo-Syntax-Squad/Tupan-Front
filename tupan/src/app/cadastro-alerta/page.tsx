"use client";

import React, { useState, useEffect } from "react";
import { MenuLateral } from "@/components/menu/lateral";
import { NavTop } from "@/components/nav-top";
import axios from "axios";

interface Estacao {
  id: number;
  nome: string;
}

interface Parametro {
  id: number;
  nome: string;
}

const CadastroAlerta: React.FC = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [parametros, setParametros] = useState<Parametro[]>([]);
  const [nomeAlerta, setNomeAlerta] = useState<string>("");
  const [condicao, setCondicao] = useState<string>("");
  const [valor, setValor] = useState<string>("");
  const [estacaoId, setEstacaoId] = useState<string>("");
  const [parametroId, setParametroId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Função para buscar estações e parâmetros da API
  useEffect(() => {
    const fetchDados = async (token: string) => {
      try {
        const estacoesResponse = await axios.get("http://localhost:8000/estacoes", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEstacoes(estacoesResponse.data);

        const parametrosResponse = await axios.get("http://localhost:8000/parametros", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setParametros(parametrosResponse.data);
      } catch (error) {
        console.error("Erro ao buscar estações ou parâmetros:", error);
        setError("Erro ao carregar estações ou parâmetros.");
      }
    };

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      fetchDados(storedToken);
    } else {
      setError("Token não encontrado, por favor faça login.");
    }
  }, []);

  // Função para enviar o alerta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setError("Token não encontrado, por favor faça login.");
      return;
    }

    const novoAlerta = {
      nome: nomeAlerta,
      condicao,
      valor: parseFloat(valor),
      estacao: estacaoId,
      parametro: parametroId,
    };

    try {
      await axios.post("http://localhost:8000/alertas", novoAlerta, {
        headers: {
          Authorization: `Token ${storedToken}`,
        },
      });
      setSuccess("Alerta cadastrado com sucesso!");
      setNomeAlerta("");
      setCondicao("");
      setValor("");
      setEstacaoId("");
      setParametroId("");
    } catch (error) {
      console.error("Erro ao cadastrar o alerta:", error);
      setError("Erro ao cadastrar o alerta.");
    }
  };

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/logout", icone: "bx bx-log-out" },
  ];

  return (
    <div className="flex">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <NavTop nome="Usuário" path="Novo Alerta" />

        <div className="flex items-center justify-center flex-grow">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">Novo alerta</h1>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Estação</label>
                <select
                  value={estacaoId}
                  onChange={(e) => setEstacaoId(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Selecione uma estação</option>
                  {estacoes.map((estacao) => (
                    <option key={estacao.id} value={estacao.id}>
                      {estacao.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Parâmetro</label>
                <select
                  value={parametroId}
                  onChange={(e) => setParametroId(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Selecione um parâmetro</option>
                  {parametros.map((parametro) => (
                    <option key={parametro.id} value={parametro.id}>
                      {parametro.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Nome do alerta</label>
                <input
                  type="text"
                  value={nomeAlerta}
                  onChange={(e) => setNomeAlerta(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Digite o nome do alerta"
                />
              </div>

              <div className="flex mb-4">
                <div className="w-1/2 pr-2">
                  <label className="block text-gray-700">Condição</label>
                  <select
                    value={condicao}
                    onChange={(e) => setCondicao(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value=">">Maior que</option>
                    <option value="<">Menor que</option>
                  </select>
                </div>

                <div className="w-1/2 pl-2">
                  <label className="block text-gray-700">Valor</label>
                  <input
                    type="text"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Digite o valor"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button type="button" className="px-4 py-2 border rounded text-gray-700">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroAlerta;
