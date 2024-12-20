"use client";

import { useEffect, useState } from "react";
import { MenuLateral } from "@/components/menu/lateral";
import { FormularioAtualizacaoEstacoes } from "@/components/formularios/estacoes/formulario-atualizacao-estacoes";
import { PopConfirmacao } from "@/components/alertas/confirmacao";
import { usePopConfirmacao } from "@/hooks/visivel";
import { useFormularioEstacoes } from "@/hooks/formulario";
import { NavTop } from "@/components/nav-top";
import { useDynamicContext } from "@/app/context";
import { useToggle } from "@/hooks/check";

const menuData = [
  { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
  { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
  { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
  { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
  { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
  { nome: "Logout", path: "/login", icone: "bx bx-log-out" },
];

export default function EstacoesID() {
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();
  const { formValues, handleChange, setFormValues } = useFormularioEstacoes();
  const { state } = useDynamicContext();

  const [nomeFormulario, setNomeFormulario] = useState<string | undefined>(
    undefined
  );
  const [initialStatus, setInitialStatus] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nome = searchParams.get("nome") || state.nome;
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    setNomeFormulario(nome || "Formulário de Estações");
    setInitialStatus(status === "Ativado");

    if (id) {
      setFormValues({
        nome: nome || "",
        id: id || "",
        status: status || "",
      });
    }
  }, [setFormValues, state]);

  const { isChecked, handleChange: handleToggleChange } =
    useToggle(initialStatus);

  return (
    <div className="w-screen flex bg-gray-100">
      {/* Menu lateral ocupando a lateral esquerda */}
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      {/* Conteúdo principal ocupando o resto da tela */}
      <div className="w-full flex pr-4 flex-col gap-4">
        {/* Barra superior ocupando a parte superior da tela */}
        <NavTop nome="Usuário" path={nomeFormulario} />

        <div className="flex gap-4">
          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg flex-1">
            <FormularioAtualizacaoEstacoes
              onSubmit={() => console.log("Formulário enviado")}
              dados={formValues}
              showPopConfirmacao={showPopConfirmacao}
              nomeFormulario={nomeFormulario || "Formulário de Estações"}
              initialStatus={initialStatus}
            />
          </div>

          {isVisible && (
            <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
          )}
        </div>
      </div>
    </div>
  );
}