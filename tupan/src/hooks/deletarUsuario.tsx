import { deletarUsuario } from '@/app/_api/delete/usuarios';

const deleteUsuario = async (id: number) => {
  try {
    await deletarUsuario(id);
    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== id));
    setError(null); // Limpa os erros
  } catch (error) {
    console.error(`Erro ao deletar o usuário com ID ${id}:`, error);
    setError("Erro ao deletar o usuário.");
  }
};

export default deleteUsuario;