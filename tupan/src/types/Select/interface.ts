export interface Option {
    label: string;
    value: string;
  }
  
  export interface SelectProps {
    id: string;
    label: string;
    span: string;
    options: Array<Option>;
    children?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    estilo?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }