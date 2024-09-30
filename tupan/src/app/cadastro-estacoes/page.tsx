'use client';

import { Fragment, useState, useEffect } from 'react';

export default function CadastroEstacoes() {
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
  const [parametrosSelecionados, setParametrosSelecionados] = useState([]);
  const [parametrosDisponiveis, setParametrosDisponiveis] = useState([]);

  const token = '3b2dea61e4d969c5b43b82cd9b71a614a2c30d18';


  useEffect(() => {
    const fetchParametros = async () => {
      try {
        const response = await fetch('http://localhost:8000/parametros', {
          method: 'GET',
          headers: {
            Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erro ao buscar parâmetros:', errorData);
          return;
        }

        const data = await response.json();
        setParametrosDisponiveis(data); 
      } catch (error) {
        console.error('Erro ao buscar parâmetros:', error);
      }
    };

    fetchParametros();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const novoEndereco = {
        logradouro,
        bairro,
        cidade,
        estado,
        numero,
        complemento,
        cep,
        latitude,
        longitude,
    };
  
    try {
      const enderecoResponse = await fetch('http://localhost:8000/enderecos', {
        method: 'POST',
        headers: {
          Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoEndereco),
      });
  
      if (!enderecoResponse.ok) {
        const errorData = await enderecoResponse.json();
        console.error('Erro ao cadastrar o endereço:', errorData);
        throw new Error('Erro ao cadastrar o endereço');
      }
  
      const enderecoData = await enderecoResponse.json();
  
      const novaEstacao = {
          nome,
          topico: "Tópico do broker MQTT",
          endereco: enderecoData.id,
          parametros: parametrosSelecionados,
      };
  
      const estacaoResponse = await fetch('http://localhost:8000/estacoes', {
          method: 'POST',
          headers: {
            Authorization: `Token 3b2dea61e4d969c5b43b82cd9b71a614a2c30d18`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novaEstacao),
      });
  
      if (!estacaoResponse.ok) {
        const errorData = await estacaoResponse.json();
        console.error('Erro ao cadastrar a estação:', errorData);
        throw new Error('Erro ao cadastrar a estação');
      }
  
      const data = await estacaoResponse.json();
      alert('Estação cadastrada com sucesso!');
  
      setNome('');
      setCep('');
      setNumero('');
      setLogradouro('');
      setCidade('');
      setBairro('');
      setEstado('');
      setComplemento('');
      setLatitude('');
      setLongitude('');
      setParametrosSelecionados([]);
    } catch (err) {
      console.error(err);
    }
  };
  

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
                <p>Selecione os Parâmetros:</p>
                {parametrosDisponiveis.map((parametro, index) => (
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
