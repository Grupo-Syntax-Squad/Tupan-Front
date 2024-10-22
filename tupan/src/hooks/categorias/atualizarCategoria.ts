// import { useState } from "react";
// import { atualizarCategoria } from "@/app/_api/update/categoria";
// import { obterCategoriaPorId } from "@/app/_api/get/categorias";

// export const useUpdateCategoria = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);

//   const DadosCategoria = async (id: number) => {
//     console.log("Iniciando busca de categoria com id:", id);
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const result = await obterCategoriaPorId(id);
//       return result;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Erro ao obter dados da categoria:", error.message);
//         setError(error.message);
//       } else {
//         console.error("Erro desconhecido ao obter categoria");
//         setError('Erro desconhecido');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateCategoria = async (categoria: {
//     id: number;
//     unidade: string;
//     nome: string;
//     ativo: boolean; 
//     modificado: string;
//     criado: string;
//   }) => {
//     const dados = await DadosCategoria(categoria.id);

//     if (!dados) {
//       console.error('Não foi possível obter os dados da categoria');
//       throw new Error('Não foi possível obter os dados da categoria');
//     }

//     categoria.unidade = categoria.unidade || dados.unidade;
//     categoria.nome = categoria.nome || dados.nome;
//     categoria.ativo = categoria.ativo || dados.ativo;
//     categoria.criado = dados.criado;

//     if (categoria.id !== dados.id) {
//       console.error("Erro: O id da categoria não corresponde ao id da requisição");
//       return new Error('O id da categoria não corresponde ao id da requisição');
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const result = await atualizarCategoria(categoria);
//       setSuccess("Categoria atualizado com sucesso!");
//       return result;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Erro ao atualizar a categoria:", error.message);
//         setError(error.message);
//       } else {
//         console.error("Erro desconhecido ao atualizar a categoria");
//         setError('Erro desconhecido');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { updateCategoria, loading, error, success };
// };
