import { deletarEndereco } from "@/app/_api/delete/endereco";

export const useDeleteEndereço = async (id: number) => {
  if (id) {
    try {
      await deletarEndereco(id);
      window.location.reload();        
    } catch (error) {
      console.error('Erro ao deletar o endereço:', error);
    }
  }
};
