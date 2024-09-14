export default function CadastroEstacoes() {
  return (
    <div className="cadastro-estacoes">
      <h1><span>Cadastro de nova estação</span></h1>
      <label htmlFor="nome">Nome</label>
      <input type="text" />
      <label htmlFor="cep">CEP</label>
      <input type="text" />
      <label htmlFor="logradouto">Logradouro</label>
      <input type="text" />
      <label htmlFor="numero">Número</label>
      <input type="text" />
      <label htmlFor="complemento">Complemento</label>
      <input type="text" />
      <p>Parâmetros de medição</p>
      <button>Adicionar</button>
      <select name="" id=""></select>
      <p>Parâmetros Adicionados</p>
      {/* Adicionar os parâmetros */}
      <button className="cancelar">Cancelar</button>
      <button className="salvar">Salvar</button>
    </div>
  );
}
