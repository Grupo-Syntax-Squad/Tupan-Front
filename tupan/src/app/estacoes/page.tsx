"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { tempICON, UmidadeIcon, VentoICON, chuvaICON } from '../../../public/export';

export default function Estacoes() {
    const [estacoes, setEstacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    interface Estacao {
        id: number;
        nome: string;
        temperatura: number;
        umidade: number;
        vento: number;
        chuva: number;
    }

    useEffect(() => {
        const fetchEstacoes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/estacoes', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar estações');
                }

                const data = await response.json();
                console.log('Dados recebidos:', data);
                if (Array.isArray(data)) {
                    setEstacoes(data);
                } else {
                    console.error('A resposta não é um array:', data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEstacoes();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <section className='flex flex-wrap justify-center mt-10'>
        {estacoes.length === 0 ? (
            <div>Nenhuma estação cadastrada.</div>
        ) : (
            estacoes.map((estacao) => (
                    <div key={estacao.id} className='  justify-center border border-black p-10 rounded-3xl max-w-2xl mb-4 h-96 m-10'>
                        <h1 className='text-2xl mb-10 text-center'><span>{estacao.nome}</span></h1>
                        <div className='flex justify-center gap-10'>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold mb-8'>TEMPERATURA</p>
                                <Image className='size-24 mb-5' src={ImagemTemperatura} alt="Ícone de temperatura" />
                                <p className='font-bold'>{estacao.temperatura} °C</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold mb-8'>UMIDADE</p>
                                <Image className='size-24 mb-5' src={ImagemUmidade} alt="Ícone de umidade" />
                                <p className='font-bold'>{estacao.umidade} %</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold mb-8'>VENTO</p>
                                <Image className='size-24 mb-5' src={ImagemVento} alt="Ícone de vento" />
                                <p className='font-bold'>{estacao.vento} km/h</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold mb-8'>CHUVA</p>
                                <Image className='size-24 mb-5' src={ImagemChuva} alt="Ícone de chuva" />
                                <p className='font-bold'>{estacao.chuva} mm</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
}
