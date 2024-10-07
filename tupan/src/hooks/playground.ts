import { useState } from 'react';

export type Equipamento =  | 'termometro'  | 'barometro'  | 'higometro'
                           | 'anenometro'  | 'pluviometro'| 'piranometro';

export const useEquipamento = () => {
  const [equipamento, setEquipamento] = useState<Equipamento>('termometro');

  const selecionarEquipamento = (novoEquipamento: Equipamento) => {
    setEquipamento(novoEquipamento);
  };

  return { equipamento, selecionarEquipamento };
};

export const useCalculoEquipamento = (equipamento: Equipamento) => {
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = (valor1: number, valor2?: number) => {
    
    if (equipamento === 'termometro') {      
      if (valor2 === 1) {
        setResultado((valor1 * 9) / 5 + 32); // Celsius para Fahrenheit
      } else if (valor2 === 2) {
        setResultado(valor1 + 273.15); // Celsius para Kelvin
      } else {
        setResultado(valor1); // Já está em Celsius
      }


    } else if (equipamento === 'barometro') {
      if (valor2) {
        setResultado(valor1 / valor2); // valor1 = Força, valor2 = Área
      }


    } else if (equipamento === 'higometro') {
      
      if (valor2) {
        setResultado((valor1 / valor2) * 100); // Umidade em %
      }


    } else if (equipamento === 'anenometro') {
      if (valor2 && valor2 != 1){
        setResultado(valor1 / valor2); 
      }
      else{
        setResultado(valor1)
      }


    } else if (equipamento === 'pluviometro') {
      if (valor2 && valor2 != 1){
        setResultado(valor1 / valor2) // valor1 = volume de água, valor2 = Area
      }
      else{
        setResultado(valor1);
      }


    } else if (equipamento === 'piranometro') {
      // Radiação solar
      setResultado(valor1); // valor1 seria a radiação medida
    }
  };

  return { resultado, calcular };
};
