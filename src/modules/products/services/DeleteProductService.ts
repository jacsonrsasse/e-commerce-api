import { Exception } from "@shared/errors/Exception";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequestDeleteProduct {
    id: string
}

/**
 * Service to delete one product
 */
export default class DeleteProductService {

    /**
     * Default method
     */
    public async execute({ id }: IRequestDeleteProduct): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);

        if (!product) {
            throw new Exception("Product not found!");
        }

        await productRepository.remove(product);
    }

}