import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
    /**
     * Resets user's password
     */
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;
        const service = new ResetPasswordService();

        await service.execute({ password, token });

        // no content code, everything went fine, but anything must be returned
        return response.status(204).json();
    }
}
