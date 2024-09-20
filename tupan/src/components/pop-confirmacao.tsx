import { PopConfirmacaoProps } from "@/types/interfaces";

export const PopConfirmacao = ({ mensagem, onClose }: PopConfirmacaoProps) => {
  return (
    <div className="fixed bottom-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow-lg flex items-center">
      <span className="mr-2">{mensagem}</span>
      <button
        onClick={onClose}
        className="ml-auto bg-transparent border-0 text-white font-bold"
      >
        &times;
      </button>
    </div>
  );
};
