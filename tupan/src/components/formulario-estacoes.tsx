'use client';

import { Input } from '@/components/input/input';
import { useFormularioEstacoes } from '@/hooks/formulario';
import { FormularioProps } from '@/types/interfaces';
import { PopConfirmacao } from '@/components/pop-up/popup';
import { Select } from './select/select';
import { useCreateEstacao } from '@/hooks/adicionarEstacao';
import { Botao } from './botao/botao';
import { usePopConfirmacao } from '@/hooks/visivel';
import { useGetParametros } from '@/hooks/parametros/receberParametro'; 

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange } = useFormularioEstacoes(dados);
  const { submitEstacaoComEndereco } = useCreateEstacao();
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } = usePopConfirmacao();


  const { parametros, loading, error } = useGetParametros();
  console.log(parametros); 

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formValues.nome || !formValues.cep || !formValues.numero) {
      return alert("Por favor, preencha todos os campos obrigatórios.");
    }

    const estacao = {
      nome: formValues.nome,
      topico: formValues.topico,
      ativo: formValues.ativo === "true",
    };

    

    const endereco = {
      logradouro: formValues.logradouro,
      bairro: formValues.bairro,
      cidade: formValues.cidade,
      estado: formValues.estado,
      numero: Number(formValues.numero),
      complemento: formValues.complemento,
      cep: formValues.cep,
      latitude: Number(formValues.latitude),
      longitude: Number(formValues.longitude)
    };

    try {
      await submitEstacaoComEndereco(estacao, endereco);
      showPopConfirmacao(`Estação: ${formValues.nome}, adicionada com sucesso!`);
      onSubmit(e);
    } catch (error) {
      console.error('Erro ao criar a estação:', error);
      alert("Houve um erro ao cadastrar a estação. Tente novamente.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Crie uma nova estação
        </h2>
        <form action="#" onSubmit={handleFormSubmit}>
        <div className="w-full mb-4">
            <Input
              id="nome"
              label="Nome da Estação"
              span="*"
              placeholder="Digite o nome da estação"
              required
              value={formValues.nome}
              onChange={handleChange}
              estilo="min-w-full"
            />
          </div>
          <div className="w-full mb-4">
            <Input
              id="topico"
              label="Tópico da Estação"
              span="*"
              placeholder="Digite o tópico"
              required
              value={formValues.topico}
              onChange={handleChange}
              estilo="min-w-full"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
            <Input
                    id="cep"
                    label="CEP"
                    span="*"
                    placeholder="CEP"
                    type="number"
                    value={formValues.cep}
                    onChange={handleChange}
                    required
                  />
            </div>
            <div>
            <Input
                    id="numero"
                    label="Número"
                    span="*"
                    placeholder="Número"
                    type="number"
                    value={formValues.numero}
                    onChange={handleChange}
                    required
                  />
            </div>
            <div>
              <Input
                id="logradouro"
                label="Logradouro"
                span=" "
                placeholder="Digite o logradouro"
                required
                value={formValues.logradouro}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="cidade"
                label="Cidade"
                span=" "
                placeholder="Digite a cidade"
                required
                value={formValues.cidade}
                onChange={handleChange}
              />
            </div>
          </div>
            <div>
              <Input
                id="bairro"
                label="Bairro"
                span=" "
                placeholder="Digite o bairro"
                required
                value={formValues.bairro}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="estado"
                label="Estado"
                span=" "
                placeholder="Digite o estado"
                required
                value={formValues.estado}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="complemento"
                label="Complemento"
                span=" "
                placeholder="Digite o complemento"
                required
                value={formValues.complemento}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="latitude"
                label="Latitude"
                span=" "
                placeholder="Digite a latitude"
                required
                value={formValues.latitude}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="longitude"
                label="Longitude"
                span=" "
                placeholder="Digite a longitude"
                required
                value={formValues.longitude}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
            <Select
            id="parametro"
            label="Selecione um Parâmetro"
            options={parametros.map((parametro) => ({
              value: parametro.id,
              label: parametro.nome,
            }))}
            onChange={handleChange}
          />

          </div>

          <div className="mt-4">
            <Botao
              label="Adicionar Estação"
              corTexto="text-white"
              corFundo="bg-blue-500"
              onClick={handleFormSubmit}
              type="submit"
            />
          </div>
        </form>

        {isVisible && (
          <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
        )}
      </div>
    </section>
  );
};
