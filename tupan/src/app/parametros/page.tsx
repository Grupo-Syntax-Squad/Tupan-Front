"use client";

import { PopConfirmacao } from "@/components/pop-confirmacao";
import { MenuLateral } from "@/components/menu-lateral";
import { Tabela } from "@/components/tabela";
import { Botao } from "@/components/botao";
import { usePopConfirmacao } from "@/hooks/visivel";
import { Formulario } from "@/components/formulario-parametros";

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
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();

  const handleAdicionarParametro = () => {
    console.log("Adicionar novo parâmetro");
    showPopConfirmacao("Parâmetro adicionado com sucesso!");
  };

  return (
    <div className="w-screen flex bg-gray-100">
      {/* Menu lateral ocupando a lateral esquerda */}
      <div className="w-1/5">
        <MenuLateral menuData={menuData} />
      </div>

      {/* Conteúdo principal ocupando o resto da tela */}
      <div className="w-screen p-4 flex flex-col gap-4">
        <div className="flex gap-4">
          {/* Tabela ocupando metade da largura */}
          <div className="w-1/2">
            <Tabela colunas={colunas} dados={dados} />
          </div>

          {/* Formulário ocupando metade da largura */}
          <div className="flex-1">
            <Formulario onSubmit={() => console.log("Formulário enviado")} />
            <div className="mt-4 flex gap-3">
              <Botao
                label="Adicionar Parâmetro"
                corTexto="text-white"
                corFundo="bg-blue-500"
                onClick={handleAdicionarParametro}
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botão de adicionar abaixo do formulário */}

      {isVisible && (
        <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
      )}
    </div>
  );
}
