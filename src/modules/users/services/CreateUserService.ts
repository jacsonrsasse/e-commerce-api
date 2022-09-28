import { Exception } from '@shared/errors/Exception';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import HashPasswordService from './HashPasswordService';

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

        const hashPasswordService = new HashPasswordService();
        const hashedPassword = await hashPasswordService.execute({ passwordToHash: password });

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);
        return user;
    }
}
