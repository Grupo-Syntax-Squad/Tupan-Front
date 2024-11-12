export interface BotaoProps {
    onClick?: (e?: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
    type?: 'button' | 'submit' | 'reset';
    label: string;
    corTexto: string;
    corFundo: string;
    icone?: string;
  }


  