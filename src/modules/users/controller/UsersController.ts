import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

/**
 * Users' Controller
 */
export default class UsersController {
    /**
     * Returns all users
     */
    public async index(request: Request, response: Response): Promise<Response> {
        const service = new ListUserService();
        const users = await service.execute();
        return response.json(users);
    }

    /**
     * Creates a new user
     */
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const service = new CreateUserService();
        // Just for tests...
        const user = await service.execute({ name, email, password });
        return response.json(user);
    }
}
