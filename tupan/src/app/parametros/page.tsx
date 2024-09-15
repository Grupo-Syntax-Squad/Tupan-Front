"use client";

import { MenuLateral } from "@/components/menu-lateral";
import { Tabela } from "@/components/tabela";
import { Botao } from "@/components/botao";

const menuData = [
  { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
  { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
  { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
  { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
  { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
  { nome: "Logout", path: "/", icone: "bx bx-log-out" },
];

const colunas = [
  { label: "Parâmetro", acessor: "nome" },
  { label: "Data de Criação", acessor: "date" },
  { label: "Status", acessor: "status" },
];

const dados = [
  { nome: "Temperatura", date: '12 / 11 / 2024', status: "Ativado" },
  { nome: "Umidade", date: '10 / 01 / 2000', status: "Desativado" },
  { nome: "Pressão", date: '13 / 05 / 2015', status: "Ativado" },
];

export default function Parametros() {
  const handleAdicionarParametro = () => {
    console.log("Adicionar novo parâmetro");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Menu lateral ocupando a lateral esquerda */}
      <div className="w-1/4">
        <MenuLateral menuData={menuData} />
      </div>

      {/* Conteúdo principal (Tabela e Botão) ocupando o resto da tela */}
      <div className="w-3/4 p-4">
        <Tabela colunas={colunas} dados={dados} />

        {/* Alinha o botão à esquerda, abaixo da tabela */}
        <div className="mt-4 flex gap-3">
          <Botao
            label="Adicionar Parâmetro"
            corTexto="text-white"
            corFundo="bg-blue-500"
            onClick={handleAdicionarParametro}
          />
        </div>
      </div>
    </div>
  );
}
