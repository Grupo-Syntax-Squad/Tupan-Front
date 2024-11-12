import { PopConfirmacaoProps } from "@/types/interfaces";

export const AlertaPerigo = ({ mensagem, onClose }: PopConfirmacaoProps) => {
    return (
        <div className="fixed top-0 left-0 right-0 m-6 p-6 bg-red-500 text-white rounded-lg shadow-lg flex items-center">
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
