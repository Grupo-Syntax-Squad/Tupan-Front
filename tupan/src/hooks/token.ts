import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import { Login } from '@/app/_api/post/login';

export const useSetToken = () => {
  useEffect(() => {
    Login({ email: 'syntax@gmail.com', password: '123' }).then(response => {
      jsCookie.set('token', response.token);
      console.log('Login successful:', response);
    }).catch(error => {
      console.error('Login failed:', error);
    });
  }, []);
};

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      const response = await Login({ email: 'syntax@gmail.com', password: '123' });
      jsCookie.set('token', response.token);
      setToken(response.token);
      console.log('Token obtido com sucesso:', response.token);
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
  };
  
  useEffect(() => {
    console.log('useToken called');
    const storedToken = jsCookie.get('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      fetchToken();
    }
  }, []);

  return token;
};