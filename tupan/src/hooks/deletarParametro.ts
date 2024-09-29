import { deletarParametro } from '@/app/_api/delete/parametro'; 

export const useDeleteParametro = async (id: number) => {
  if (id) {
    try {
      await deletarParametro(id);
      window.location.reload();        
    } catch (error) {
      console.error('Erro ao deletar o parâmetro:', error);
    }
  }
};
