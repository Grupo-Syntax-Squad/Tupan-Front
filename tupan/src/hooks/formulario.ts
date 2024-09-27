import { useState, useEffect } from "react";

export const useFormularioParametros = (dados?: Record<string, unknown>) => {
  const [formValues, setFormValues] = useState({
    nome: "",
    minimo: "",
    maximo: "",
    medida: "",
    escala: "",
    fator: "",
    nomejson: "",
    itemWeight: "",
    description: "",
    offsetminimo: "",
    offsetmaximo: "",
    tolerancia: "",
    status: "",
  });

  useEffect(() => {
    if (dados) {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...dados, 
      }));
    }
  }, [dados]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return {
    formValues,
    handleChange,
    setFormValues, 
  };
};
