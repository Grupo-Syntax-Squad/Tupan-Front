'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Select } from './select';
import { Input } from './input';
import { Botao } from './botao';
import { useEquipamento, useCalculoEquipamento, Equipamento,} from '../hooks/playground';
import { TermometroGit,  BarometroGif,  VentoGif,  UmidadeGif,  ChuvaGif} from '../../public/export';

const Playground = () => {
  const { equipamento, selecionarEquipamento } = useEquipamento();
  const { resultado, calcular } = useCalculoEquipamento(equipamento);

  const [valor1, setValor1] = useState<number>(0);
  const [valor2, setValor2] = useState<number>(0);
  const [calculando, setCalculando] = useState<boolean>(false);

  const handleSubmit = () => {
    setCalculando(true);
    setTimeout(() => {
      calcular(valor1, valor2);
      setCalculando(false);
    }, 2000);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-center">
        Playground Meteorológico
      </h1>

      {/* Select para escolha do equipamento */}
      <Select
        id="equipamento"
        label="Equipamento"
        span=""
        onChange={(e) => selecionarEquipamento(e.target.value as Equipamento)}
        value={equipamento}
        options={[
          { label: 'Termômetro', value: 'termometro' },
          { label: 'Barômetro', value: 'barometro' },
          { label: 'Higrômetro', value: 'higometro' },
          { label: 'Anemômetro', value: 'anenometro' },
          { label: 'Pluviômetro', value: 'pluviometro' },
          { label: 'Piranômetro', value: 'piranometro' },
        ]}
      />

      {equipamento === 'termometro' && (
        <div>
          <Input
            id="temperatura"
            label="Temperatura (°C)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a temperatura"
          />
          <Select
            id="escala"
            label="Escala de conversão"
            span=""
            value={String(valor2)}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            options={[
              { label: 'Celsius', value: '0' },
              { label: 'Fahrenheit', value: '1' },
              { label: 'Kelvin', value: '2' },
            ]}
          />
        </div>
      )}

      {equipamento === 'barometro' && (
        <div>
          <Input
            id="forca"
            label="Força (N)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a força"
          />
          <Input
            id="area"
            label="Área (m²)"
            type="number"
            value={valor2}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            placeholder="Digite a área"
          />
        </div>
      )}
      {equipamento === 'anenometro' && (
        <div>
          <Input
            id="velocidade"
            label="Distância percorrida (metros)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a velocidade do vento"
          />
          <Input
            id="direcao"
            label="Tempo (segundos)"
            type="number"
            value={valor2}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            placeholder="Digite a direção do vento"
          />
        </div>
      )}

      {equipamento === 'pluviometro' && (
        <div>
          <Input
            id="precipitacao"
            label="Precipitação (mm)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a precipitação"
          />
          <Input
            id="duracao"
            label="Duração (horas)"
            type="number"
            value={valor2}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            placeholder="Digite a duração"
          />
        </div>
      )}

      {equipamento === 'piranometro' && (
        <div>
          <Input
            id="irradiancia"
            label="Irradiância (W/m²)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a irradiância"
          />
          <Input
            id="tempo"
            label="Tempo (s)"
            type="number"
            value={valor2}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            placeholder="Digite o tempo"
          />
        </div>
      )}

      {equipamento === 'higometro' && (
        <div>
          <Input
            id="umidade"
            label="Umidade (%)"
            type="number"
            value={valor1}
            onChange={(e) => setValor1(parseFloat(e.target.value))}
            placeholder="Digite a umidade"
          />
          <Input
            id="temperatura"
            label="Temperatura (°C)"
            type="number"
            value={valor2}
            onChange={(e) => setValor2(parseFloat(e.target.value))}
            placeholder="Digite a temperatura"
          />
        </div>
      )}

      <div className="flex justify-center items-center mt-4">
        {calculando ? (
          <>
            <Image
              src={
                equipamento === 'termometro'
                  ? TermometroGit
                  : equipamento === 'barometro'
                    ? BarometroGif
                    : equipamento === 'anenometro'
                      ? VentoGif
                      : equipamento === 'pluviometro'
                        ? ChuvaGif
                        : equipamento === 'higometro'
                          ? UmidadeGif
                          : ''
              }
              width={500}
              height={128}
              alt="Equipamento em funcionamento"
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <Botao
        label={calculando ? 'Calculando...' : 'Calcular'}
        corFundo="bg-blue-500 hover:bg-blue-700"
        corTexto="text-white"
        onClick={handleSubmit}
        disabled={calculando}
      />

      {resultado !== null && !calculando && (
        <div className="mt-4 text-xl font-semibold text-center">
          Resultado: {resultado}
        </div>
      )}
    </div>
  );
};

export default Playground;
