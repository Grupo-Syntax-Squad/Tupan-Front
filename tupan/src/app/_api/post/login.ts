import { api_route } from '..';

interface Usuario {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
}

export const Login = async (login: Usuario): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${api_route}api-token-auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    });

    if (!response.ok) {
      throw new Error(`Erro ao fazer login: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};
