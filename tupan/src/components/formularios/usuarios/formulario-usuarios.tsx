'use client';
//components
import { Input } from '@/components/input/input';
import { PopConfirmacao } from '@/components/alertas/confirmacao';
import { Botao } from '@/components/botao/botao';

//hooks
import { useCreateUsuario } from '@/hooks/usuarios/adicionarUsuario';
import { usePopConfirmacao } from '@/hooks/visivel';
import { useFormularioUsuarios } from '@/hooks/formulario';

//utils
import { FormularioProps } from '@/types/interfaces';

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange } = useFormularioUsuarios(dados);
  const { submitUsuario, loading, error, success } = useCreateUsuario();
  const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =  usePopConfirmacao();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formValues;
    const usuario = { email, password };
    const emailDomains = ['@gmail.com', '@outlook.com', '@icloud.com'];
    const isValidEmailDomain = emailDomains.some(domain => email.endsWith(domain));

    if (!email || !password) {
      return alert('Por favor, preencha todos os campos obrigatórios.');
    }

    if (password.length < 6) {
      return alert('A senha deve ter no mínimo 6 caracteres.');
    }


    if (!isValidEmailDomain) {
      return alert('Por favor, utilize um e-mail válido.');
    }

    try {
      await submitUsuario(usuario);
      showPopConfirmacao(
        `Usuário: ${formValues.email}, cadastrado com sucesso!`
      );
      onSubmit(e);
    } catch (error) {
      console.error('Erro ao criar o usuário:', error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
      <div className="py-8 px-4 mx-auto max-w-3xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Cadastre um Usuário
        </h2>
        <form action="#" onSubmit={handleFormSubmit}>
          <div className="w-full mb-4">
            <Input
              id="email"
              label="E-mail de acesso"
              span="*"
              placeholder="Digite o e-mail do usuário"
              required
              value={formValues.email}
              onChange={handleChange}
              estilo="min-w-full"
            />
          </div>
          <div className="w-full mb-4">
            <Input
              id="password"
              label="Senha de acesso"
              span="*"
              placeholder="Digite a senha do usuário"
              required
              value={formValues.password}
              onChange={handleChange}
              estilo="min-w-full"
            />
          </div>

          <div className="mt-4">
            <Botao
              label="Cadastrar Usuário"
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
