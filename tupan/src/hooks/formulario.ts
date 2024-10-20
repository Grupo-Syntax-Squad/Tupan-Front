import { useState, useEffect } from "react";

export const useFormularioParametros = (dados?: Record<string, unknown>) => {
  const [formValues, setFormValues] = useState({
    nome: "",
    medida: "",
    escala: "",
    fator: 0 || "",
    nomejson: "",
    offset: 0 || "",
    status: "",
    descricao: "",
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

export const useFormularioEstacoes = (dados?: Record<string, unknown>) => {
  const [formValues, setFormValues] = useState({
    nome: "",
    topico: "",
    ativo: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    complemento: "",
    cep: "",
    latitude: "",
    longitude: ""
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

