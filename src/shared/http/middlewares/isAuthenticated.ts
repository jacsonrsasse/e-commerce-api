import { Exception } from '@shared/errors/Exception';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

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
        const decodedToken = verify(token, authConfig.jwt.secret);
        return next();
    } catch {
        throw new Exception('Invalid JWT Token!');
    }
}
