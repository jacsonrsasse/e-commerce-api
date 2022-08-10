import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import { Exception } from '@shared/errors/Exception';

// Instância principal do express
const app = express();

// Middleware CORS, nesse cenário aceitando tudo
app.use(cors());

// Para definir que a API trabalhará com o padrão JSON
app.use(express.json());

// Define as rotas da aplicação
app.use(routes);

// Middleware para tratamento dos erros da aplicação, de forma que não precisamos
// tratar individualmente dentro dos controllers
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    // Quanto o error for uma instância da nossa classe de tratamentos, então retornaremos uma mensagem
    // customizada para o front-end
    if (error instanceof Exception) {
        return response.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        });
    }

    // Mensagem padrão de erro interno do servidor para quando não for a classe de tratamento
    return response.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
    });
});

app.listen(3333, () => {
    console.log('foi');
});
