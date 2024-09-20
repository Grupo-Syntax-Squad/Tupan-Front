import Image from 'next/image';
import { tempICON, UmidadeIcon, VentoICON, chuvaICON } from '../../../public/export';

export default function Estacoes() {
    return (
        <section className='flex justify-center items-center h-screen'>
            <div className=' border border-slate-700 p-20 rounded-3xl max-w-2xl'>
                <h1 className='flex justify-center text-2xl mb-10'><span>Estação A</span></h1>
                <div className='flex mt-2 gap-10'>
                    <div className='flex flex-col'>
                        <p className='flex justify-center font-bold'>Temperatura</p>
                        <Image className='size-24 mb-5' src={tempICON} alt="Ícone de temperatura" />
                        <p className='flex justify-center'>00C</p>
                    </div>
                    <div className='flex flex-col'>
                    <p className='flex justify-center font-bold'>Umidade</p>
                        <Image className='size-24 mb-5'  src={UmidadeIcon} alt="Ícone de umidade" />
                        <p className='flex justify-center'>00%</p>
                    </div>
                    <div className='flex flex-col'>
                    <p className='flex justify-center font-bold'>Vento</p>
                        <Image className='size-24 mb-5'  src={VentoICON} alt="Ícone de vento" />
                        <p className='flex justify-center'>00km/h</p>
                    </div>
                    <div className='flex flex-col '>
                    <p className='flex justify-center font-bold'>Chuva</p>
                        <Image className='size-24 mb-5'  src={chuvaICON} alt="Ícone de chuva" />
                        <p className='flex justify-center'>00mm</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
