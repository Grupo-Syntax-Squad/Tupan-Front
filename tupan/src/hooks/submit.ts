import { useCallback } from "react";

interface FormValues {
  nome: string;
  fator: number;
  escala: string;
  json: string;
}

export const useFormSubmit = (formValues: FormValues, onSubmit: (parametro: any) => void) => {
  const handleFormSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      const parametro = {
        nome: formValues.nome,
        fator: formValues.fator || 0,
        offset: 0,
        unidade: formValues.escala,
        nome_json: formValues.json,
      };

      onSubmit(parametro);
    },
    [formValues, onSubmit]
  );

  return { handleFormSubmit };
};

// não estou usando por enquanto