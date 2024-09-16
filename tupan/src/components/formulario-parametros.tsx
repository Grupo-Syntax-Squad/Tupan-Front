"use client";

import { Input } from "@/components/input";
import { useFormularioParametros } from "@/hooks/formulario";
// import { Botao } from "@/components/botao";
import { FormularioProps } from "@/types/interfaces";
import { Select } from "./select";

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange } = useFormularioParametros(dados);

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <section className="bg-white dark:bg-gray-900 shadow-md sm:rounded-lg">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Crie um novo parâmetro
          </h2>
          <form action="#" onSubmit={onSubmit}>
            <div className="w-full mb-4">
              <Input
                id="nome"
                label="Nome do Parâmetro"
                span="*"
                placeholder="Digite o nome do parâmetro"
                required
                value={formValues.nome}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <Input
                  id="minimo"
                  label="Valor Mínimo"
                  span="*"
                  placeholder="Insira o valor mínimo para o parâmetro"
                  type="number"
                  required
                  value={formValues.minimo}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <Input
                  id="maximo"
                  label="Valor Maximo"
                  span="*"
                  placeholder="Insira o valor maximo para o parâmetro"
                  type="number"
                  required
                  value={formValues.maximo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Select
                  id="medida"
                  label="Medida"
                  span="*"
                  required={true}
                  value={formValues.medida}
                  onChange={handleChange}
                  options={[
                    { label: "Temperatura", value: "Temperatura" },
                    { label: "Pressão", value: "Pressão" },
                    { label: "Umidade", value: "Umidade" },
                    { label: "Volume da chuva", value: "Volume" },
                    {
                      label: "Velocidade do vento",
                      value: "Velocidade do vento",
                    },
                  ]}
                />
              </div>
              <div>
                <Select
                  id="escala"
                  label="Escala de medição"
                  span="*"
                  required={true}
                  value={formValues.escala}
                  onChange={handleChange}
                  options={[
                    { label: "° C", value: "C" },
                    { label: "° F", value: "F" },
                    { label: "° K", value: "K" },
                    { label: "Pascal", value: "Pa" },
                    { label: "g/m³", value: "metroCubico" },
                    { label: "m/s", value: "velocidadeVentoMS" },
                    { label: "km/h", value: "velocidadeVentoKH" },
                  ]}
                />
              </div>
              <div>
                <Select
                  id="condicao"
                  label="Condição"
                  span="*"
                  required={true}
                  value={formValues.condicao}
                  onChange={handleChange}
                  options={[
                    { label: "Se menor que", value: "minimo" },
                    { label: "Se maior que", value: "maximo" },
                    { label: "Se diferente de", value: "diferencaMINMAX" },
                    { label: "Se igual ao", value: "diferencaMAXMIN" },
                    { label: "Se está entre", value: "soma" },
                  ]}
                />
              </div>
              <div>
                <Select
                  id="comparacao"
                  label="Base de Comparação"
                  span="*"
                  required={true}
                  value={formValues.comparacao}
                  onChange={handleChange}
                  options={[
                    { label: "Valor minimo", value: "minimo" },
                    { label: "Valor maximo", value: "maximo" },
                    { label: "Minimo - Maximo", value: "diferencaMINMAX" },
                    { label: "Maximo - Minimo", value: "diferencaMAXMIN" },
                    { label: "Maximo + Minimo", value: "soma" },
                    { label: "entre Minimo e Maximo", value: "entre" },
                  ]}
                />
              </div>
            </div>
            <div className="mt-4 sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descrição
              </label>
              <textarea
                id="description"
                rows={8}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Adicione uma descrição para o parâmetro"
                value={formValues.description}
                onChange={handleChange}
              ></textarea>
            </div>
            {/* <Botao
              label="Add product"
              corTexto="text-white"
              corFundo="bg-primary-700 hover:bg-primary-800"
              type="submit"
            /> */}
          </form>
        </div>
      </section>
    </>
  );
};
