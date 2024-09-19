import { BotaoProps } from "@/types/interfaces";

export const Botao = ({ label, corTexto, corFundo, onClick, icone, type}: BotaoProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${corFundo} ${corTexto} font-bold py-2 px-4 rounded flex items-center justify-center`}
    >
      {icone && <i className={`${icone} me-2`}></i>}
      {label}
    </button>
  );
};
