import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequestCreateUser {
    name: string;
    email: string;
    password: string;
}

/**
 * Service to create users
 */
export default class CreateUserService {
    /**
     * Default method
     */
    public async execute({ name, email, password }: IRequestCreateUser): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailUsed = await usersRepository.findByEmail(email);

        if (emailUsed) {
            throw new Exception('E-mail address already used!');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);
        return user;
    }
}
