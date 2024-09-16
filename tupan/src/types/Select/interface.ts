export interface Option {
    label: string;
    value: string;
  }
  
  export interface SelectProps {
    id: string;
    label: string;
    span: string;
    options: Array<Option>;
    required: boolean;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }