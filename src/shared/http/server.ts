import express from 'express';
import cors from 'cors';

// Instância principal do express
const app = express();

// Middleware CORS, nesse cenário aceitando tudo
app.use(cors());

// Para definir que a API trabalhará com o padrão JSON
app.use(express.json());

app.listen(3333, () => {
    console.log('foi');
});
