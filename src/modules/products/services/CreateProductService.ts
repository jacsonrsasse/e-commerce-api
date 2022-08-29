import { Exception } from "@shared/errors/Exception";
import { getCustomRepository } from "typeorm"
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository"

interface IRequestCreateProduct {
    name: string,
    price: number,
    quantity: number
}

/**
 * Service to create products
 */
export class CreateProductService {

    /**
     * Default method
     */
    public async execute({name, price, quantity}: IRequestCreateProduct): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const productExists = await productRepository.findByName(name);

        // There is a rule that the product's name is unique
        if (productExists) {
            throw new Exception("There is already one product with this name");
        }

        const product = productRepository.create({
            name, price, quantity
        });

        await productRepository.save(product);

        return product;
    }

}