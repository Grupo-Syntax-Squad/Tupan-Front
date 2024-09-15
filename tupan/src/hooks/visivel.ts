import { useState, useCallback, useEffect } from 'react';

export const usePopConfirmacao = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showPopConfirmacao = useCallback((msg: string) => {
    setMensagem(msg);
    setIsVisible(true);

    // Limpar qualquer timeout existente antes de configurar um novo
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Configurar o timeout para ocultar o pop-up após 5 segundos (5000 ms)
    const id = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    setTimeoutId(id);
  }, [timeoutId]);

  const hidePopConfirmacao = useCallback(() => {
    setIsVisible(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }, [timeoutId]);

  // Limpar timeout se o componente for desmontado
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return {
    isVisible,
    mensagem,
    showPopConfirmacao,
    hidePopConfirmacao,
  };
};
