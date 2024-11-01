'use client';

//componentes
import { MenuLateral } from '@/components/menu/lateral';
import { Formulario } from '@/components/formularios/estacoes/formulario-estacoes';
import { NavTop } from '@/components/nav-top';
import { Tabela } from '@/components/tabela/tabela-estacoes';
import { Botao } from '@/components/botao/botao';

//hooks
import { useGetEstacoes } from '@/hooks/estacoes/receberEstacao';

//utils
import Link from 'next/link';

export default function Estacoes() {

  const { estacoes, loading, error, refetch } = useGetEstacoes();
  const colunas = [
    { acessor: 'nome', label: 'Nome' },
    { acessor: 'status', label: 'Status' },
    { acessor: 'endereco', label: 'Endereço' },
  ];
  const dados = estacoes.map((estacao) => ({
    nome: estacao.nome,
    status: estacao.ativo ? 'Ativo': 'Inativo',
    endereco: estacao.endereco
      ? `${estacao.endereco.logradouro}, ${estacao.endereco.numero}, ${estacao.endereco.bairro}, ${estacao.endereco.cidade} - ${estacao.endereco.estado}`
      : 'Endereço não disponível',
  }));


  const handleSubmit = () => {
    refetch();
  };

  const menuData = [
    { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
    { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
    { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
    { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
    { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
    { nome: 'Logout', path: '/', icone: 'bx bx-log-out' },
  ];

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop path="Estações" nome="" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {estacoes.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem estações cadastradas!</p>
              <Formulario
                onSubmit={handleSubmit}
                dados={{}}
                initialStatus={true}
              />
            </div>
          ) : (
            <>
              <div className="w-1/2">
                <Tabela colunas={colunas} dados={dados} />
              </div>
              <div className="flex-1">
                <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
