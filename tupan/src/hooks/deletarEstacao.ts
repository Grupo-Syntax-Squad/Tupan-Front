import { deletarEstacao } from '@/app/_api/delete/estacao'; 

export const useDeleteEstacao = async (id: number) => {
  if (id) {
    try {
      await deletarEstacao(id);
      window.location.reload();        
    } catch (error) {
      console.error('Erro ao deletar a estação:', error);
    }
  }
};
