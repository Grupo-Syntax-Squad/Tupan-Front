export interface InputProps {
    label?: string;
    id: string;
    checked?: boolean; 
    type?: 'text' | 'number' | 'password' | 'date' | 'checkbox' | 'email' | 'tel' | 'url';
    value?: string | number; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    estilo?: string;
    span?: string;
  }
  