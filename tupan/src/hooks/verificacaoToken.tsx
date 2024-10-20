import { useEffect, useState } from "react";

interface TokenVerificacaoProps {
  onTokenValid: (token: string) => void;
  onTokenInvalid: () => void;
}

const TokenVerificacao: React.FC<TokenVerificacaoProps> = ({ onTokenValid, onTokenInvalid }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      onTokenValid(storedToken);
    } else {
      setError("Token não encontrado, por favor faça login.");
      onTokenInvalid();
    }
  }, [onTokenValid, onTokenInvalid]);

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default TokenVerificacao;
