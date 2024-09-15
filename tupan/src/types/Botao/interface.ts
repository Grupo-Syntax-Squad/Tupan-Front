export interface BotaoProps {
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    label: string;
    corTexto: string;
    corFundo: string;
    icone?: string;
  }
  