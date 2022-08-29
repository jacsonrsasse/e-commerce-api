import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

/**
 * Service to list all products
 */
export default class ListProductService {
    /**
     * Default method
     * @returns A list of products
     */
    public async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository);
        const products = await productRepository.find();
        return products;
    }
}
