import { deletarAlerta } from "@/app/_api/delete/alertas";

export const useDeleteAlerta = async (id: number) => {
  if (id) {
    try {
      await deletarAlerta(id);
      window.location.reload();        
    } catch (error) {
      console.error('Erro ao deletar o alerta:', error);
    }
  }
};
