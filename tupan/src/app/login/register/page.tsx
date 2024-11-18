'use client';

//components
import { Input } from '@/components/input/input';
import { Botao } from '@/components/botao/botao';

//hooks
import { useLogin } from '@/hooks/usuarios/entrar';
import { useSetTokenUser, ClearToken } from '@/hooks/token';
import { useCreateUsuario } from '@/hooks/usuarios/adicionarUsuario';
import { usePopConfirmacao } from '@/hooks/visivel';
import { useFormularioUsuarios } from '@/hooks/formulario';

//utils
import Image from 'next/image';
import JsCookie from 'js-cookie';
import { FormularioProps } from '@/types/interfaces';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PopConfirmacao } from '@/components/alertas/confirmacao';

const Register = ({ onSubmit, dados }: FormularioProps) => {
    const { formValues, handleChange } = useFormularioUsuarios(dados);
    const { submitUsuario, loading, error, success } = useCreateUsuario();
    const { isVisible, mensagem, showPopConfirmacao, hidePopConfirmacao } =  usePopConfirmacao();
    const { LoginUser } = useLogin();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = formValues;
        const usuario = { email, password };
        const emailDomains = ['@gmail.com', '@outlook.com', '@icloud.com'];
        const isValidEmailDomain = emailDomains.some((domain) =>
            email.endsWith(domain)
        );

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
            const loginResult = await LoginUser(formValues.email, formValues.password);
            console.log('Login realizado com sucesso:', loginResult);
            
            const token = await JsCookie.get('token');
            
            if (token) {
                router.push('/');
            } else {
                alert('Falha ao fazer login. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error(error);
            alert('Ocorreu um erro ao cadastrar o usuário. Por favor, tente novamente.');
        }
    };

    return (
        <section className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex items-center gap-10">
                <div className="max-w-md">
                    <h1 className="text-2xl font-bold mb-6">
                        Bem vindo(a) ao Cadastro de Usuário!
                    </h1>
                    <h1 className="text-1xl font-bold mb-6 text-blue-500 cursor-pointer">
                        <Link href={'https://github.com/Grupo-Syntax-Squad/Tupan/wiki'} target="_blank">
                            Preciso de ajuda
                        </Link>
                    </h1>
                    {error && (
                        <p className="text-red-500 mb-4">
                            Usuário ou senha incorretos. Por favor, tente novamente.
                        </p>
                    )}
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Input
                                id="email"
                                label="E-mail"
                                span="*"
                                type="email"
                                placeholder="Digite o seu e-mail"
                                required
                                value={formValues.email}
                                onChange={handleChange}
                                estilo="mt-1 w-full px-3 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <Input
                                id="password"
                                label="Senha de acesso"
                                span="*"
                                placeholder="Digite a senha do usuário"
                                required
                                value={formValues.password}
                                onChange={handleChange}
                                estilo="mt-1 w-full px-3 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <Botao
                            label="Cadastrar"
                            corTexto="text-white"
                            corFundo="bg-blue-500"
                            type="submit"
                            onClick={handleSubmit}
                        />
                    </form>
                </div>
                <div>
                    <Image
                        src="/assets/image 126.png"
                        alt="Image-126"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
            {isVisible && (
                <PopConfirmacao mensagem={mensagem} onClose={hidePopConfirmacao} />
            )}
        </section>
    );
};

export default Register;
