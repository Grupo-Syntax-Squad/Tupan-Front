"use client";
import { MenuLateral } from "@/components/menu-lateral";
import { Tabela } from "@/components/tabela";
import { Botao } from "@/components/botao";
import { Formulario } from "@/components/formulario-parametros";
import { NavTop } from "@/components/nav-top";

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
  { nome: "Temperatura", date: "12 / 11 / 2024", status: "Ativado" },
  { nome: "Umidade", date: "10 / 01 / 2000", status: "Desativado" },
  { nome: "Pressão", date: "13 / 05 / 2015", status: "Ativado" },
];

export default function Parametros() {
  return (
    <div className="w-screen flex bg-gray-100">
      {/* Menu lateral ocupando a lateral esquerda */}
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      {/* Conteúdo principal ocupando o resto da tela */}

      <div className="w-full flex pr-4 flex-col gap-4">

          {/* Barra superior ocupando a parte superior da tela */}
        <NavTop nome="Usuário" path="Parâmetros" />

        <div className="flex gap-4">
          
          {/* Tabela ocupando metade da largura */}
          <div className="w-1/2">
            <Tabela colunas={colunas} dados={dados} />
          </div>

          {/* Formulário ocupando metade da largura */}
          <div className="flex-1">
            <Formulario onSubmit={() => console.log("Formulário enviado")} />
          </div>
        </div>
      </div>
    </div>
  );
}
