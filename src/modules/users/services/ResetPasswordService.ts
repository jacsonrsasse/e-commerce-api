import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { isAfter, addHours } from 'date-fns';
import HashPasswordService from './HashPasswordService';

interface IRequestResetPassword {
    token: string;
    password: string;
}

/**
 * Service to reset users' password
 */
export default class ResetPasswordService {
    /**
     * Default method
     */
    public async execute({ token, password }: IRequestResetPassword): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new Exception('User Token does not exist.');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new Exception('User does not exist.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new Exception('Token expired.');
        }

        const hashPasswordService = new HashPasswordService();
        user.password = await hashPasswordService.execute({ passwordToHash: password });

        await usersRepository.save(user);
    }
}
