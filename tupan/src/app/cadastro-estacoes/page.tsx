'use client';

import { useCreateEstacao } from '@/hooks/adicionarEstacao';
import { useGetParametros } from '@/hooks/parametros/receberParametro';
import { Fragment, useState, useEffect } from 'react';


export default function CadastroEstacoes() {
  const { submitEstacaoComEndereco, loading, error, success } = useCreateEstacao();
  const { parametros, loading: loadingParametros, error: errorParametros, refetch } = useGetParametros();

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [cidade, setCidade] = useState('');
  const [bairro, setBairro] = useState('');
  const [estado, setEstado] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [complemento, setComplemento] = useState('');
  const [mac_address, setMac_address] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [parametrosSelecionados, setParametrosSelecionados] = useState([]);
  
  const dados = parametros.map((parametro) => ({
    nome: parametro.nome,
    date: new Date(parametro.criado).toLocaleDateString(),
    status: 'Ativado',
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const estacao = {
      nome,
      topico: mac_address,
      ativo,
      criado: new Date().toLocaleDateString(),
      modificado: new Date().toLocaleDateString()
    }

    const novoEndereco = {
      logradouro,
      bairro,
      cidade,
      estado,
      numero: Number(numero),
      complemento,
      cep,
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    submitEstacaoComEndereco(estacao, novoEndereco);

    alert('Estação cadastrada com sucesso!');

    // setNome('');
    // setCep('');
    // setNumero('');
    // setLogradouro('');
    // setCidade('');
    // setBairro('');
    // setEstado('');
    // setComplemento('');
    // setLatitude('');
    // setLongitude('');
    // setMac_address('');
    // setParametrosSelecionados([]);
  }



  const handleParametroChange = (parametro) => {
    if (parametrosSelecionados.includes(parametro)) {
      setParametrosSelecionados(
        parametrosSelecionados.filter((p) => p !== parametro)
      );
    } else {
      setParametrosSelecionados([...parametrosSelecionados, parametro]);
    }
  };

  return (
    <Fragment>
      <div className='flex justify-center m-auto'>
        <div className="flex justify-center cadastro-estacoes">
          <section className="border border-black p-20 rounded-3xl">
            <h1 className="flex justify-center text-2xl">
              <span>Cadastro de nova estação</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
              <div className="flex gap-5 input-container">
                <div className="flex flex-col">
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="number"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="numero">Número</label>
                  <input
                    type="number"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  type="text"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="mac">Mac Address</label>
                <input
                  type="text"
                  value={mac_address}
                  onChange={(e) => setMac_address(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <p>Selecione os Parâmetros:</p>
                {parametros.map((parametro, index) => (
                  <div key={index} className='flex'>
                    <label>{parametro.nome}</label>{' '}
                    <input
                      type="checkbox"
                      value={parametro.id}
                      onChange={() => handleParametroChange(parametro.id)}
                      checked={parametrosSelecionados.includes(parametro.id)}
                      className='mt-3 ml-3 checkbox-bolinha'
                    />

                  </div>
                ))}
              </div>
              <div className="flex gap-5">

                <button
                  type="submit"
                  className="bg-transparent hover:bg-lime-600 text-lime-600 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded m-auto"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </Fragment>
  );
}
