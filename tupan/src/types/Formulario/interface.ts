export interface FormularioProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    dados: {
      nome: string;
      id: string;
      status: string;
      minimo?: string;
      maximo?: string;
      medida?: string;
      escala?: string;
      fator?: string;
      nomejson?: string;
      description?: string;
    };
    initialStatus: boolean;
  }