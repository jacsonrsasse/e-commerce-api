# E-commerce API

Esse projeto foi desenvolvido em no ambiente WSL:Ubuntu integrado ao Windows, portanto caso esteja fazendo o clone dele para um ambiente diferente, terá que ajustar alguns pontos.

-   O arquivo `.env` deve ser criado antes de qualquer coisa. Há no projeto um arquivo de exemplo.

### ormconfig.json

-   Esse arquivo está trabalhando de forma "estática" ainda, mas futuramente será refatorado para utilizar variáveis de ambiente.
-   Há um problema com a conexão ao banco de dados por conta que precisa especificar o host. No momento, para descobrir o host do container do Postgres, é necessário rodar o comando

    > docker ps

-   Identificar o ID do container e em seguida rodar o comando

    > docker inspect ID_CONTAINER | grep IPAddress

-   Ai pegar o endereço e substituir, se necessário, no arquivo `ormconfig.json`.

## Clone em ambiente WSL

1. Após o clone, você precisará dar permissão de execução do arquivo `start.sh` ao Linux por meio do comando:

    > chmod +x start.sh

2. Verifique o arquivo `docker-compose.yml` para saber qual arquivo `Dockerfile` está sendo utilizado. Para o ambiente Ubunto é o arquivo **SEM** o sufixo `_win`.

3. Também verifique a instrução `command` dentro das especificações da imagem NodeJS, há uma específica para o ambiente Ubuntu.

    - A lógica empregada aqui é utilizar o arquivo `.sh` para rodar mais de um comando.

4. Agora para subir os containers basta rodar o comando abaixo
    > docker-compose up -d

<br>

## Clone em ambiente Windows com Docker Desktop

1. Em ambientes Windows é recomendado que o Docker Desktop esteja instalado e funcionando corretamente

2. Depois que garantir que o seu Docker Desktop está funcionando, verifique o arquivo `docker-compose.yml` para saber qual arquivo `Dockerfile` está sendo utilizado para a imagem do NodeJS. Para o ambiente Windows deve ser p arquivo **COM** o sufixo `_win`.

3. Além disso, neste mesmo arquivo verifique a instrução passada para a propriedade `command` e descomente a que for necessária para o seu ambiente.

    - A lógica empregada aqui foi utilizar um comando "start", que roda um loop infinito em um arquivo `.ts` afim de manter o container em pé e ser possível acessar o bash do mesmo, que será necessário para rodar as migrações e iniciar o servidor.

4. Agora para subir os containers basta rodar o comando abaixo
    > docker-compose up -d

<br>

## Detalhes sobre o Banco de Dados

### Habilitar a extensão UUID no Banco

<br>
Após o clone e subir os containers, primeiro verifique se a extensão `uuid_ossp` está no seu banco de dados. Se o banco foi criado a partir do container deste projeto, certamente não estará e você precisa habilitar isso para prosseguir.

1. Acesse `http://localhost:9000` e a página do PgAdmin4 será exibida. Acesse com o login e senha definidos no arquivo `.env`.

2. Vá até o banco de dados da aplicação, clique com o botão direito e vá em `Create » Extension » Selecione uuid_ossp » Confirme`

<br>

### Executar as Migrações

<br>

1. Rode o comando abaixo para listar seus containers:

> docker compose ps

-   Perceba que o comando não é o `docker-compose`, pois este não trará o nome dos serviços. Obviamente os nomes dos serviços estão definidos no arquivo `docker-compose.yml`, mas para facilitar a vida, usamos o comando especificado.
-   Deverão ser listados 3 containers. Se o container do NodeJs não estiver em pé, verifique a criação do mesmo, pode ter ocorrido algum erro.

2. Agora use o comando abaixo para acessar o container:

> docker compose exec node bash

-   Esse comando executará uma instrução no container (identificado pelo nome do serviço "node"), sendo que a instrução é a solicitação de acesso ao bash.
-   O console que estiver sendo utilizado então passará a refletir o console do container. Em caso de erro, verifique a criação do container, pode ter ocorrido algum erro.

3. Agora com o console refletindo o container, os comandos `npm run` estarão disponíveis. Você precisará então rodar os comandos:

> npm run typeorm migration:run
