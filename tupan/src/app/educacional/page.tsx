'use client';

import { MenuLateral } from '@/components/menu-lateral';
import { NavTop } from '@/components/nav-top';
import Playground from '@/components/playground';
import Link from 'next/link';

const menuData = [
  { nome: 'Estações', path: '/estacoes', icone: 'bx bx-home' },
  { nome: 'Parâmetros', path: '/parametros', icone: 'bx bxs-thermometer' },
  { nome: 'Alertas', path: '/alertas', icone: 'bx bx-alarm-exclamation' },
  { nome: 'Usuários', path: '/usuarios', icone: 'bx bx-user' },
  { nome: 'Educacional', path: '/educacional', icone: 'bx bx-book' },
  { nome: 'Logout', path: '/logout', icone: 'bx bx-log-out' },
];

const Imagens = {
  termometro: 'https://img.lojadomecanico.com.br/IMAGENS/46/448/146231/1594142659510.JPG',
  barometro: 'https://m.media-amazon.com/images/I/619Ta6u2k-L._AC_SX679_.jpg',
  higometro: 'https://media.raig.com/c/product/termohigrografo-lambrecht-520x520.jpg',
  anemometro: 'https://www.meteorologiaenred.com/wp-content/uploads/2021/07/que-es-un-anemometro-1024x648.jpg.webp',
  pluviometro: 'https://www.splabor.com.br/blog/wp-content/uploads/2022/09/Pluviometro-4.jpg',
  piranometro: 'https://energes.com.br/wp-content/uploads/2020/07/Piran%C3%B4metro.jpg',
};

const Equipamentos = [
  {
    nome: 'Termômetro',
    link: Imagens.termometro
  },
  {
    nome: 'Barômetro',
    link: Imagens.barometro
  },
  {
    nome: 'Higrômetro',
    link: Imagens.higometro
  },
  {
    nome: 'Anemômetro',
    link: Imagens.anemometro
  },
  {
    nome: 'Pluviômetro',
    link: Imagens.pluviometro
  },
  {
    nome: 'Piranômetro',
    link: Imagens.piranometro
  }
]

