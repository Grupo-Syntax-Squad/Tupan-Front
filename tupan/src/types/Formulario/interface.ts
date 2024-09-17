export interface FormularioProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    dados?: Record<string, unknown>;
}

