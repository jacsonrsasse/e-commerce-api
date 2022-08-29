import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

/**
 * Service to list all users
 */
export default class ListUserService {
    /**
     * Default method
     * @returns A list of users
     */
    public async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find();

        return users;
    }
}
