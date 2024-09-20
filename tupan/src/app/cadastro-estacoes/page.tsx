"use client";

import { Fragment, useState } from "react";

export default function CadastroEstacoes() {
  const Modal = ({ isvisible, onClose }) => {
    if (!isvisible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
          <div className="bg-white p-2 rounded-3xl">
            <section className="p-20">
              <h1 className="flex justify-center text-2xl">
                <span>Novo Parâmetro</span>
              </h1>
              <label htmlFor="nome">Nome</label>
              <input type="text" />
              <div className="gap-5 input-container">
                <div className="flex flex-col ">
                  <label htmlFor="fator">Fator</label>
                  <input type="text" />
                </div>
                <div className=" flex-col ">
                  <label htmlFor="offset">Offset</label>
                  <input type="text" />
                </div>
              </div>
              <div className=" gap-5">
                <div className="flex flex-col ">
                  <label htmlFor="unidade">Unidade</label>
                  <input type="text" />
                </div>
                <div className=" flex-col ">
                  <label htmlFor="nomejson">Nome Json</label>
                  <input type="text" />
                </div>
              </div>
              <div className="flex gap-5">
                <button
                  className="bg-transparent hover:bg-lime-600 text-lime-600 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button className="bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded">
                  Salvar
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <div className="cadastro-estacoes ">
        <section className="border border-slate-700 p-20 rounded-3xl">
          <h1 className="flex justify-center text-2xl">
            <span>Cadastro de nova estação</span>
          </h1>
          <label htmlFor="nome">Nome</label>
          <input type="text" />
          <div className="flex gap-5 input-container">
            <div className="flex flex-col ">
              <label htmlFor="cep">CEP</label>
              <input type="text" />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="numero">Número</label>
              <input type="number" />
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="logradouro">Logradouro</label>
            <input type="text" />
          </div>
          
            <div className="flex flex-col ">
              <label htmlFor="cidade">Cidade</label>
              <input type="text" />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="bairro">Bairro</label>
              <input type="text" />
            </div>
          
          <div className="flex flex-col ">
            <label htmlFor="estado">Estado</label>
            <input type="text" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="complemento">Complemento</label>
            <input type="text" />
          </div>
          <div className="flex gap-5">
            <div>
              <p>Parâmetros de medição</p>
              <select
                name="parametros"
                className="border p-2 border-slate-700 rounded-xl"
                id=""
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="">Temperatura</option>
                <option value="">Umidade</option>
                <option value="">Vento</option>
                <option value="">Chuva</option>
              </select>
            </div>
            <div></div>
            <button
              className="bg-lime-600 hover:bg-lime-800 text-white font-bold py-0 px-6 rounded h-10 mt-5"
              onClick={() => setShowModal(true)}
            >
              Cadastrar parâmetros
            </button>
          </div>
          <p className="my-2">Parâmetros Adicionados</p>
          <ul className="my-2">
            <li>Umidade</li>
            <li>Temperatura</li>
          </ul>
          <div className="flex gap-5">
            <button className="bg-transparent hover:bg-lime-600 text-lime-600 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded">
              Cancelar
            </button>
            <button className="bg-lime-600 hover:bg-lime-800 text-white font-bold py-2 px-4 rounded">
              Salvar
            </button>
          </div>
        </section>
        <Modal isvisible={showModal} onClose={() => setShowModal(false)} />
      </div>
    </Fragment>
  );
}
