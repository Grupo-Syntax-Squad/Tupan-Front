"use client";

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter(); // Chamar useRouter dentro do componente
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:8000/api-token-auth/", {
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Armazenando o token no localStorage
      setError(null); 
      console.log("Token armazenado com sucesso:", token);

      router.push('/'); // Navegação após login bem-sucedido
      
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Credenciais inválidas, tente novamente.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex items-center gap-10">
        <div className="max-w-md">
          <h1 className="text-2xl font-bold mb-6">Bem vindo(a) de volta!</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Login
            </button>
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