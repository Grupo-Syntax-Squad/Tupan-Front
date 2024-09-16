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
    const nome = searchParams.get('nome');
    const id = searchParams.get('id');

   
    setNomeFormulario(nome || "Formulário de Parâmetros");

    
    if (id) {
      
      setFormValues({
        nome: nome || "",
        id: id || ""
      });
    }
  }, [setFormValues]);

  const handleAdicionarParametro = () => {
    console.log("Adicionar novo parâmetro");
    showPopConfirmacao("Parâmetro adicionado com sucesso!");
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100">
      <div className="w-1/5">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-4/5 p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">{nomeFormulario}</h1>

        <div className="flex gap-4 w-screen bg-black mr-6">
          <div className="flex-1 w-full">
            <Formulario
              onSubmit={() => console.log("Formulário enviado")}
              dados={formValues}
            />
            <div className="mt-4 flex gap-3">
              <Botao
                label="Adicionar Parâmetro"
                corTexto="text-white"
                corFundo="bg-blue-500"
                type="submit"
                onClick={handleAdicionarParametro}
              />
            </div>
          </div>
        </div>

        {isVisible && (
          <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
        )}
      </div>
    </div>
  );
}
