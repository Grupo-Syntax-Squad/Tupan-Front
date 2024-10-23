import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import { Login } from '@/app/_api/post/token';

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
  
  useEffect(() => {
    const token = jsCookie.get('token') ?? null;
    setToken(token);
  }, []);

  return token;
};
