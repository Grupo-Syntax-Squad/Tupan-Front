'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { FormularioProps } from '@/types/interfaces';
import { Toggle } from './toggle';
import { Botao } from './botao';
import { useEditable } from '@/hooks/editar';
import { useUpdateEstacao } from '@/hooks/atualizarEstacao';
import { useUpdateEndereco } from '@/hooks/atualizarEndereco';
import { useGetEstacaoById } from '@/hooks/receberEstacao';
import { useGetEnderecoById } from '@/hooks/receberEndereco';
import { useFormularioEstacoes } from '@/hooks/formulario';
import { useDeleteEstacao } from '@/hooks/deletarEstacao';

export const FormularioAtualizacaoEstacoes = ({
  onSubmit,  initialStatus, nomeFormulario, showPopConfirmacao }:
  FormularioProps & { initialStatus: boolean, showPopConfirmacao: (message: string) => void, nomeFormulario: string }) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;
  const { estacao: formValues, loading, error } = useGetEstacaoById(id);
  const { endereco: Values, loading: loadingEndereco, error: errorEndereco } = useGetEnderecoById(id);
  const { isEditable, toggleEdit } = useEditable();
  const { formValues: formularioValues, setFormValues, handleChange } = useFormularioEstacoes(
    (formValues as unknown as Record<string, unknown>) || {}
  );
  const { updateEstacao, loading: loadingUpdate,  error: errorUpdate } = useUpdateEstacao();
  const { updateEndereco, loading: loadingUpdate2,  error: errorUpdate2 } = useUpdateEndereco();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (formValues && !isInitialized && Object.keys(formValues).length > 0) {
      setFormValues((prevState) => ({
        ...prevState,
        nome: formValues.nome || '',
        topico: formValues.topico || '',
      }));
    }
  
    if (Values && Object.keys(Values).length > 0) {
      setFormValues((prevState) => ({
        ...prevState,
        cep: Values.cep || '',
        numero: Values.numero ? Values.numero.toString() : '',
        logradouro: Values.logradouro || '',
        cidade: Values.cidade || '',
        bairro: Values.bairro || '',
        complemento: Values.complemento || '',
        latitude: Values.latitude ? Values.latitude.toString() : '',
        longitude: Values.longitude ? Values.longitude.toString() : '',
        estado: Values.estado || '',
      }));
    }
  
    setIsInitialized(true);
  }, [formValues, Values, isInitialized, setFormValues]);
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedEstacao = {
      id: id || 0,
      nome: formularioValues.nome,
      topico: formularioValues.topico,
      modificado: new Date().toISOString(),
      ativo: initialStatus,
      endereco: Values ? Values.id : null, 
    };

    const updatedEndereco = {
      id: id || 0,
      cep: formularioValues.cep,
      numero: Number(formularioValues.numero), // Convertendo para número
      logradouro: formularioValues.logradouro,
      cidade: formularioValues.cidade,
      bairro: formularioValues.bairro,
      complemento: formularioValues.complemento,
      latitude: Number(formularioValues.latitude), // Convertendo para número
      longitude: Number(formularioValues.longitude), // Convertendo para número
      estado: formularioValues.estado
    };
    

    if (isNaN(updatedEstacao.id)) {
      console.error('ID inválido:', updatedEstacao.id);
      return; // Não envia se o ID for inválido
    }

    try {
      await updateEstacao(updatedEstacao);
      await updateEndereco(updatedEndereco);
      onSubmit(updatedEstacao as any);
      showPopConfirmacao(`Estação: "${nomeFormulario}" atualizada com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar a estação:'), error;
    }
  };

  const handleDelete = async () => {
    if (id) {
      const confirmDelete = confirm('Tem certeza que deseja deletar esta estação?');
      if (confirmDelete) {
        try {
          await useDeleteEstacao(id);
        } catch (error) {
          console.error('Erro ao deletar a estação:', error);
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
