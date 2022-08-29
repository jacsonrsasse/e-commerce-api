import { Request, Response } from 'express';

import ListProductService from '../services/ListProductService';

export default class ProductsController {
    public async index(request: Request, response: Response) {
        const service = new ListProductService();

        const products = service.execute();

        return response.json(products);
    }
}
