'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { FormularioProps } from '@/types/interfaces';
import { Toggle } from './toggle';
import { Botao } from './botao';
import { useEditable } from '@/hooks/editar';
import { useUpdateParametro } from '@/hooks/atualizarParametro';
import { useGetParametroById } from '@/hooks/receberParametro';
import { useFormularioParametros } from '@/hooks/formulario'; // Adicionado

export const FormularioAtualizacaoParametros = ({
  onSubmit,
  initialStatus,
}: FormularioProps & { initialStatus: boolean }) => {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;

  const { parametro: formValues, loading, error } = useGetParametroById(id);

  const { isEditable, toggleEdit } = useEditable();
  const {
    formValues: formularioValues,
    setFormValues,
    handleChange,
  } = useFormularioParametros(
    (formValues as unknown as Record<string, unknown>) || {}
  );
  const {
    updateParametro,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUpdateParametro();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (formValues && !isInitialized && Object.keys(formValues).length > 0) {
      setFormValues((prevState) => ({
        ...prevState,
        nome: formValues.nome || '',
        escala: formValues.unidade || '',
        fator: String(formValues.fator || 0),
        nomejson: formValues.nome_json || '',
        offset: String(formValues.offset || 0),
        status: formValues.status || '',
        medida:
          formValues.unidade === 'C' ||
          formValues.unidade === 'F' ||
          formValues.unidade === 'K'
            ? 'Temperatura'
            : formValues.unidade === 'Pa'
              ? 'Pressão'
              : formValues.unidade === 'metroCubico'
                ? 'Umidade'
                : formValues.unidade === 'velocidadeVentoMS' ||
                    formValues.unidade === 'velocidadeVentoKH'
                  ? 'Velocidade do vento'
                  : 'Volume da chuva',
        descricao: formValues.descricao || '',
      }));
      setIsInitialized(true);
    }
  }, [formValues, isInitialized, setFormValues]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const updatedParams = {
      id: id || 0,
      nome: formularioValues.nome,
      fator: formularioValues.fator,
      offset: formularioValues.offset,
      unidade: formularioValues.escala,
      nome_json: formularioValues.nomejson,
      criado: '',
      modificado: new Date().toISOString(),
      ativo: initialStatus,
    };

    if (isNaN(updatedParams.id)) {
      console.error('ID inválido:', updatedParams.id);
      return; // Não tenta enviar a requisição se o ID for inválido
    }

    try {
      await updateParametro(updatedParams);
      onSubmit(updatedParams as any);
    } catch (error) {
      console.error('Erro ao atualizar o parâmetro:'), error;
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  if (!formValues) {
    return <div>Nenhum dado encontrado.</div>;
  }

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <section className="bg-white dark:bg-gray-900 w-full h-full p-6 rounded-lg shadow-md">
        <div className="w-full h-full">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Parâmetro - {formularioValues.nome || ''}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-row gap-11">
              <Botao
                type="button"
                corTexto="text-black"
                corFundo="bg-gray-300"
                icone="bx bx-edit-alt"
                label="Habilitar Edição"
                onClick={toggleEdit}
              />
              <Toggle label="Ativo" id="ativo" initialChecked={initialStatus} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="w-full flex flex-col">
                <Input
                  id="nome"
                  label="Nome do Parâmetro"
                  span="*"
                  placeholder="Digite o nome do parâmetro"
                  required
                  estilo="min-w-full"
                  value={formularioValues.nome || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Input
                  estilo="w-1/2"
                  id="offset"
                  label="Off-Set do Parâmetro"
                  span="*"
                  placeholder="Insira o valor de Off-Set (padrão: 0)"
                  type="number"
                  required
                  value={formularioValues.offset || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
                <Input
                  estilo="w-1/2"
                  id="fator"
                  label="Fator de Conversão"
                  span="*"
                  placeholder="Insira o valor de conversão do parametro"
                  type="number"
                  required
                  value={formularioValues.fator || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Input
                  estilo="min-w-full"
                  id="nomejson"
                  label="Nome JSON"
                  span="*"
                  required
                  placeholder="Campo JSON do Parâmetro"
                  type="text"
                  value={formularioValues.nomejson || ''}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Select
                  id="medida"
                  label="Medida"
                  span="*"
                  required
                  estilo="min-w-full"
                  value={formularioValues.medida || 'selecione uma opção'}
                  onChange={handleChange}
                  disabled={!isEditable}
                  options={[
                    { label: 'Temperatura', value: 'Temperatura' },
                    { label: 'Pressão', value: 'Pressão' },
                    { label: 'Umidade', value: 'Umidade' },
                    { label: 'Volume da chuva', value: 'Volume' },
                    {
                      label: 'Velocidade do vento',
                      value: 'Velocidade do vento',
                    },
                  ]}
                />
                <Select
                  id="escala"
                  label="Escala de Medição"
                  span="*"
                  estilo="min-w-full"
                  required
                  value={formularioValues.escala || 'selecione uma opção'}
                  onChange={handleChange}
                  disabled={!isEditable}
                  options={[
                    { label: '° C', value: 'C' },
                    { label: '° F', value: 'F' },
                    { label: '° K', value: 'K' },
                    { label: 'Pascal', value: 'Pa' },
                    { label: 'g/m³', value: 'metroCubico' },
                    { label: 'm/s', value: 'velocidadeVentoMS' },
                    { label: 'km/h', value: 'velocidadeVentoKH' },
                  ]}
                />
              </div>
              {/* Continue com os outros campos de maneira similar */}
              <div className="flex justify-end mt-8">
                <Botao
                  type="submit"
                  corTexto="text-white"
                  corFundo="bg-blue-600"
                  label="Atualizar Parâmetro"
                  onClick={() => {}} // Não precisa de onClick aqui pois o handleSubmit já está definido
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
