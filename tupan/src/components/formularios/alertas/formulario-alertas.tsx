'use client';

//componentes
import { Input } from '@/components/input/input';
import { Botao } from '@/components/botao/botao';
import { Select } from '@/components/select/select';
import { PopConfirmacao } from '@/components/alertas/confirmacao';

//hooks
import { useFormularioAlertas } from '@/hooks/formulario';
import { useCreateAlerta } from '@/hooks/alertas/adicionarAlerta';
import { useGetParametros } from '@/hooks/parametros/receberParametro';
import { useGetEstacoes } from '@/hooks/estacoes/receberEstacao';
import { usePopConfirmacao } from '@/hooks/visivel';

//tipos
import { FormularioProps } from '@/types/interfaces';

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange, setFormValues } =  useFormularioAlertas(dados);
  const { submitAlerta, loading, error, success } = useCreateAlerta();
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =  usePopConfirmacao();
  const { parametros, loading: loadingParametros, error: errorParametros } = useGetParametros();
  const { estacoes, loading: loadingEstacoes, error: errorEstacoes } = useGetEstacoes()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nome, condicao, estacao, parametro, valor} = formValues;
    const condicaoCompleta = `${condicao}${valor}`;
    const estacao_parametro = { estacao, parametro }; 
    const alerta = { nome, condicao: condicaoCompleta, ativo: true, estacao_parametro};

    if (!nome || !condicao || !estacao || !parametro) {
      return alert('Por favor, preencha todos os campos obrigatórios.');
    }

    try {
      await submitAlerta(alerta);
      showPopConfirmacao(`Alerta: ${nome}, adicionada com sucesso!`);
      onSubmit(e);
    } catch (error) {
      console.error('Erro ao criar o alerta:', error);
      alert('Houve um erro ao cadastrar o alerta. Tente novamente.');
    }
  };

  const handleCondicaoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const condicao = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      condicao,
    }));
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormValues((prevValues) => ({
      ...prevValues,
      valor,
    }));
  };

  const handleParametroChange = (e) => {
    const {value} = e.target;
    setFormValues({ ...formValues, parametro: value })
  };

  const handleEstacaoChange = (e) => {
    const {value} = e.target;
    const selectedEstacao = estacoes.find(estacao => estacao.id === parseInt(value));
    if (selectedEstacao) {
      const filteredParametros = parametros.filter(parametro => selectedEstacao.parametros.includes(parametro.id));
      setFormValues({ ...formValues, estacao: value, filteredParametros });
    }
  }

  const condicoes = [
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '=', label: '=' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
    { value: '!=', label: '!=' },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Crie um novo alerta
        </h2>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="mb-4">
              <Input
                id="nome"
                label="Nome do Alerta"
                span="*"
                placeholder="Digite o nome do alerta"
                required
                value={formValues.nome}
                onChange={handleChange}
                estilo="min-w-full"
              />
            </div>
            <div className="mb-4 grid sm:grid-cols-2 sm:gap-6">
              <Select
                id="alerta"
                label="Selecione uma condição"
                options={condicoes.map((condicao) => ({
                  value: condicao.value,
                  label: condicao.label,
                }))}
                onChange={handleCondicaoChange}
                value={formValues.condicao}
              />
              <Input
                id="valor"
                label="Valor da Condição"
                span="*"
                placeholder="Digite o nome do alerta"
                required
                value={formValues.valor}
                onChange={handleValorChange}
                estilo="min-w-full"
              />
            </div>
            <div className="mb-4">
              <Select
              id="estacao"
              label="Selecione uma Estação"
              options={estacoes.map((estacao) => ({
                value: estacao.id,
                label: estacao.nome,
              }))}
              onChange={handleEstacaoChange}
              />
            </div>
            <div className="mb-4">
              <Select
              id="parametro"
              label="Selecione um Parâmetro"
              options={formValues.filteredParametros?.map((parametro) => ({
                value: parametro.id,
                label: parametro.nome,
              }))}
              onChange={handleParametroChange}
              />
            </div>  
          </div>
          <div className="mt-4">
            <Botao
              label="Adicionar Alerta"
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
