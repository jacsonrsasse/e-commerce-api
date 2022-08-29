import { Exception } from "@shared/errors/Exception";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequestUpdateProduct {
    id: string,
    name: string,
    price: number,
    quantity: number
}

/**
 * Service to list only one product
 */
export default class UpdateProductService {

    /**
     * Deafult method
     */
    public async execute({ id, name, price, quantity }: IRequestUpdateProduct): Promise<Product> {
        const productRepository = getCustomRepository(ProductRepository);
        const product = await productRepository.findOne(id);

        if (!product) {
            throw new Exception("Product not found!");
        }

        const productExists = await productRepository.findByName(name);

        if (productExists && productExists.id !== id) {
            throw new Exception("There is already one product with this name!");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }

}