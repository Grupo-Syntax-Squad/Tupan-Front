'use client';
//components
import { Input } from '@/components/input/input';
import { Botao } from '@/components/botao/botao';
import { Toggle } from '@/components/input/toggle';
import { Select } from '@/components/select/select';

//hooks
import { useToken } from '@/hooks/token';
import { useEditable } from '@/hooks/editar';
import { useFormularioAlertas } from '@/hooks/formulario';
import { useDeleteAlerta } from '@/hooks/alertas/deletarAlerta';
import { useGetAlertaById } from '@/hooks/alertas/receberAlerta';
import { useUpdateAlerta } from '@/hooks/alertas/atualizarAlerta';

//utils
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormularioProps } from '@/types/interfaces';

export const FormularioAtualizacaoAlertas = ({
  onSubmit,  initialStatus, nomeFormulario, showPopConfirmacao }:
  FormularioProps & { initialStatus: boolean, showPopConfirmacao: (message: string) => void, nomeFormulario: string }) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;
  const token = useToken();
  const { alerta: formValues, loading, error } = useGetAlertaById(id, token);
  const { isEditable, toggleEdit } = useEditable();
  const { formValues: formularioValues, setFormValues, handleChange } = useFormularioAlertas(
    (formValues as unknown as Record<string, unknown>) || {}
  );
  const { updateAlerta, loading: loadingUpdate,  error: errorUpdate } = useUpdateAlerta();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (formValues && !isInitialized && Object.keys(formValues).length > 0) {
      setFormValues((prevState) => ({
        ...prevState,
        nome: formValues.nome || '',
        condicao: formValues.condicao || '',
      }));
      setIsInitialized(true);
    }
  }, [formValues, isInitialized, setFormValues]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedParams = {
      id: id || 0,
      nome: formularioValues.nome,
      fator: formularioValues.condicao,
      criado: '',
      modificado: new Date().toISOString(),
      ativo: initialStatus,
    };

    if (isNaN(updatedParams.id)) {
      console.error('ID inválido:', updatedParams.id);
      return; // Não envia se o ID for inválido
    }

    try {
      await updateAlerta(updatedParams);
      onSubmit(updatedParams as any);
      showPopConfirmacao(`Alerta: "${nomeFormulario}" atualizado com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar o alerta:'), error;
    }
  };

  const handleDelete = async () => {
    if (id) {
      const confirmDelete = confirm('Tem certeza que deseja deletar este alerta?');
      if (confirmDelete) {
        try {
          await useDeleteAlerta(id);
        } catch (error) {
          console.error('Erro ao deletar o alerta:', error);
        }
      }}
  };

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <section className="bg-white dark:bg-gray-900 w-full h-full p-6 rounded-lg shadow-md">
        <div className="w-full h-full">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Alerta - {formularioValues.nome || ''}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-row gap-11">
              <Botao
                type="button" corTexto="text-black"
                corFundo="bg-gray-300" icone="bx bx-edit-alt"
                label="Habilitar Edição" onClick={toggleEdit}
              />
              <Toggle label="Ativo" id="ativo" initialChecked={initialStatus} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full flex flex-col">
                <Input
                  id="nome" label="Nome do Alerta"
                  span="*"  placeholder="Digite o nome do alerta"
                  required  estilo="min-w-full"
                  value={formularioValues.nome || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Input
                  estilo="w-1/2"  id="condicao"
                  label="Condição do Alerta"
                  span="*"   placeholder="Insira a condição do alerta"
                  type="text" required
                  value={formularioValues.condicao || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
             
              <div className="flex justify-start mt-8 gap-6">
                <Botao
                  type="submit" corTexto="text-white"
                  corFundo="bg-blue-600" label="Atualizar Alerta"
                />
                <Botao
                  type="button" corTexto="text-white"
                  corFundo="bg-red-600" label="Deletar Alerta"
                  onClick={handleDelete} 
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
