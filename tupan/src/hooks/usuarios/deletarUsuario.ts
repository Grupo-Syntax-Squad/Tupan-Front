import { deletarUsuario } from "@/app/_api/delete/usuarios";

export const useDeleteUsuario = async (id: number) => {
  if (id) {
    try {
      await deletarUsuario(id);
      window.location.reload();        
    } catch (error) {
      console.error('Erro ao deletar o usuário:', error);
    }
  }
};
