import { useState, useEffect } from 'react';

export const useFormularioParametros = (dados?: Record<string, unknown>) => {
  const [formValues, setFormValues] = useState({
    nome: '',
    medida: '',
    escala: '',
    fator: 0 || '',
    nomejson: '',
    offset: 0 || '',
    status: '',
    descricao: '',
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
    nome: '',
    topico: '',
    ativo: true,
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    complemento: 'sem complemento',
    latitude: '',
    longitude: '',
    parametros: [],
  });

  useEffect(() => {
    if (dados) {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...dados,
      }));
    }
  }, [dados]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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


export const useFormularioAlertas = (dados?: Record<string, unknown>) => {
  const [formValues, setFormValues] = useState({
    nome: '',
    condicao: '',
    estacao: '',
    parametro: '',
    valor: ''
  });

  useEffect(() => {
    if (dados) {
      setFormValues((prevValues) => ({
        ...prevValues,
        ...dados,
      }));
    }
  }, [dados]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
