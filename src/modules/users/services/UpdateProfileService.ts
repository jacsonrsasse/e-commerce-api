import { Exception } from '@shared/errors/Exception';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compare } from 'bcryptjs';
import HashPasswordService from './HashPasswordService';

interface IRequestUpdateProfile {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class UpdateProfileService {
    public async execute({ user_id, name, email, password, old_password }: IRequestUpdateProfile): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Exception('User not found!');
        }

        const userEmail = await usersRepository.findByEmail(email);

        if (userEmail && userEmail.id !== user.id) {
            throw new Exception('E-mail already in use');
        }

        if (password && !old_password) {
            throw new Exception('Old password is required!');
        }

        if (password && old_password) {
            const checkOldPassword = compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new Exception('Old password does not match.');
            }

            const hashPasswordService = new HashPasswordService();
            user.password = await hashPasswordService.execute({ passwordToHash: password });
        }

        user.name = name;
        user.email = email;

        await usersRepository.save(user);

        return user;
    }
}
