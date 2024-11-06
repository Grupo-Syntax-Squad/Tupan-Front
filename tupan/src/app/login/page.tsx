'use client';

//components
import { Input } from '@/components/input/input';
import { Botao } from '@/components/botao/botao';

//hooks
import { useLogin } from '@/hooks/usuarios/entrar';
import { useSetTokenUser, ClearToken } from '@/hooks/token';


//utils
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  ClearToken()
  const { LoginUser, loading, error, success } = useLogin();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const loginResult = await LoginUser(email, password);

    if (loginResult) {
      router.push('/');
  };
}

  return (
    <section className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex items-center gap-10">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-6">Bem vindo(a) de volta!</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className="flex flex-col gap-4"
            onSubmit={handleSubmit}>
            <div>
              <Input
                id="email"
                label="E-mail"
                span=" "
                placeholder="Digite o seu e-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                estilo="mt-1 w-full px-3 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
            <Input
                id="senha"
                label="Senha"
                span=" "
                placeholder="Digite a sua senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                estilo="mt-1 w-full px-3 py-2 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <Botao
              label="Entrar"
              corTexto="text-white"
              corFundo="bg-blue-500"
              type="submit"
            />
          </form>
        </div>
        <div>
          <Image
            src="/assets/image 126.png"
            alt="Image-126"
            width={250}
            height={250}
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
