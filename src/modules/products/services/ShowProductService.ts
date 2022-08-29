import { Exception } from "@shared/errors/Exception";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequestShowProduct {
    id: string
}

/**
 * Service to list only one product
 */
export default class ShowProductService {

    /**
     * Deafult method
     */
    public async execute({ id }: IRequestShowProduct): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);

        if (!product) {
            throw new Exception("Product not found!");
        }

        return product;
    }

}