import Image from 'next/image';
import ImagemTemperatura from '../../assets/temperatura.png';
import ImagemUmidade from '../../assets/umidade.png';
import ImagemVento from '../../assets/vento.png';
import ImagemChuva from '../../assets/chuva.png';

export default function Estacoes() {
    return (
        <section className='flex justify-center items-center h-screen'>
            <div className=' border border-slate-700 p-20 rounded-3xl max-w-2xl'>
                <h1 className='flex justify-center text-2xl mb-10'><span>Estação A</span></h1>
                <div className='flex mt-2 gap-5'>
                    <div className='flex flex-col'>
                        <Image className='size-24 mb-5' src={ImagemTemperatura} alt="Ícone de temperatura" />
                        <p className='flex justify-center'>00C</p>
                    </div>
                    <div className='flex flex-col'>
                        <Image className='size-24 mb-5'  src={ImagemUmidade} alt="Ícone de umidade" />
                        <p className='flex justify-center'>00%</p>
                    </div>
                    <div className='flex flex-col'>
                        <Image className='size-24 mb-5'  src={ImagemVento} alt="Ícone de vento" />
                        <p className='flex justify-center'>00km/h</p>
                    </div>
                    <div className='flex flex-col'>
                        <Image className='size-24 mb-5'  src={ImagemChuva} alt="Ícone de chuva" />
                        <p className='flex justify-center'>00mm</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
