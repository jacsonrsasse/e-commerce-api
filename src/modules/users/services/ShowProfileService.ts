import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequestShowProfile {
    user_id: string;
}

export default class ShowProfileService {
    public async execute({ user_id }: IRequestShowProfile): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Exception('User not found!');
        }

        return user;
    }
}
