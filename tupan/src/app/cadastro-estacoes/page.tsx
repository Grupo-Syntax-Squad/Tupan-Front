export default function CadastroEstacoes() {
  return (
    <div className="cadastro-estacoes ">
      <section className="border border-slate-700 p-20 rounded-3xl">
        <h1 className="flex justify-center text-2xl"><span>Cadastro de nova estação</span></h1>
        <label htmlFor="nome">Nome</label>
        <input type="text" />
        <div className="flex gap-5 input-container">
          <div className="flex flex-col ">
            <label htmlFor="cep">CEP</label>
            <input type="text" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="logradouto">Logradouro</label>
            <input type="text" />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col ">
            <label htmlFor="numero">Número</label>
            <input type="text" />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="complemento">Complemento</label>
            <input type="text" />
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <p>Parâmetros de medição</p>
            <select name="parametros" className="border p-2 border-slate-700 rounded-xl" id="">
              <option value="" disabled>Selecione uma opção</option>
              <option value="">Temperatura</option>
              <option value="">Umidade</option>
              <option value="">Vento</option>
              <option value="">Chuva</option>
            </select>
          </div>
          <div></div>
          <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-0 px-6 rounded h-10 mt-5">Adicionar</button>
        </div>
        <p className="my-2">Parâmetros Adicionados</p>
        <ul className="my-2">
          <li>Umidade</li>
          <li>Temperatura</li>
        </ul>
        <div className="flex gap-5">
          <button className="bg-transparent hover:bg-lime-600 text-lime-600 font-semibold hover:text-white py-2 px-4 border border-lime-600 hover:border-transparent rounded">Cancelar</button>
          <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded">Salvar</button>
        </div>
      </section>
    </div>
  );
}