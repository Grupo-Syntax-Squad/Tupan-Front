import { useState, useEffect } from 'react';
import jsCookie from 'js-cookie';
import { Login } from '@/app/_api/post/login';

export const useSetToken = () => {
  useEffect(() => {
    const setToken = async () => {
      try {
        if (localStorage.getItem('credential')){
          const credential = localStorage.getItem('credential');
          if (credential) {
            jsCookie.set('token', credential);
          }
          localStorage.removeItem('credential');
        }
        if (jsCookie.get('token')) {
          return null;
        } else{
          const response = await Login({ email: 'guest@gmail.com', password: '123456' });
          jsCookie.set('token', response.token);
          jsCookie.set('user', 'user_guest');
        }
      }
      catch(error) {
        console.error('Login failed:', error);
      };
  };
    setToken();
  }, []);
}
export const useClearToken = () => {
  useEffect(() => {
    jsCookie.remove('token');
    jsCookie.remove('user');
    console.log('Tokens cleared');
  }, []);
};

export const hasToken = () => {
  const token = jsCookie.get('token');
  return !!token;
};

export const useSetTokenUser = async (email: string, password: string) => {
  const user = { email: email, password: password };
  if (email == 'syntax@gmail.com' && password == '123') {
    try {
      const response = await Login(user);
      jsCookie.set('token', response.token);
      console.log('Login successful:', response);
      return response.token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
  else{
    try{
      const response = await Login(user);
      jsCookie.set('token', response.token);
      jsCookie.set('user', 'user_guest');
      console.log('Login successful:', response);
      return response.token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
};

export const ClearToken = () => {
  jsCookie.remove('token')
}

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    try {
      const response = await Login({
        email: 'syntax@gmail.com',
        password: '123',
      });
      const guest = 'guest_user';
      jsCookie.set('token', response.token);
      jsCookie.set('user', guest);
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
