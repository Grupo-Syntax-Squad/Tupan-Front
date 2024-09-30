'use client';

import { Input } from '@/components/input';
import { useFormularioParametros } from '@/hooks/formulario';
import { FormularioProps } from '@/types/interfaces';
import { PopConfirmacao } from '@/components/pop-confirmacao';
import { Select } from './select';
import { useCreateParametro } from '@/hooks/adicionarParametro';
import { Botao } from './botao';
import { usePopConfirmacao } from '@/hooks/visivel';

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange } = useFormularioParametros(dados);
  const { submitParametro, loading, error, success } = useCreateParametro();

  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =
    usePopConfirmacao();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parametro = {
      nome: formValues.nome,
      fator: formValues.fator || 0, 
      offset: formValues.offset || 0,
      unidade: formValues.escala,
      nome_json: formValues.nomejson,
      description: formValues.description, 
    };

    try {
      await submitParametro(parametro); 
      showPopConfirmacao(
        `Parametro: ${formValues.nome}, adicionado com sucesso!`
      );
      onSubmit(e); 
    } catch (error) {
      console.error('Erro ao criar o parâmetro:', error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Crie um novo parâmetro
        </h2>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="w-full mb-4">
            <Input
              id="nome"
              label="Nome do Parâmetro"
              span="*"
              placeholder="Digite o nome do parâmetro"
              required
              value={formValues.nome}
              onChange={handleChange}
              estilo="min-w-full"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <Select
                id="medida"
                label="Medida"
                span="*"
                required
                value={formValues.medida}
                onChange={handleChange}
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
            </div>
            <div>
              <Select
                id="escala"
                label="Escala de medição"
                span="*"
                required
                value={formValues.escala}
                onChange={handleChange}
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
            <div>
              <Input
                id="nomejson"
                label="Nome do Parâmetro JSON"
                span=" "
                placeholder="Digite o nome do parâmetro no campo JSON"
                required
                value={formValues.nomejson}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="fator"
                label="Fator de Conversão"
                span=" "
                placeholder="Digite o fator de conversao do parametro"
                required
                value={formValues.fator}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Descrição
            </label>
            <textarea
              id="description"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Adicione uma descrição para o parâmetro"
              value={formValues.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mt-4">
            <Botao
              label="Adicionar Parâmetro"
              corTexto="text-white"
              corFundo="bg-blue-500"
              onClick={handleFormSubmit}
              type="submit"
            />
          </div>
        </form>
        {/* Exibe o PopConfirmacao quando isVisible for verdadeiro */}
        {isVisible && (
          <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
        )}
      </div>
    </section>
  );
};
