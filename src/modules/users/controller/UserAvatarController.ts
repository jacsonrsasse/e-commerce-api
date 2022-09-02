import { Exception } from '@shared/errors/Exception';
import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

/**
 * Users' Controller
 */
export default class UserAvatarController {
    /**
     * Update user's avatar
     */
    public async update(request: Request, response: Response): Promise<Response> {
        const filename = request.file?.filename;
        if (!filename) {
            throw new Exception('It must upload a file!');
        }
        const service = new UpdateUserAvatarService();
        const user = await service.execute({
            userId: request.user.id,
            avatarFilename: filename,
        });

        return response.json(user);
    }
}
