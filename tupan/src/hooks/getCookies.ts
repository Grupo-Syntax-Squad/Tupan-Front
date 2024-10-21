import { useEffect, useState } from 'react';
import jsCookie from "js-cookie";

export const useGetToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = jsCookie.get('token'); 
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error('Token não encontrado nos cookies.');
    }
  }, []);

  return token;
};
