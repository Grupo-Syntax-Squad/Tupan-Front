"use client";

import { Input } from "@/components/input";
import { useFormularioParametros } from "@/hooks/formulario";
import { FormularioProps } from "@/types/interfaces";
import { Select } from "./select";
import { Toggle } from "./toggle";
import { useEditable } from "@/hooks/editar";
import Image from "next/image";
import { Botao } from "./botao";

export const FormularioAtualizacaoParametros = ({
  onSubmit,
  dados,
  initialStatus,
}: FormularioProps & { initialStatus: boolean }) => {
  const { formValues, handleChange } = useFormularioParametros(dados);
  const { isEditable, toggleEdit } = useEditable();

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <section className="bg-white dark:bg-gray-900 w-full h-full p-6 rounded-lg shadow-md">
        <div className="w-full h-full">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Parâmetro - {formValues.nome}
          </h2>
          <form action="#" onSubmit={onSubmit} className="space-y-6">
            <div className="flex flex-row gap-11">
              <Botao
                type="button"
                corTexto="text-black"
                corFundo="bg-gray-300"
                icone="bx bx-edit-alt"
                label="Habilitar Edição"
                onClick={toggleEdit}
              />
              <Toggle label="Ativo" id="ativo" initialChecked={initialStatus} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  id="nome"
                  label="Nome do Parâmetro"
                  span="*"
                  placeholder="Digite o nome do parâmetro"
                  required
                  value={formValues.nome}
                  onChange={handleChange}
                  disabled={!isEditable}
                  toggleEdit={toggleEdit}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Input
                  estilo="w-1/2"
                  id="minimo"
                  label="Valor Mínimo"
                  span="*"
                  placeholder="Insira o valor mínimo"
                  type="number"
                  required
                  value={formValues.minimo}
                  onChange={handleChange}
                  disabled={!isEditable}
                  toggleEdit={toggleEdit}
                />
                <Input
                  estilo="w-1/2"
                  id="minimoOFFSET"
                  label="Off Set Mínimo (opicional)"
                  span=" "
                  placeholder="Off Set mínimo (padrão 0)"
                  type="number"
                  required
                  value={formValues.offsetminimo}
                  onChange={handleChange}
                  disabled={!isEditable}
                  toggleEdit={toggleEdit}
                />
              </div>
              <div className="flex flex-row p-auto gap-6">
                <Input
                  estilo="w-1/2"
                  id="maximo"
                  label="Valor Máximo"
                  span="*"
                  placeholder="Insira o valor máximo"
                  type="number"
                  required
                  value={formValues.maximo}
                  onChange={handleChange}
                  disabled={!isEditable}
                  toggleEdit={toggleEdit}
                />
                <Input
                  estilo="w-1/2"
                  id="maximoOFFSET"
                  label="Off Set Máximo (opicional)"
                  span=" "
                  placeholder="Off Set máximo (padrão 0)"
                  type="number"
                  required
                  value={formValues.offsetmaximo}
                  onChange={handleChange}
                  disabled={!isEditable}
                  toggleEdit={toggleEdit}
                />
              </div>
              <div>
                <Select
                  id="medida"
                  label="Medida"
                  span="*"
                  required
                  value={formValues.medida}
                  onChange={handleChange}
                  disabled={!isEditable}
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
                  required
                  value={formValues.escala}
                  onChange={handleChange}
                  disabled={!isEditable}
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
              <div className="flex flex-col">
                <Select
                  estilo="w-full"
                  id="condicao"
                  label="Condição"
                  span="*"
                  required
                  value={formValues.condicao}
                  onChange={handleChange}
                  disabled={!isEditable}
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
                  estilo="w-full"
                  id="comparacao"
                  label="Base de Comparação"
                  span="*"
                  required
                  value={formValues.comparacao}
                  onChange={handleChange}
                  disabled={!isEditable}
                  options={[
                    { label: "Valor mínimo", value: "minimo" },
                    { label: "Valor máximo", value: "maximo" },
                    { label: "Minimo - Máximo", value: "diferencaMINMAX" },
                    { label: "Máximo - Mínimo", value: "diferencaMAXMIN" },
                    { label: "Máximo + Mínimo", value: "soma" },
                    { label: "Entre Mínimo e Máximo", value: "entre" },
                  ]}
                />
              </div>
              <div>
                <Select
                  id="tolerancia"
                  label="Tolerância da medição (opicional)"
                  required
                  value={formValues.tolerancia}
                  onChange={handleChange}
                  disabled={!isEditable}
                  options={[
                    { label: "Sem Tolerância", value: "0" },
                    { label: "Até 5 pontos acima do máximo", value: "maximo5" },
                    { label: "Até 5 pontos abaixo do minimo", value: "minimo5" },
                    { label: "Somente valores pares", value: "par" },
                    { label: "Somente valores impares", value: "impar" },
                    { label: "Somente multiplos de 2", value: "multiplo2" },
                  ]}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Descrição
              </label>
              <textarea
                id="description"
                rows={8}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Adicione uma descrição para o parâmetro"
                value={formValues.description}
                onChange={handleChange}
                disabled={isEditable}
              ></textarea>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
