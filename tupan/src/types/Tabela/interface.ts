export interface TabelaColuna{
    label: string;
    acessor: string;
}

export interface TableProps {
    colunas: TabelaColuna[]; // Array de colunas da tabela
    dados: Record<string, unknown>[];
}