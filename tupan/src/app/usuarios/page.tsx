"use client";

//componentes
import { MenuLateral } from "@/components/menu/lateral";
import { NavTop } from "@/components/nav-top";
import { Formulario } from "@/components/formularios/usuarios/formulario-usuarios";
import { Tabela } from "@/components/tabela/tabela-usuarios";
import { Botao } from "@/components/botao/botao";

//hooks
import { useGetUsuarios} from "@/hooks/usuarios/receberUsuario";

//utils
import Link from 'next/link';

export default function Usuario() {

  const { usuarios, loading, error, refetch } = useGetUsuarios();

  const colunas = [
    { acessor: 'email', label: 'Email' },
    { acessor: 'criacao', label: 'Data de cadastro' },
  ];
  const dados = usuarios.map((usuario) => {
    const data = new Date(usuario.criacao);
    const dataFormatada = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
    return { email: usuario.email, criacao: dataFormatada };
  });

  const handleSubmit = () => {
    refetch();
  };

  const menuData = [
    { nome: "Estações", path: "/estacoes", icone: "bx bx-home" },
    { nome: "Parâmetros", path: "/parametros", icone: "bx bxs-thermometer" },
    { nome: "Alertas", path: "/alertas", icone: "bx bx-alarm-exclamation" },
    { nome: "Usuários", path: "/usuarios", icone: "bx bx-user" },
    { nome: "Educacional", path: "/educacional", icone: "bx bx-book" },
    { nome: "Logout", path: "/login", icone: "bx bx-log-out" },
  ];

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop path="Usuários" nome="" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {usuarios.length === 1 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem usuarios cadastrados!</p>
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