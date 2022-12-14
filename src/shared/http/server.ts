// Esse import precisa ser o primeiro de todos mesmo
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
// Este import aqui garante que o tratamento de erros implementando a class Exception irá funcionar corretamente
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { Exception } from '@shared/errors/Exception';

// Precisa desta importação para iniciar o TypeORM
import '@shared/typeorm';

import { errors } from 'celebrate';

import uploadConfig from '@config/upload';

// Instância principal do express
const app = express();

// Middleware CORS, nesse cenário aceitando tudo
app.use(cors());

// Para definir que a API trabalhará com o padrão JSON
app.use(express.json());

// Rota fixa para a aplicação front-end acessar as imagens de forma mais simples
app.use('/files', express.static(uploadConfig.directory));

// Define as rotas da aplicação
app.use(routes);

// Uso dos errors do celebrate, se for gerado algum erro nas validações do celebrate,
// esses dados serão jogados no Express, caindo na validação de erros implementada abaixo
app.use(errors());

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

app.listen(3000, () => {
    console.log('foi');
});
