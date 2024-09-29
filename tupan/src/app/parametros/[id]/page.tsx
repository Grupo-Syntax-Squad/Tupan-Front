"use client";

import { useEffect, useState } from "react";
import { MenuLateral } from "@/components/menu-lateral";
import { FormularioAtualizacaoParametros } from "@/components/formulario-atualizacao-parametros";
import { Botao } from "@/components/botao";
import { PopConfirmacao } from "@/components/pop-confirmacao";
import { usePopConfirmacao } from "@/hooks/visivel";
import { useFormularioParametros } from "@/hooks/formulario";
import { NavTop } from "@/components/nav-top";
import { useDynamicContext } from "@/app/context";
import { useToggle } from "@/hooks/check";
import axios from "axios"; // Adicionando axios para requisição

const menuData = [
  { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
  { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
  { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
  { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
  { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
  { nome: "Logout", path: "/", icone: "bx bx-log-out" },
];

export default function ParametrosID() {
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();
  const { formValues, handleChange, setFormValues } = useFormularioParametros();
  const { state } = useDynamicContext();

  const [nomeFormulario, setNomeFormulario] = useState<string | undefined>(
    undefined
  );
  const [initialStatus, setInitialStatus] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null); // Token state

  // Pegando o token no useEffect e guardando no estado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token não encontrado");
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const nome = searchParams.get("nome") || state.nome;
    const id = searchParams.get("id");
    const status = searchParams.get("status");

    setNomeFormulario(nome || "Formulário de Parâmetros");
    setInitialStatus(status === "Ativado");

    if (id && token) {
      // Faz a requisição para pegar os dados
      axios
        .get(`http://localhost:8000/parametros/${id}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((response) => {
          const { nome, status } = response.data;
          setFormValues({
            nome: nome || "",
            id: id || "",
            status: status || "",
          });
        })
        .catch((err) => console.error("Erro ao buscar parâmetros", err));
    }
  }, [setFormValues, state, token]);

  const { isChecked, handleChange: handleToggleChange } =
    useToggle(initialStatus);

  const handleAdicionarParametro = () => {
    console.log("Adicionar novo parâmetro");
    showPopConfirmacao(`Parâmetro: "${nomeFormulario}" atualizado com sucesso!`);
  };

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop nome="Usuário" path={nomeFormulario} />

        <div className="flex gap-4">
          <div className="flex flex-col gap-4 bg-white p-4 rounded-lg flex-1">
            <FormularioAtualizacaoParametros
              onSubmit={() => console.log("Formulário enviado")}
              dados={formValues}
              initialStatus={initialStatus}
            />
            <div className="mt-4 flex justify-center">
              <Botao
                label="Atualizar Parâmetro"
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
    </div>
  );
}
