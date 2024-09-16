"use client"
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
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();

  const { formValues } = useFormularioParametros(); 

  const handleAdicionarParametro = () => {
    console.log("Adicionar novo parâmetro");
    showPopConfirmacao("Parâmetro adicionado com sucesso!");
  };

  return (
    <div className="w-screen flex bg-gray-100">
      <MenuLateral menuData={menuData} />
      <div>
        {formValues.nome ? (
          <p>
            Nome do Parâmetro: {formValues.nome}
          </p>
        ) : (
          <p>Carregando o parâmetro...</p>
        )}
        {/* Passa os dados capturados pelo hook para o formulário */}
        <Formulario onSubmit={() => console.log("Formulário enviado")} dados={formValues} />
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
      {isVisible && (
        <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
      )}
    </div>
  );
}
