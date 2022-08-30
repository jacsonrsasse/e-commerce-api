import { Exception } from '@shared/errors/Exception';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

/**
 * Middleware function to verify if the token is valid
 */
export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Exception('JWT Token is missing!');
    }

    const [bearer, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret) as ITokenPayload;
        const { sub } = decodedToken;

        /**
         * Toda requisição para rotas que utilizarem este middleware, terão em seu
         * objeto Request, o ID do usuário que veio no payload do token, desta forma
         * essa informação acaba sendo transferida por toda a aplicação.
         *
         * Para que functione corretamente, o objeto foi "sobrescrito". Vide a pasta
         * '@types/express'
         */
        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new Exception('Invalid JWT Token!');
    }
}
