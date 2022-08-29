import { Exception } from '@shared/errors/Exception';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequestCreateSession {
    email: string;
    password: string;
}

interface IResponseCreateSession {
    user: User;
    // token: string;
}

/**
 * Service to create a session
 */
export default class CreateSessionsService {
    /**
     * Default method
     */
    public async execute({ email, password }: IRequestCreateSession): Promise<IResponseCreateSession> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new Exception('Incorrect E-mail/Password combination!', 401);
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new Exception('Incorrect E-mail/Password combination!', 401);
        }

        return {
            user,
        };
    }
}
