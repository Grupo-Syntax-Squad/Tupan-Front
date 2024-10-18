'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Select } from './select/select';
import { Input } from './input/input';
import { Botao } from './botao/botao';
import {
  useEquipamento,
  useCalculoEquipamento,
  Equipamento,
} from '../hooks/playground';
import {
  TermometroGit,
  BarometroGif,
  VentoGif,
  UmidadeGif,
  ChuvaGif,
} from '../../public/export';

const Playground = () => {
  const { equipamento, selecionarEquipamento } = useEquipamento();
  const { resultado, calcular } = useCalculoEquipamento(equipamento);
  const [formula, setFormula] = useState<string>('');
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

  const limparCampos = () => {
    setValor1(0);
    setValor2(0);
  };

  const formulas: {
    termometro: { [key: number]: (value: number) => number };
    barometro: (f: number, a: number) => number;
    anenometro: (v: number, t: number) => number;
    pluviometro: (p: number, d: number) => number;
    piranometro: (i: number, t: number) => number;
    higometro: (u: number, t: number) => number;
  } = {
    termometro: {
      0: (c: number) => c,
      1: (f: number) => (f - 32) * (5 / 9),
      2: (k: number) => k - 273.15,
    },
    barometro: (f: number, a: number) => f / a,
    anenometro: (v: number, t: number) => v / t,
    pluviometro: (p: number, d: number) => p / d,
    piranometro: (i: number, t: number) => i * t,
    higometro: (u: number, t: number) => u / t,
  };

  useEffect(() => {
    switch (equipamento) {
      case 'termometro':
        setFormula(
          `Resultado: ${valor1} °C = ${formulas.termometro[valor2](valor1)} °${['C', 'F', 'K'][valor2]}`
        );
        break;
      case 'barometro':
        setFormula(
          `Fórmula: P = F / A;<br />Resultado: ${valor1} N / ${valor2} m² = ${formulas.barometro(valor1, valor2)} Pa`
        );
        break;
      case 'anenometro':
        setFormula(
          `Fórmula: V = D / T;<br />Resultado: ${valor1} m / ${valor2} s = ${formulas.anenometro(valor1, valor2)} m/s`
        );
        break;
      case 'pluviometro':
        setFormula(
          `Fórmula: P = H / T;<br />Resultado: ${valor1} mm / ${valor2} h = ${formulas.pluviometro(valor1, valor2)} mm/h`
        );
        break;
      case 'piranometro':
        setFormula(
          `Fórmula: I = E * T;<br />Resultado: ${valor1} W/m² * ${valor2} s = ${formulas.piranometro(valor1, valor2)} J/m²`
        );
        break;
      case 'higometro':
        setFormula(
          `Fórmula: U = H / T;<br />Resultado: ${valor1} % / ${valor2} °C = ${formulas.higometro(valor1, valor2)} %/°C`
        );
        break;
      default:
        setFormula('');
    }
  }, [equipamento, valor1, valor2]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 w-contain mx-auto bg-white rounded-xl shadow-md space-y-4 md:w-1/2">
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

        <div className="flex justify-center items-center w-full mt-4">
          {calculando && (
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
          )}
        </div>
        <div className='flex flex-row gap-4'>
          <Botao
            label={calculando ? 'Calculando...' : 'Calcular'}
            corFundo="bg-blue-500 hover:bg-blue-700"
            corTexto="text-white"
            onClick={handleSubmit}
            disabled={calculando}
            />
            <Botao
            label='Limpar'
            corFundo='bg-red-500 hover:bg-red-700'
            corTexto='text-white'
            onClick={limparCampos}
            disabled={calculando}
            />
        </div>

      </div>

      <div className="p-6 w-full mx-auto bg-white rounded-xl shadow-md space-y-4 md:w-1/2 md:ml-4">
        {calculando && (
          <div className="mt-4 text-xl font-semibold text-center">
            Cálculo em andamento...
          </div>
        )}

        {resultado !== null && !calculando && (
          <div className="mt-4 text-xl text-center">
           <p className='font-bold' dangerouslySetInnerHTML={{ __html: formula }}></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;
