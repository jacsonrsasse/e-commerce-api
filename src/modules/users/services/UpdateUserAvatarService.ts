import { Exception } from '@shared/errors/Exception';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequestUpdateAvatar {
    userId: string;
    avatarFilename: string;
}

/**
 * Service to update user's avatar
 */
export default class UpdateUserAvatarService {
    /**
     * Default method
     */
    public async execute({ userId, avatarFilename }: IRequestUpdateAvatar): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new Exception('User not found!');
        }

        if (user.avatar) {
            await this.deleteCurrentAvatar(user.avatar);
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);
        return user;
    }

    /**
     * Delete an avatar file
     * @param userAvatar Current avatar filename
     * @returns
     */
    private async deleteCurrentAvatar(userAvatar: string): Promise<void> {
        const userAvatarFilepath = path.join(uploadConfig.directory, userAvatar);
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilepath);

        if (!userAvatarFileExists) {
            return;
        }

        await fs.promises.unlink(userAvatarFilepath);
        return;
    }
}