const Conteúdo = [
  {
    titulo: 'Como funciona uma estação meteorológica',
    texto: `Uma estação meteorológica é um conjunto de instrumentos e sensores instalados em um local específico para monitorar e registrar variáveis climáticas. Seu funcionamento
            baseia-se na coleta contínua de dados do ambiente, como temperatura, pressão atmosférica, umidade, velocidade e direção dos ventos, radiação solar, e precipitação. Esses
            dados são capturados pelos sensores e transmitidos para um sistema de processamento, onde são armazenados, analisados e exibidos. Com o avanço da tecnologia, muitas estações
            meteorológicas modernas utilizam sistemas automáticos que enviam dados em tempo real para redes de monitoramento e predição, permitindo que meteorologistas e cientistas usem 
            essas informações para prever condições climáticas, identificar padrões de tempo e monitorar o clima de forma precisa.`,
    video: '',
    id: 1,
  },
  {
    titulo: 'Importancia de uma estação meteorológica',
    texto: `As estações meteorológicas desempenham um papel fundamental em diversas áreas da sociedade. Elas fornecem dados críticos para a previsão do tempo, o que é vital para planejar
            atividades em setores como agricultura, aviação, navegação e construção civil. Além disso, são essenciais para o monitoramento de eventos climáticos extremos, como tempestades,
            furacões, e ondas de calor, ajudando a mitigar os impactos e proteger vidas. Para a agricultura, por exemplo, o controle das condições climáticas permite otimizar o plantio, a
            irrigação e a colheita. Estações meteorológicas também são importantes no estudo das mudanças climáticas, pois seus registros históricos ajudam a entender as variações de longo
            prazo no clima e seus impactos globais. Assim, seu uso vai além da previsão do tempo, contribuindo para a segurança pública, pesquisa científica e tomada de decisões estratégicas.`,
    video: '',
    id: 2,
  },
  {
    titulo: 'Equipamentos e instrumentos de medição',
    texto: `Uma estação meteorológica típica conta com uma variedade de equipamentos para medir diferentes variáveis atmosféricas. Entre os mais comuns estão:<br></br>\n\n
    <b>Termômetro</b>: Mede a temperatura do ar. Pode ser de mercúrio, álcool ou digital.<br></br>\n\n
    <img src=${Imagens.termometro} alt="Termômetro" width="300" height="200"></img><br></br>\n\n
    <b>Barômetro</b>: Instrumento utilizado para medir a pressão atmosférica. A variação na pressão indica mudanças climáticas.<br></br>\n\n
    <img src=${Imagens.barometro} alt="Barômetro" width="300" height="200"></img><br></br>\n\n
    <b>Higrômetro</b>: Mede a umidade relativa do ar, indicando a quantidade de vapor d’água presente na atmosfera.<br></br>\n\n
    <img src=${Imagens.higometro} alt="Higrômetro" width="300" height="200"></img><br></br>\n\n
    <b>Anemômetro</b>: Utilizado para medir a velocidade do vento. Muitas vezes, é acompanhado de uma biruta para indicar a direção.<br></br>\n\n
    <img src=${Imagens.anemometro} alt="Anemômetro" width="300" height="200"></img><br></br>\n\n
    <b>Pluviômetro</b>: Mede a quantidade de precipitação em um determinado período, essencial para monitorar chuvas.<br></br>\n\n
    <img src=${Imagens.pluviometro} alt="Pluviômetro" width="300" height="200"></img><br></br>\n\n
    <b>Piranômetro</b>: Equipamento usado para medir a radiação solar, ou seja, a quantidade de energia solar que atinge a superfície.<br></br>\n\n
    <img src=${Imagens.piranometro} alt="Piranômetro" width="300" height="200"></img><br></br>\n\n
    Esses equipamentos trabalham de forma integrada, fornecendo uma visão completa do ambiente atmosférico em um local específico.<br></br>`,
    id: 3,
  },
  {
    titulo: 'Como fazer as medições',
    texto: `Medir a temperatura é como verificar o "humor" do ar! Para isso, usamos o termômetro que nos ajuda a saber se o ar está quente ou frio.
    <br><br/><li>Como funciona?</li></br> O termômetro contém um líquido que sobe ou desce dependendo da temperatura. Quando está calor, o líquido sobe porque se expande, e quando está frio, ele desce.
    Fórmula para conversão de temperatura: Dependendo do termômetro, ele pode medir em graus Celsius (°C) ou Fahrenheit (°F). Para converter entre eles, usamos a fórmula mágica:
    <br></br>
    °𝐹 = ( °𝐶 × 1,8) + 32<br></br>
    Quer transformar de Fahrenheit para Celsius? Aqui vai a fórmula inversa:<br></br>
    °C = ( °F - 32) / 1,8<br></br>
    Então, se você medir 30°C com o termômetro, usando a fórmula, podemos saber que isso é equivalente a 86°F! Fácil, não é?<br></br>
    <strong>Como fazer a medição da pressão atmosférica:</strong><br></br>
    A pressão atmosférica é como o peso do ar empurrando tudo ao nosso redor. Embora não possamos ver o ar, ele está sempre lá, nos abraçando! Para medir esse abraço invisível, usamos um barômetro.
    <br><br/><li>Como funciona?</li></br> O barômetro mede a força que o ar exerce sobre ele. Quando o tempo está bom, a pressão é mais alta; quando uma tempestade está chegando, a pressão cai.
    <br><br/><li>Fórumla para calcular a pressão</li></br> A pressão atmosférica pode ser medida em diferentes unidades, como Pascais (Pa) ou milímetros de mercúrio (mmHg). O cálculo básico da pressão é dado pela famosa fórmula de pressão:
    <br></br>
    𝑃 = 𝐹 / 𝐴<br></br>
    Onde:<br></br>
    P é a pressão, F é a força (em Newtons), A é a área (em metros quadrados).<br></br>
    Por exemplo, se uma força de 100 N é aplicada em uma área de 2 metros quadrados, a pressão será:<br></br>
    𝑃 = 100 / 2 = 50Pa<br></br>
    Isso significa que a pressão é de 50 Pascals!<br></br>
    <strong>Como fazer a medição da umidade relativa:</strong><br></br>
    A umidade é como medir o "suor" do ar. Quando o ar está cheio de vapor d’água, dizemos que está úmido. Para descobrir o quão úmido está, usamos o higrômetro.<br>
    <br/><li>Como funciona?</li></br>O higrômetro compara a quantidade de vapor d'água no ar com a quantidade máxima que o ar pode "segurar" em determinada temperatura. Esse valor é expresso em porcentagem.
    <br><br/><li>Fórmula da umidade relativa:</li></br> A umidade relativa do ar é calculada assim: <br></br>(Quantidade de vapor d´água no ar / Quantidade maxima que o ar pode conter) x 100 <br></br>
    Se a umidade relativa for 100%, isso significa que o ar está saturado, como se estivesse "cheio" e não conseguisse segurar mais vapor d’água. Já um valor baixo de umidade, como 30%, indica que o ar está bem seco! <br></br>
    <strong>Como fazer a medição da velocidade do vento:</strong><br></br>
    Agora, vamos medir o "sopro" do vento! Para isso, usamos um instrumento chamado anemômetro. Ele nos diz o quão rápido o vento está soprando.
    <br><br/><li>Como funciona?</li></br>
    O anemômetro tem pequenas hélices que giram quando o vento passa por elas. Quanto mais rápido o vento, mais rápido as hélices giram.
    <br><br/><li>Fórmula para calcular a velocidade do vento:</li></br>
    A velocidade do vento geralmente é medida em metros por segundo (m/s). Se o anemômetro registrar que as hélices giraram 10 metros em 2 segundos, a velocidade do vento será:
    <br></br>𝑉 = 𝐷 / t
    <br></br>Onde:
    V é a velocidade, D é a distância percorrida (10 metros, no exemplo), t é o tempo (2 segundos).
    Assim:<br></br>
    𝑉 = 10 / 2 = 5m/s<br></br>
    Isso significa que o vento está soprando a 5 metros por segundo!<br></br>
    <strong>Como fazer a medição da precipitação (chuva):</strong><br></br>
    Agora, imagine medir o quanto choveu! Para isso, usamos um pluviômetro, um pequeno balde que "bebe" a água da chuva e nos mostra quanto ela caiu.
    <br><br/><li>Como funciona?</li></br>
    O pluviômetro coleta a água da chuva e mede em milímetros (mm). Se ele registrar 10 mm, isso significa que 10 litros de água caíram por metro quadrado.
    <br><br/><li>Fórmula da precipitação:</li></br>A precipitação é calculada da seguinte forma:<br></br>
    𝑃 = Volume de água (L) / Área (m²)<br></br>
    Por exemplo, se em um terreno de 1 metro quadrado caírem 20 litros de água, a precipitação será:<br></br>
    𝑃 = 20 / 1 = 20 mm<br></br>
    <strong>Como fazer a medição da radiação solar</strong><br></br>
    Por fim, vamos medir a energia do Sol que chega até a Terra. Para isso, usamos o piranômetro, um sensor que calcula a intensidade da luz solar.
    <br><br/><li>Como funciona?</li></br>
    O piranômetro tem uma superfície sensível à luz solar. Quando a luz atinge o sensor, ele calcula a quantidade de energia solar em watts por metro quadrado (W/m²).
    <br><br/><li>Fórmula da radiação solar:</li></br> A radiação solar é medida como a energia por unidade de área, e uma fórmula simples pode ser usada para calcular a energia recebida:
    <br></br> 𝐸 = 𝑄 / 𝐴
    <br></br>
    Onde: E é a energia solar por unidade de área (W/m²), Q é a quantidade de energia (em Joules), A é a área. 
    <br></br>Com essa medição, podemos saber quanta energia o Sol está nos dando, o que é útil, por exemplo, para quem usa painéis solares`,
    id: 4,
  },
  {
    titulo: 'Sobre o projeto Tupan',
    texto: `Nosso projeto, Tupã, foi criado para tornar o monitoramento meteorológico acessível e eficiente, utilizando estações de baixo custo. Esse sistema coleta dados importantes sobre o clima, 
            como a direção e velocidade do vento, quantidade de chuva, umidade, temperatura e pressão atmosférica, tudo enviado diretamente por sensores. O sistema guarda todas as informações para 
            que seja possível criar relatórios e dashboards que mostram as medições e o histórico das condições climáticas. Além disso, ele é capaz de enviar alertas em situações de risco, como quando
            há leituras de condições extremas que ultrapassam os limites conhecidos para a região. <br></br>O Tupã não apenas monitora o clima, mas também pode crescer com o tempo! Outros sensores podem
            ser facilmente adicionados, trazendo mais informações úteis à estação meteorológica. Uma parte importante do nosso sistema é ajudar a difundir o conhecimento: por isso, ele também oferece 
            explicações sobre os cálculos e conceitos matemáticos usados nas medições, facilitando o aprendizado.<br></br> As estações meteorológicas são fundamentais para saber o que está acontecendo
            com o clima, seja em uma cidade ou em uma região maior. Elas ajudam a prever desastres naturais e, com isso, contribuem para reduzir danos causados por chuvas intensas, deslizamentos e até
            problemas de saúde. Com o sistema Tupã, recebemos dados atualizados periodicamente, garantindo um monitoramento preciso. Se houver risco à segurança pública, o sistema envia alertas rapidamente, 
            permitindo que as autoridades tomem as decisões necessárias com mais tempo e precisão.<br></br>
            Além disso, Tupã gera um histórico completo das condições climáticas locais, fornecendo informações valiosas sobre o impacto do clima e ajudando a entender possíveis mudanças no ambiente ao longo do tempo.
            <br></br>Desenvolvemos o projeto Tupã com muito cuidado e dedicação, aqui na Fatec de São José dos Campos, no curso de Desenvolvimento de Software, em 2024. Quer conhecer mais? <a href='https://github.com/Grupo-Syntax-Squad/Tupan' target="_blank">Clique aqui e veja tudo o que estamos fazendo!</a>`,
    id: 5,
  },
  {
    titulo: 'Playgroung',
    texto: '',
    id: 6,
  },
];

