<h1 align="center"> Tupã </h1>

> [!TIP]
Este repositório é dedicado ao projeto "Tupã", um sistema desenvolvido para a coleta e análise de dados meteorológicos. Ele abrange tanto a montagem quanto a configuração de uma estação meteorológica equipada com diversos sensores, além de um sistema que processa e interpreta os dados enviados pela estação. Esses dados podem ser analisados em gráficos e tabelas, com suporte para visualização em dispositivos desktop, web e mobile.
Em especial, este repositório em questão, é destinado à toda a parte Front-End da aplicação.

> [!NOTE]
> Aplicação desenvolvida pela equipe: SyntaxSquad, composta por alunos do 4º semestre, do tecnólogo em Desenvolvimento de Software Multiplataforma, na FATEC Profº Jessen Vidal - São José dos Campos, SP, 2024 :rocket:


### :hammer_and_wrench: Tecnologias

As seguintes tecnologias e ferramentas foram utilizadas no Front-End: 

<h4 align="left">
 <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-2f74c0?style=for-the-badge&logo=TypeScript&logoColor=white" alt ='TypeScript'target="_blank"></a>
 <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt='NextJS' target="_blank"></a>
 <a href="https://nodejs.org/pt-br" target="_blank"><img src="https://img.shields.io/badge/-Node-57a746?style=for-the-badge&logo=nodedotjs&logoColor=white" alt='NodeJS' target="_blank"></a>
 <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/tailwind-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt='TailwindCSS' target="_blank"></a>
 <a href="https://jestjs.io/pt-BR/" target="_blank"><img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" target="_blank"></a>
</h4>

### :gear: Como rodar

É possível rodar localmente o projeto, seguindo o passo a passo abaixo:

- Tutorial para rodar o projeto

Com o [Node](https://nodejs.org/en/) instalado em sua máquina, utilize estes comandos em um terminal:

>[!NOTE]
>Este exemplo é para utilização com Npm

```bash
# Baixe ou clone este repositório
$ git clone https://github.com/Grupo-Syntax-Squad/Tupan.git

# Acesse a pasta, instale as dependências e inicie o projeto
$ cd Tupan-Front

# caso queira intalar o husky:
$ npm i

# se não quiser o husky, continue daqui:
$ cd tupan
$ npm i
$ npm run dev
```

A aplicação inciará localmente na porta 3000. Use o navegador para acessar o link [http://localhost:3000](http://localhost:3000) e executar as funcionalidades da aplicação.

### Explicação da estrutura das pastas

<div align="center">

| Pasta                                    | Definição                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| :open_file_folder: src/public/           | Arquivos públicos do projeto acessível ao público geral por meio de um servidor web         |
| :open_file_folder: src/assets            | Arquivos visuais (imagens, ícones, fontes...)                                               |
| :open_file_folder: src/components        | Código fonte dos componentes do projeto (botões, rodapés, cabeçalhos, barra de navegação..) |
| :open_file_folder: src/global            | Arquivos com configurações que impactam todo o projeto (tema, estilos...)                   |
| :open_file_folder: src/interfaces        | Arquivos com as interfaces utilizadas e compartilhada entre componentes e páginas           |
| :open_file_folder: src/pages             | Código fonte das páginas do projeto                                                         |
| :open_file_folder: src/                  | Código fonte do projeto                                                                     |
| :page_facing_up: package.json            | Arquivo usado para gerenciar as dependências do projeto, scripts e versões                  |

</div>
