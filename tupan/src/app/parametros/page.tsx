'use client';
import { MenuLateral } from '@/components/menu/lateral';
import { Tabela } from '@/components/tabela/tabela-parametros';
import { Formulario } from '@/components/formularios/parametros/formulario-parametros';
import { NavTop } from '@/components/nav-top';
import { useGetParametros } from '@/hooks/parametros/receberParametro';
import { useToken } from '@/hooks/token';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/logout', icone: 'bx bx-log-out' },
];

const colunas = [
  { label: 'Parâmetro', acessor: 'nome' },
  { label: 'Data de Criação', acessor: 'date' },
  { label: 'Status', acessor: 'status' },
];

export default function Parametros() {
  const token = useToken() || '';
  const { parametros, loading, error, refetch } = useGetParametros();
  const [dadosGrafico, setDadosGrafico] = useState({ labels: [], datasets: [] });

  const dados = parametros.map((parametro) => ({
    nome: parametro.nome,
    date: new Date(parametro.criado).toLocaleDateString(),
    status: 'Ativado',
  }));

  const handleSubmit = () => {
    refetch();
  };

  useEffect(() => {
    console.log("Parâmetros:", parametros); // Verificar se os parâmetros estão corretos
    const labels = [...new Set(parametros.map((parametro) => parametro.unidade))]; // Usando unidade
    const counts = labels.map(
      (label) => parametros.filter((parametro) => parametro.unidade === label).length // Usando unidade
    );
  
    setDadosGrafico({
      labels,
      datasets: [
        {
          label: 'Quantidade de Parâmetros por Unidade',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });
  
    console.log("Dados do Gráfico:", {
      labels,
      datasets: [
        {
          label: 'Quantidade de Parâmetros por Unidade',
          data: counts,
        },
      ],
    });
  }, [parametros]);
  
  

  return (
    <div className="w-screen flex bg-gray-100">
      <div className="w-fit pr-4 min-h-screen">
        <MenuLateral menuData={menuData} />
      </div>

      <div className="w-full flex pr-4 flex-col gap-4">
        <NavTop nome="Usuário" path="Parâmetros" />

        <div className="flex gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {parametros.length === 0 && !loading && !error ? (
            <div className="w-full">
              <p className="text-center">Sem parâmetros cadastrados!</p>
              <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
            </div>
          ) : (
            <>
              <div className="w-1/2">
                <Tabela colunas={colunas} dados={dados} />

                {/* Gráfico de Parâmetros */}
                <div className="mt-8 h-1/3">
                  <h2 className="text-center text-xl mb-4">Distribuição dos Parâmetros por Medida</h2>
                  <Bar data={dadosGrafico} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>

              <div className="flex-1">
                <Formulario onSubmit={handleSubmit} dados={{}} initialStatus={true} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
