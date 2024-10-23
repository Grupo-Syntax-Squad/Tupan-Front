'use client';

import { useEffect, useRef, useState } from 'react';
import { Select } from '@/components/select/select';
import Highcharts from 'highcharts';
import { useGetMedicoes } from '@/hooks/pegarMedicao';

interface GraficoHighchartsProps { titulo: string; legenda: string; id: string; estacao_id: number }

const LineChart: React.FC<GraficoHighchartsProps> = ({ titulo, legenda, id, estacao_id }) => {
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { medicoes, loading, error, refetch } = useGetMedicoes()
  
  let medicoesFiltered = [];
  medicoes.forEach(medicao => {
    if (medicao.estacao_parametro.estacao.id == estacao_id && medicao.estacao_parametro.parametro.nome == "Temperatura") {
      medicoesFiltered.push(medicao);
    }
  })

  // medicoesFiltered = medicoes.filter(medicao => medicao.estacao_parametro.estacao.id == estacao_id && medicao.estacao_parametro.parametro.nome == "Temperatura")

  const data = medicoesFiltered.map(medicao => [new Date(medicao.timestamp*1000).getTime(), Number(medicao.dados)]);
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');

    if (isClient && data.length >= 0 ) {
      const chart = Highcharts.chart(id, {
        chart: {
          type: 'spline',
          animation: Highcharts.svg,
          marginRight: 10,
          events: {
            load: function () {
              const series = this.series[0];

              if (series) {
                medicoesFiltered.forEach(medicao => {
                  const x = new Date(medicao.timestamp).getTime();
                  const y = medicao.dados;

                  if (series) {
                    series.addPoint([x, y], true, true);
                  } else {
                    console.error('Series is undefined inside setInterval');
                  }
                });
              }
            },
          },
        },
        title: {
          text: titulo,
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Timestamp',
          },
        },
        yAxis: {
          title: {
            text: legenda,
          },
        },
        series: [{
          name: legenda,
          data: data,
        }],
      });
      chartRef.current = chart;
    }

    return () => {
      if (chartRef.current && typeof chartRef.current.destroy === 'function') {
        chartRef.current.destroy();
      }
    };
  }, [isClient, id, data, titulo, legenda, medicoesFiltered]);

  return (
    <>
      <section className="flex w-full flex-col items-center">
        <div id={id} ref={chartRef} className="w-full h-full p-4" />
        <div className="flex itens-center justify-center gap-4 text-center">
          <Select
            estilo="flex"
            id="medida"
            label="Estação"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => { }}
            options={[
              { label: 'FATEC PROF JESSEN VIDAL', value: '1' },
              { label: 'VALE SUL', value: '2' },
              { label: 'PARQUE SANTOS DUMONT', value: '3' },
              { label: 'TECSUS', value: '4' },
              { label: 'RODOVIA PRESIDENTE DUTRA', value: '5' },
            ]} />
          <Select
            estilo="flex"
            id="medida"
            label="Periodo"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => { }}
            options={[
              { label: 'ULTIMOS 7 DIAS', value: '7' },
              { label: 'ULTIMO MÊS', value: '30' },
              { label: 'ULTIMO SEMESTRE', value: '180*' },
              { label: 'ULTIMO ANO', value: '360*' },
            ]} />
          <Select
            estilo="flex"
            id="medida"
            label="Estação"
            span=" "
            required
            value="estacaoTemp"
            onChange={() => { }}
            options={[
              { label: 'FATEC PROF JESSEN VIDAL', value: '1' },
              { label: 'VALE SUL', value: '2' },
              { label: 'PARQUE SANTOS DUMONT', value: '3' },
              { label: 'TECSUS', value: '4' },
              { label: 'RODOVIA PRESIDENTE DUTRA', value: '5' },
            ]} />
        </div>
      </section>
    </>
  );
};

export default LineChart;
