"use client"
import { useState } from "react";
import { Input } from "@/components/input";
import { useFormularioParametros } from "@/hooks/formulario";
// import { Botao } from "@/components/botao";
import { FormularioProps } from "@/types/interfaces";

export const Formulario = ({ onSubmit, dados }: FormularioProps) => {
  const { formValues, handleChange } = useFormularioParametros(dados)

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
                <label
                  htmlFor="medida"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Medida <span className="text-red-500">*</span>
                </label>
                <select
                  id="medida"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Selecione uma medida para o Parâmetro</option>
                  <option value="Temperatura">Temperatura</option>
                  <option value="Pressão">Pressão</option>
                  <option value="Umidade">Umidade</option>
                  <option value="Volume">Volume da chuva</option>
                  <option value="Velocidade do vento">
                    Velocidade do vento
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="medida"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Escala de medição <span className="text-red-500">*</span>
                </label>
                <select
                  id="medida"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Selecione uma escala de medição</option>
                  <option value="C">° C</option>
                  <option value="F">° F</option>
                  <option value="K">° K</option>
                  <option value="Pa">Pascal</option>
                  <option value="metroCubico">g/m³</option>
                  <option value="velocidadeVentoMS">m/s</option>
                  <option value="velocidadeVentoKH">km/h</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="medida"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Condição <span className="text-red-500">*</span>
                </label>
                <select
                  id="medida"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Selecione uma condição</option>
                  <option value="maiorQue">Se maior que</option>
                  <option value="menorQue">Se menor que</option>
                  <option value="igualA">Se = a</option>
                  <option value="diferenteDe">Se =! de</option>
                  <option value="entre">Se esta</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="medida"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Base de comparação <span className="text-red-500">*</span>
                </label>
                <select
                  id="medida"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option>Selecione um atributo a ser comparado</option>
                  <option value="minimo">Valor minimo</option>
                  <option value="maximo">Valor maximo</option>
                  <option value="diferencaMINMAX">Minimo - Maximo</option>
                  <option value="diferencaMAXMIN">Maximo - Minimo</option>
                  <option value="soma">Maximo + Minimo</option>
                  <option value="soma">entre Minimo e Maximo</option>
                </select>
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
