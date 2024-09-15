export interface InputProps {
    label?: string;
    id: string;
    type?: 'text' | 'number' | 'password' | 'date' | 'email' | 'tel' | 'url';
    value?: string | number ;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    estilo?: string;
    span?: string;
}