'use client';

import { useEffect, useRef, useState } from 'react';
import { Select } from '@/components/select';
import Highcharts from 'highcharts';

interface GraficoHighchartsProps {
  titulo: string;
  legenda: string;
}

const GraficoPrincipal: React.FC<GraficoHighchartsProps> = ({
  titulo,
  legenda,
}) => {
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');

    if (isClient) {
      const chart = Highcharts.chart('myChart', {
        chart: {
          type: 'spline',
          animation: Highcharts.svg,
          marginRight: 10,
          events: {
            load: function () {
              const series = this.series[0];

              if (series) {
                intervalRef.current = window.setInterval(function () {
                  const x = new Date().getTime();
                  const y = Math.random();

                  if (series) {
                    series.addPoint([x, y], true, true);
                  } else {
                    console.error('Series is undefined inside setInterval');
                  }
                }, 1000);
              }
            },
          },
        },
        title: {
          text: titulo,
        },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150,
        },
        yAxis: {
          title: {
            text: 'Temperature (°C)',
          },
        },
        series: [
          {
            name: legenda,
            data: (function () {
              const data = [];
              const time = new Date().getTime();
              for (let i = -19; i <= 0; i += 1) {
                data.push({
                  x: time + i * 1000,
                  y: Math.random(),
                });
              }
              return data;
            })(),
          },
        ],
      });

      chartRef.current = chart;

      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
      };
    }
  }, [isClient, titulo, legenda]);

  return (
    <>
      <section
        className=""
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div id="myChart" className='w-full h-full p-4'/>
        <div className='flex itens-center justify-center gap-4 text-center'>
          <Select
            estilo="flex"
            id="medida"
            label="Estação"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => {}}
            options={[
              { label: 'FATEC PROF JESSEN VIDAL', value: '1' },
              { label: 'VALE SUL', value: '2' },
              { label: 'PARQUE SANTOS DUMONT', value: '3' },
              { label: 'TECSUS', value: '4' },
              { label: 'RODOVIA PRESIDENTE DUTRA', value: '5' },
            ]}
          />
          <Select
            estilo="flex"
            id="medida"
            label="Periodo"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => {}}
            options={[
              { label: 'ULTIMOS 7 DIAS', value: '7' },
              { label: 'ULTIMO MÊS', value: '30' },
              { label: 'ULTIMO SEMESTRE', value: '180*' },
              { label: 'ULTIMO ANO', value: '360*' },
            ]}
          />
          <Select
            estilo="flex"
            id="medida"
            label="Estação"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => {}}
            options={[
              { label: 'FATEC PROF JESSEN VIDAL', value: '1' },
              { label: 'VALE SUL', value: '2' },
              { label: 'PARQUE SANTOS DUMONT', value: '3' },
              { label: 'TECSUS', value: '4' },
              { label: 'RODOVIA PRESIDENTE DUTRA', value: '5' },
            ]}
          />
        </div>
      </section>
    </>
  );
};

export default GraficoPrincipal;
