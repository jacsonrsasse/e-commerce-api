import express from 'express';
import cors from 'cors';
import routes from './routes';

// Instância principal do express
const app = express();

// Middleware CORS, nesse cenário aceitando tudo
app.use(cors());

// Para definir que a API trabalhará com o padrão JSON
app.use(express.json());

// Define as rotas da aplicação
app.use(routes);

app.listen(3333, () => {
    console.log('foi');
});
