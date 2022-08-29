import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';

import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

/**
 * Product's Controller
 */
export default class ProductsController {
    /**
     * Index method, return all products
     * @param request
     * @param response
     * @returns
     */
    public async index(request: Request, response: Response): Promise<Response> {
        const service = new ListProductService();
        const products = await service.execute();
        return response.json(products);
    }

    /**
     * Show product method, return the request product
     * @param request
     * @param response
     * @returns
     */
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new ShowProductService();
        const product = await service.execute({ id });
        return response.json(product);
    }

    /**
     * Create product method, creates a new product
     * @param request
     * @param response
     * @returns
     */
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;
        const service = new CreateProductService();
        const product = await service.execute({ name, price, quantity });
        return response.json(product);
    }

    /**
     * Update product method
     * @param request
     * @param response
     * @returns
     */
    public async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, price, quantity } = request.body;
        const service = new UpdateProductService();
        const product = await service.execute({ id, name, price, quantity });
        return response.json(product);
    }

    /**
     * Delete product service
     * @param request
     * @param response
     * @returns
     */
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const service = new DeleteProductService();
        service.execute({ id });
        return response.json({});
    }
}
