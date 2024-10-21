import { useEffect } from 'react';
import jsCookie from "js-cookie";
import { Login } from '@/app/_api/post/login';

export const useSetToken = () => {
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const loginData = { email: 'syntax@gmail.com', password: 123 };

        const response = await Login(loginData);

        // Adicione este log para inspecionar a resposta
        console.log('Resposta do Login:', response);

        if (response.token) {
          jsCookie.set('token', response.token, { expires: 7 });
          console.log('Token setado:', response.token); // Verifique se o token está sendo setado
        } else {
          console.error('Token não encontrado na resposta:', response);
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
      }
    };

    handleLogin();
  }, []);
};
