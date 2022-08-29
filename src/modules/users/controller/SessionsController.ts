import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

/**
 * Sessions Controller to manage its methods
 */
export default class SessionsController {
    /**
     * Creates a new Session
     */
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const service = new CreateSessionsService();
        const data = await service.execute({ email, password });
        return response.json(data);
    }
}
