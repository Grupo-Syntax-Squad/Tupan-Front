import { useState } from 'react';
import { Login } from '@/app/_api/post/login';
import { useRouter } from 'next/router';
import { useSetTokenUser } from '../token';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const LoginUser = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const result = await useSetTokenUser(email, password);
            console.log('Login realizado com sucesso:', result);
            localStorage.setItem('credential', result);
            setSuccess('Login realizado com sucesso');
            return result;
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Erro desconhecido');
            }
        } finally {
            setLoading(false);
        }
    }
    return { LoginUser, loading, error, success };
}