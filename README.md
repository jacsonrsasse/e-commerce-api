# E-commerce API

Esse projeto foi desenvolvido em no ambiente WSL:Ubuntu integrado ao Windows, portanto caso esteja fazendo o clone dele para um ambiente diferente, terá que ajustar alguns pontos.

## Clone em ambiente WSL

Após o clone, você precisará dar permissão de execução do arquivo `start.sh` ao Linux por meio do comando:

> chmod +x start.sh

Depois disso, basta subir os containers com o comando

> docker-compose up -d

## Clone em ambiente Windows com Docker Desktop

 - A fazer...

## Variáveis de ambiente
 - Para ambientes de desenvolvimento/testes, é possível utilizar o arquivo `.env.example`, apenas renomeando-o.

   ### ormconfig.json

   - Esse arquivo está trabalhando de forma "estática" ainda, mas futuramente será refatorado para utilizar variáveis de ambiente.
   - Há um problema com a conexão ao banco de dados por conta que precisa especificar o host. No momento, para descobrir o host do container do Postgres, é necessário rodar o comando

   > docker ps

   - Identificar o ID do container e em seguida rodar o comando

   > docker inspect ID_CONTAINER | grep IPAddress

   - Ai pegar o endereço e substituir, se necessário, no arquivo `ormconfig.json`.
