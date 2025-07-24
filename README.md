Projeto Champions API
🚀 Sobre o Projeto
Este projeto é uma API RESTful desenvolvida com Node.js, TypeScript e Express.js, com o objetivo de gerenciar dados de jogadores e clubes de futebol. Inicialmente desenvolvido como parte de um bootcamp, o projeto foi aprimorado com a implementação de um banco de dados PostgreSQL e o uso do Prisma ORM para persistência de dados, tornando-o mais robusto e performático.

A arquitetura do projeto segue um padrão de camadas bem definido (Controllers, Services, Repositories), garantindo a separação de responsabilidades e facilitando a manutenção e escalabilidade.

✨ Funcionalidades
Clubes (/api/clubs)
GET /api/clubs: Retorna todos os clubes cadastrados.

GET /api/clubs/:id: Retorna um clube específico pelo seu ID.

(Opcional) POST /api/clubs: Cria um novo clube.

Jogadores (/api/players)
GET /api/players: Retorna todos os jogadores cadastrados, incluindo suas estatísticas e clube associado.

GET /api/players/:id: Retorna um jogador específico pelo seu ID, com suas estatísticas e clube.

POST /api/players: Cria um novo jogador, suas estatísticas e associa (ou cria) seu clube.

DELETE /api/players/:id: Deleta um jogador específico e suas estatísticas.

PATCH /api/players/:id: Atualiza parcialmente os dados de um jogador. Este endpoint é inteligente e pode:

Atualizar as estatísticas do jogador (se o corpo da requisição contiver o objeto statistics).

Atualizar detalhes gerais do jogador (nome, nacionalidade, posição, clube), se outros campos forem fornecidos.

🛠️ Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript.

TypeScript: Superconjunto do JavaScript que adiciona tipagem estática.

Express.js: Framework web para Node.js, utilizado para construir a API.

PostgreSQL: Banco de dados relacional robusto e de código aberto.

Prisma ORM: ORM de próxima geração para interagir com o banco de dados de forma tipada e eficiente.

ESLint: Ferramenta de linting para manter a qualidade e consistência do código.

Prettier: Formatador de código para garantir um estilo consistente.

TSX / Tsup: Utilizados para execução e compilação de código TypeScript.

Cors: Middleware para habilitar Cross-Origin Resource Sharing (CORS).

dotenv: Para carregar variáveis de ambiente.

🏗️ Arquitetura do Projeto
O projeto segue um padrão de camadas para organizar o código:

src/controllers: Lida com a lógica de requisição e resposta HTTP, invocando os serviços.

src/services: Contém a lógica de negócio da aplicação, orquestrando as operações de dados através dos repositórios.

src/repositories: Responsável pela interação direta com o banco de dados via Prisma.

src/models: Define interfaces para Data Transfer Objects (DTOs) de entrada e o modelo de resposta HTTP.

src/utils: Utilitários gerais, como o http-helper para padronizar respostas HTTP.

prisma/: Contém o schema do banco de dados e os arquivos de migração gerenciados pelo Prisma.

⚙️ Como Rodar o Projeto
Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

Pré-requisitos
Node.js (versão 18 ou superior)

npm (gerenciador de pacotes do Node.js)

PostgreSQL (instalado localmente ou via Docker)

Opção 1: Docker (Recomendado para Dev)
Certifique-se de ter o Docker Desktop instalado e em execução.

Bash

docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
Opção 2: Instalação Local
Baixe e instale o PostgreSQL do site oficial da EDB: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads. Durante a instalação, defina uma senha para o usuário postgres (ex: mysecretpassword) e anote-a.

Passos de Configuração
Clone o Repositório:

Bash

git clone https://github.com/brunoplatcheck/Projeto-Champions-Di.git
cd Projeto-Champions-Di
Instale as Dependências:

Bash

npm install
Configure o Prisma e o Banco de Dados:

Inicialize o Prisma no projeto (se ainda não o fez):

Bash

npx prisma init
Crie um arquivo .env na raiz do projeto (se não existir) e adicione a string de conexão do seu banco de dados.

Se estiver usando Docker/Instalação Local com senha mysecretpassword e nome de DB padrão postgres:

Snippet de código

DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres?schema=public"
PORT=3000
ATENÇÃO: Substitua mysecretpassword pela senha real que você configurou para o seu usuário postgres.

Atualize o prisma/schema.prisma com os modelos Club, Player e Statistics conforme a estrutura do projeto.
(Exemplo de prisma/schema.prisma a ser usado no projeto):

Snippet de código

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Club {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  players Player[]
}

model Player {
  id          Int         @id @default(autoincrement())
  name        String
  clubName    String
  club        Club        @relation(fields: [clubName], references: [name])
  nationality String
  position    String
  statistics  Statistics?
}

model Statistics {
  id        Int    @id @default(autoincrement())
  Overall   Int
  Pace      Int
  Shooting  Int
  Passing   Int
  Dribbling Int
  Defending Int
  Physical  Int
  playerId  Int    @unique
  player    Player @relation(fields: [playerId], references: [id])
}
Aplique as Migrações do Banco de Dados:
Este comando vai criar as tabelas no seu banco de dados e gerar o Prisma Client.

Bash

npx prisma migrate dev --name init
Se você já tiver tabelas e quiser resetar o banco de dados (apenas em desenvolvimento!):

Bash

npx prisma migrate reset
Inicie o Servidor:

Modo de Desenvolvimento (com hot-reload):

Bash

npm run start:dev
Modo de Observação (compila e reinicia ao salvar):

Bash

npm run start:watch
Modo de Produção (compila para JS e executa):

Bash

npm run build
npm run start:dist
O servidor estará rodando em http://localhost:3000 (ou na porta definida em seu .env).

🧪 Testando a API
Você pode usar ferramentas como Postman, Insomnia ou curl para testar os endpoints da API.

Exemplo de Requisições:
Criar um Jogador
POST /api/players

JSON

{
  "name": "Lionel Messi",
  "clubName": "Inter Miami",
  "nationality": "Argentine",
  "position": "Forward",
  "statistics": {
    "Overall": 95,
    "Pace": 85,
    "Shooting": 96,
    "Passing": 91,
    "Dribbling": 98,
    "Defending": 35,
    "Physical": 70
  }
}
Obter todos os Jogadores
GET /api/players

Obter Jogador por ID
GET /api/players/1

Atualizar Estatísticas de um Jogador
PATCH /api/players/1

JSON

{
  "statistics": {
    "Overall": 96,
    "Pace": 86,
    "Shooting": 97,
    "Passing": 92,
    "Dribbling": 99,
    "Defending": 36,
    "Physical": 71
  }
}
Atualizar Detalhes de um Jogador
PATCH /api/players/1

JSON

{
  "position": "Attacking Midfielder",
  "clubName": "Paris Saint-Germain"
}
Deletar um Jogador
DELETE /api/players/1

🤝 Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma issue ou enviar um pull request.

📝 Licença
Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

