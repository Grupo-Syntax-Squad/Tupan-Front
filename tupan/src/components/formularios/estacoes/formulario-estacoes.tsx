'use client';

//componentes
import { Input } from '@/components/input/input';
import Popup from '@/components/pop-up/popup';
import { Botao } from '@/components/botao/botao';
import { Select } from '@/components/select/select';

//hooks
import { useFormularioEstacoes } from '@/hooks/formulario';
import { useCreateEstacao } from '@/hooks/estacoes/adicionarEstacao';
import { useGetParametros } from '@/hooks/parametros/receberParametro';
import { usePopConfirmacao } from '@/hooks/visivel';

//tipos
import { FormularioProps } from '@/types/interfaces';
import { fetchEndereco } from '@/app/_api/get/cep';
import { PopConfirmacao } from '@/components/alertas/confirmacao';


export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange, setFormValues } = useFormularioEstacoes(dados);
  const { submitEstacao, loading, error, success } = useCreateEstacao();
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } = usePopConfirmacao();
  const { parametros, loading: loadingParametros, error: errorParametros } = useGetParametros();

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;

    handleChange(e);

    if (cep.length === 8) {
      const address = await fetchEndereco(cep);

      if (address) {
        setFormValues((prevValues) => ({
          ...prevValues,
          logradouro: address.logradouro,
          bairro: address.bairro,
          cidade: address.localidade,
          estado: address.uf,
        }));
      } else {
        alert('CEP não encontrado');
      }
    }
  };

  const handleParametrosChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const parametros = selectedOptions.map((option) => option.value);
    setFormValues({ ...formValues, parametros });
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nome, topico, parametros, logradouro, bairro, cidade, estado, numero, complemento, cep, latitude, longitude } = formValues;
    const estacao = { nome, topico, ativo: true, parametros };
    const endereco = { logradouro, bairro, cidade, estado, numero, complemento, cep, latitude, longitude };

    if (!nome || !cep || !topico || !parametros) {
      return alert('Por favor, preencha todos os campos obrigatórios.');
    }

    try {
      console.log('Enviando dados da estação:', estacao);
      console.log('Enviando dados do endereço:', endereco);
      await submitEstacao(estacao, endereco);
      showPopConfirmacao(`Estação: ${nome}, adicionada com sucesso!`);
      onSubmit(e);
    } catch (error) {
      console.error('Erro ao criar a estação:', error);
      alert('Houve um erro ao cadastrar a estação. Tente novamente.');
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
                onChange={handleCepChange}
                required
              />
            </div>
            <div>
              <Input
                id="numero"
                label="Número"
                span="*"
                placeholder="Número"
                type="text"
                value={formValues.numero}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
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
            <div className="mb-2">
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
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
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
            <div className="mb-2">
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
          </div>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="mb-2">
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
                onChange={handleParametrosChange}
              />
            </div>
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
