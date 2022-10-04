import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
    /**
     * Creates a new user
     */
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const service = new SendForgotPasswordEmailService();

        await service.execute({ email });
        // no content code, everything went fine, but anything must be returned
        return response.status(204).json();
    }
}
