"use client";

import { useEffect, useState } from "react";
import { MenuLateral } from "@/components/menu-lateral";
import { Formulario } from "@/components/formulario-parametros";
import { Botao } from "@/components/botao";
import { PopConfirmacao } from "@/components/pop-confirmacao";
import { usePopConfirmacao } from "@/hooks/visivel";
import { useFormularioParametros } from "@/hooks/formulario";

const menuData = [
  { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
  { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
  { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
  { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
  { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
  { nome: "Logout", path: "/", icone: "bx bx-log-out" },
];

export default function ParametrosID() {
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } = usePopConfirmacao();
  const { formValues, handleChange, setFormValues } = useFormularioParametros();

  const [nomeFormulario, setNomeFormulario] = useState<string | undefined>(undefined);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nome = searchParams.get("nome");
    const id = searchParams.get("id");

    setNomeFormulario(nome || "Formulário de Parâmetros");

    if (id) {
      setFormValues({
        nome: nome || "",
        id: id || "",
      });
    }
  }, [setFormValues]);

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

      {/* Conteúdo principal ocupando o restante da tela */}
      <div className="w-full p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">{nomeFormulario}</h1>

        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg flex-1">
          <Formulario
            onSubmit={() => console.log("Formulário enviado")}
            dados={formValues}
          />
          <div className="mt-4 flex justify-center">
            <Botao
              label="Adicionar Parâmetro"
              corTexto="text-white"
              corFundo="bg-blue-500"
              type="button"
              onClick={handleAdicionarParametro}
            />
          </div>
        </div>

        {isVisible && (
          <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
        )}
      </div>
    </div>
  );
}