const Educacional = () => {
  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="w-screen flex bg-gray-100 flex">
    {/* Menu lateral ocupando a lateral esquerda */}
    <div className="w-fit pr-4 min-h-screen">
      <MenuLateral menuData={menuData} />
    </div>

    {/* Conteúdo principal ocupando o resto da tela */}
    <div className="w-full h-screen overflow-auto flex pr-4 flex-col gap-4">
      {/* Barra superior ocupando a parte superior da tela */}
      <NavTop nome="" path="Educacional" />

      {/* Barra de conteúdo */}
      <section className="">
        <div className="flex flex-col rounded gap-4 sm:flex-row sm:gap-6 justify-center">
          {Conteúdo.map((conteudo) => (
            <Link
              key={conteudo.id}
              onClick={() => scrollToSection(conteudo.id)}
              className="text-indigo-400 hover:text-indigo-700 transition-colors p-2 rounded duration-300 text-md sm:text-md font-semibold cursor-pointer" href={''}            >
              {conteudo.titulo}
            </Link>
          ))}
        </div>
      </section>

      {/* Conteúdo */}
      {Conteúdo.map((conteudo) => (
        <section key={conteudo.id} id={conteudo.id.toString()} className="w-full max-h-90 flex-row p-6">
          <h3 className="text-green-600">{conteudo.titulo}</h3>
          <br />
          <p
            className="indent-20"
            dangerouslySetInnerHTML={{ __html: conteudo.texto }}
          />
          {conteudo.id === 6 ? (
            <div className="flex flex-col gap-4 p-4">
              <Playground />
            </div>
          ) : null}
        </section>
      ))}
    </div>
  </div>
);
};

export default Educacional;