'use client';

//components
import { Input } from '@/components/input/input';
import { Botao } from '@/components/botao/botao';
import { Toggle } from '@/components/input/toggle';
import { Select } from '@/components/select/select';

//hooks
import { useFormularioEstacoes } from '@/hooks/formulario';
import { useEditable } from '@/hooks/editar';
import { useDeleteEstacao } from '@/hooks/estacoes/deletarEstacao';
import { useGetEstacaoById } from '@/hooks/estacoes/receberEstacao';
import { useUpdateEstacao } from '@/hooks/estacoes/atualizarEstacao';
import { useUpdateEndereco } from '@/hooks/enderecos/atualizarEndereco';
import { useGetEnderecoById } from '@/hooks/enderecos/receberEndereco';
import { useToken } from '@/hooks/token';

//utils
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FormularioProps } from '@/types/interfaces';

export const FormularioAtualizacaoEstacoes = ({ 
  onSubmit, initialStatus, nomeFormulario, showPopConfirmacao}: FormularioProps & {
  initialStatus: boolean; showPopConfirmacao: (message: string) => void;
  nomeFormulario: string;}) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : 0;
  const token = '36e2f9704f658dbb282b1a2205898cbbf3b7a914'
  console.log(token);
  
  const { estacao: formValues, loading, error } = useGetEstacaoById(id, token) as unknown as { estacao: { nome: string; topico: string; endereco: { cep: string; logradouro: string; numero: string; bairro: string; cidade: string; estado: string; complemento: string; latitude: string; longitude: string; }; }; loading: boolean; error: any };
  const { isEditable, toggleEdit } = useEditable();
  const { formValues: formularioValues,setFormValues, handleChange,} = useFormularioEstacoes((formValues as unknown as Record<string, unknown>) || {});
  const { updateEstacao, loading: loadingUpdate,  error: errorUpdate} = useUpdateEstacao();
  const [ isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    console.log('useEffect called');

    if (formValues && !isInitialized && Object.keys(formValues).length > 0) {
      const newFormValues = {
        nome: formValues.nome || '',
        topico: formValues.topico || '',
        ativo: initialStatus,
        cep: formValues.endereco?.cep || '',
        logradouro: formValues.endereco?.logradouro || '',
        numero: formValues.endereco?.numero || '',
        bairro: formValues.endereco?.bairro || '',
        cidade: formValues.endereco?.cidade || '',
        estado: formValues.endereco?.estado || '',
        complemento: formValues.endereco?.complemento || '',
        latitude: formValues.endereco?.latitude || '',
        longitude: formValues.endereco?.longitude || '',
        parametros: [],
      };
      console.log('newFormValues:', newFormValues);

      if (JSON.stringify(formularioValues) !== JSON.stringify(newFormValues)) {
        setFormValues(newFormValues);
        console.log('setFormValues called with:', newFormValues);
      }

      // Marcar como inicializado apenas se `formValues` foi atualizado com sucesso
      setIsInitialized(true);
    }
    console.log('formValues:', formValues);
  }, [isInitialized, setFormValues, initialStatus, loading]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedParams = {
      id: id || 0,
      nome: formularioValues.nome,
      topico: formularioValues.topico,
      endereco: {
        cep: formularioValues.cep,
        logradouro: formularioValues.logradouro,
        numero: formularioValues.numero,
        bairro: formularioValues.bairro,
        cidade: formularioValues.cidade,
        estado: formularioValues.estado,
        complemento: formularioValues.complemento,
        latitude: formularioValues.latitude,
        longitude: formularioValues.longitude,
      },
      parametros: [formularioValues.parametros],
      criado: '',
      modificado: new Date().toISOString(),
      ativo: initialStatus,
    };

    if (isNaN(updatedParams.id)) {
      console.error('ID inválido:', updatedParams.id);
      return; // Não envia se o ID for inválido
    }

    try {
      await updateEstacao(updatedParams);
      onSubmit(updatedParams as any);
      showPopConfirmacao(
        `Estacao: "${nomeFormulario}" atualizado com sucesso!`
      );
    } catch (error) {
      console.error('Erro ao atualizar o parâmetro:'), error;
    }
  };

  const handleDelete = async () => {
    if (id) {
      const confirmDelete = confirm(
        'Tem certeza que deseja deletar este parâmetro?'
      );
      if (confirmDelete) {
        try {
          await useDeleteEstacao(id);
        } catch (error) {
          console.error('Erro ao deletar o parâmetro:', error);
        }
      }
    }
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
            Estação - {formularioValues.nome || ''}
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
                  id="nome" label="Nome da estação"
                  span="*"  placeholder="Digite o nome da estação"
                  required  estilo="min-w-full"
                  value={formularioValues.nome || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full flex flex-col">
                <Input
                  id="topico" label="Tópico"
                  span="*"  placeholder="Digite o tópico da estação"
                  required  estilo="min-w-full"
                  value={formularioValues.topico || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full flex flex-col">
                <Input
                  id="cep" label="CEP"
                  span="*"  placeholder="Digite o CEP"
                  required  estilo="min-w-full"
                  value={formularioValues.cep || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full flex flex-col">
                <Input
                  id="numero" label="Número"
                  span="*"  placeholder="Digite o número"
                  required  estilo="min-w-full"
                  value={formularioValues.numero || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                  type=''
                />
              </div>
              <div className="w-full flex flex-col">
                <Input
                  id="logradouro" label="Logradouro"
                  span="*"  placeholder="Digite o logradouro"
                  required  estilo="min-w-full"
                  value={formularioValues.logradouro || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="w-full flex flex-col">
                <Input
                  id="cidade" label="Cidade"
                  span="*"  placeholder="Digite a cidade"
                  required  estilo="min-w-full"
                  value={formularioValues.cidade || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              
             
              <div className="flex justify-start mt-8 gap-6">
                <Botao
                  type="submit" corTexto="text-white"
                  corFundo="bg-blue-600" label="Atualizar Estação"
                />
                <Botao
                  type="button" corTexto="text-white"
                  corFundo="bg-red-600" label="Deletar Estação"
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