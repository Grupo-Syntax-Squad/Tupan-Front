export interface TabelaColuna{
    label: string;
    acessor: string;
}

export interface TableProps {
    colunas: TabelaColuna[]; 
    dados: Record<string, unknown>[];
}